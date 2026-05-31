// backend/src/circle/circle.service.ts
import {
  Injectable,
  Logger,
  OnModuleInit,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  initiateDeveloperControlledWalletsClient,
  CircleDeveloperControlledWalletsClient,
  CreateWalletsInput,
  FeeLevel,
  Blockchain,
  TokenBlockchain,
  TransactionState,
  Transaction,
  GetTransactionInput,
  GetWalletTokenBalanceInput,
  Balance,
  TokenInfo,
} from '@circle-fin/developer-controlled-wallets';
import axios, { isAxiosError } from 'axios';
import { randomBytes, randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

/* ————————————————————————
   Lokalne typy odpowiedzi (bez any)
   ———————————————————————— */
type SdkCreateWalletsResp = {
  data?: { wallets?: Array<{ id: string; address: string }> };
};

type SdkCreateTxResp = {
  data: { id: string; state: TransactionState };
};

type SdkGetTxResp = {
  data?: { transaction?: Transaction };
};

type SdkGetBalancesResp = {
  data?: { tokenBalances?: Balance[] };
};

export type TxRow = {
  id: string;
  type: string;
  status: string;
  amount?: string;
  currency?: string;
  source?: string | null;
  destination?: string | null;
  chain?: string;
  createdAt?: string;
};

export type AdminWalletRow = {
  id: string;
  email: string | null;
  circleWalletId: string | null;
  mainWalletAddress: string | null;
};

@Injectable()
export class CircleService implements OnModuleInit {
  private readonly logger = new Logger(CircleService.name);
  public circleClient!: CircleDeveloperControlledWalletsClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) { }

  onModuleInit(): void {
    const apiKey = this.configService.get<string>('CIRCLE_API_KEY');
    const entitySecret = this.configService.get<string>('CIRCLE_ENTITY_SECRET');

    if (!apiKey || !entitySecret) {
      this.logger.error(
        'CRITICAL: CIRCLE_API_KEY or CIRCLE_ENTITY_SECRET is not defined. CircleService will not function.',
      );
      throw new InternalServerErrorException(
        'Brak konfiguracji kluczy API dla CircleService.',
      );
    }

    try {
      this.circleClient = initiateDeveloperControlledWalletsClient({
        apiKey,
        entitySecret,
      });
      this.logger.log(
        'Circle Developer Controlled Wallets Client initialized successfully.',
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Nie udało się zainicjalizować klienta Circle.';
      this.logger.error(
        `Failed to initialize Circle Client in CircleService: ${message}`,
        (error as Error)?.stack,
      );
      throw new InternalServerErrorException(message);
    }
  }

  private handleCircleError(
    error: unknown,
    context: string,
    userId?: string,
  ): never {
    let errorMessage = `Unknown error in ${context}`;
    let errorCode: string | number = 'N/A';
    let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (isAxiosError(error)) {
      type CircleErrorResponse = { message?: string; code?: number | string };
      const data = error.response?.data as CircleErrorResponse | undefined;

      if (data?.message && typeof data.message === 'string') {
        errorMessage = data.message;
      } else {
        errorMessage = error.message;
      }

      const codeCandidate = data?.code;
      errorCode =
        codeCandidate !== undefined && codeCandidate !== null
          ? codeCandidate
          : 'N/A';

      httpStatus = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const logMessage = `Circle API Error (${context}) for User ${userId ?? 'N/A'
      } (Code: ${String(errorCode)}): ${errorMessage}`;
    this.logger.error(logMessage, (error as Error)?.stack);

    if (errorCode === 152021) {
      throw new ConflictException(
        'Portfel dla użytkownika mógł już zostać utworzony.',
      );
    }

    throw new HttpException(
      `Błąd operacji Circle (${context}): ${errorMessage}`,
      httpStatus,
    );
  }

  async provisionUserWallet(
    tipJarUserId: string,
    email?: string | null,
    userRole?: UserRole,
  ): Promise<{ circleWalletId: string; mainWalletAddress: string }> {
    this.logger.log(
      `Attempting to provision Circle wallet for User ID: ${tipJarUserId}, Role: ${userRole || 'N/A'}`,
    );
    try {
      type UserRecord = {
        circleWalletId: string | null;
        mainWalletAddress: string | null;
        isCircleSetupComplete: boolean;
      };

      const existingUserRecord = (await this.prisma.user.findUnique({
        where: { id: tipJarUserId },
        select: {
          circleWalletId: true,
          mainWalletAddress: true,
          isCircleSetupComplete: true,
        },
      })) as UserRecord | null;

      if (!existingUserRecord) {
        throw new NotFoundException(
          `Użytkownik o ID ${tipJarUserId} nie istnieje.`,
        );
      }

      if (
        existingUserRecord.isCircleSetupComplete &&
        existingUserRecord.circleWalletId &&
        existingUserRecord.mainWalletAddress
      ) {
        this.logger.warn(
          `Wallet already exists for User ID: ${tipJarUserId}. WalletID: ${existingUserRecord.circleWalletId}`,
        );
        return {
          circleWalletId: existingUserRecord.circleWalletId,
          mainWalletAddress: existingUserRecord.mainWalletAddress,
        };
      }

      const walletSetId = this.configService.get<string>(
        'CIRCLE_WALLET_SET_ID',
      );
      if (!walletSetId) {
        throw new InternalServerErrorException(
          'Konfiguracja Wallet Set ID jest niekompletna.',
        );
      }
  const defaultBlockchain = this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'ARC-TESTNET',
    ) as Blockchain;

      const createWalletsPayload: CreateWalletsInput = {
        idempotencyKey: randomUUID(),
        walletSetId,
        blockchains: [defaultBlockchain],
        count: 1,
        accountType: 'SCA',
        metadata: [
          {
            name: `TipJar Wallet for ${email || tipJarUserId}`,
            refId: tipJarUserId,
          },
        ],
      };

      this.logger.debug(
        `Calling Circle API to create wallet: ${JSON.stringify(createWalletsPayload)}`,
      );

      const response = (await this.circleClient.createWallets(
        createWalletsPayload,
      )) as SdkCreateWalletsResp;

      const createdWallet = response.data?.wallets?.[0];
      if (!createdWallet?.id || !createdWallet.address) {
        throw new InternalServerErrorException(
          'Nie udało się utworzyć portfela Circle — nieprawidłowa odpowiedź SDK.',
        );
      }

      const { id: circleWalletId, address: mainWalletAddress } = createdWallet;

        this.logger.log(
          `Circle wallet created. ID: ${circleWalletId}, Address: ${mainWalletAddress} for User ID: ${tipJarUserId}`,
        );

        const delegateAddress = this.configService.get<string>(
          'GATEWAY_DELEGATE_WALLET_ADDRESS',
        );
        if (delegateAddress) {
          try {
            await this.addGatewayDelegate(mainWalletAddress, delegateAddress);
            this.logger.log(
              `Auto-added delegate ${delegateAddress} for SCA wallet ${mainWalletAddress}`,
            );
          } catch (delegateErr) {
            this.logger.warn(
              `Failed to auto-add delegate for wallet ${mainWalletAddress}: ${(delegateErr as Error)?.message}`,
            );
          }
        } else {
          this.logger.warn(
            'GATEWAY_DELEGATE_WALLET_ADDRESS not set — skipping auto-addDelegate',
          );
        }

        await this.prisma.user.update({
        where: { id: tipJarUserId },
        data: {
          circleWalletId,
          mainWalletAddress,
          isCircleSetupComplete: true,
        },
      });

      return { circleWalletId, mainWalletAddress };
    } catch (error) {
      this.handleCircleError(error, 'wallet provisioning', tipJarUserId);
    }
  }

  async initiateWithdrawal(
    tipJarUserId: string,
    destinationAddressString: string,
    amountString: string,
    blockchain: Blockchain,
    tokenId: string,
  ): Promise<{
    circleTransactionId: string;
    status: TransactionState;
    txHash?: string;
  }> {
    this.logger.log(
      `Initiate withdrawal: UserID ${tipJarUserId}, Amount ${amountString} USDC, To ${destinationAddressString} on ${blockchain}`,
    );
    try {
      type UserWallet = { circleWalletId: string | null };
      const user = (await this.prisma.user.findUnique({
        where: { id: tipJarUserId },
        select: { circleWalletId: true },
      })) as UserWallet | null;
      if (!user?.circleWalletId) {
        throw new NotFoundException(
          `Portfel Circle dla użytkownika ${tipJarUserId} nie znaleziony.`,
        );
      }
      const sourceWalletId = user.circleWalletId;
      const amountDecimal = parseFloat(amountString);
      if (Number.isNaN(amountDecimal) || amountDecimal <= 0) {
        throw new BadRequestException('Nieprawidłowa kwota wypłaty.');
      }

      const transferRequestPayload = {
        idempotencyKey: randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
        walletId: sourceWalletId,
        destinationAddress: destinationAddressString,
        amount: [amountString],
        ...((tokenId.includes('-')
          ? { tokenId }
          : {
            tokenAddress: tokenId,
            blockchain: blockchain as TokenBlockchain,
          }) as any),
        fee: {
          type: 'level' as const,
          config: { feeLevel: FeeLevel.Medium },
        },
      };

      const response = (await this.circleClient.createTransaction(
        transferRequestPayload,
      )) as SdkCreateTxResp;

      const txData = response.data;
      if (!txData?.id || !txData.state) {
        throw new InternalServerErrorException(
          'Nie udało się zainicjować wypłaty — błąd SDK.',
        );
      }

      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return {
        circleTransactionId: txData.id,
        status: txData.state,
        txHash: fullTransactionDetails?.txHash,
      };
    } catch (error) {
      this.handleCircleError(error, 'withdrawal', tipJarUserId);
    }
  }

  async getWalletBalance(
    walletId: string,
  ): Promise<{ totalUsdc: number; tokenBalances: Balance[] }> {
    this.logger.debug(
      `Fetching balance: WalletID ${walletId} (all tokens)`,
    );
    try {
      const requestPayload: GetWalletTokenBalanceInput = { id: walletId };
      const response = (await this.circleClient.getWalletTokenBalance(
        requestPayload,
      )) as SdkGetBalancesResp;

      const tokenBalances = response.data?.tokenBalances ?? [];

      const totalUsdc = tokenBalances
        .filter((tb) => tb.token?.symbol === 'USDC')
        .reduce((sum, tb) => sum + parseFloat(tb.amount || '0'), 0);

      return { totalUsdc, tokenBalances };
    } catch (error) {
      this.handleCircleError(error, 'get balance', walletId);
    }
  }

  async initiateInternalTipTransfer(
    sourceCircleWalletId: string,
    destinationCircleWalletId: string,
    amountNetString: string,
    blockchain: Blockchain,
    tokenId: string,
  ): Promise<{
    circleTransactionId: string;
    status: TransactionState;
    txHash?: string;
  }> {
    this.logger.log(
      `Internal tip: from ${sourceCircleWalletId} to ${destinationCircleWalletId}.`,
    );
    try {
      const amountNetDecimal = parseFloat(amountNetString);
      if (Number.isNaN(amountNetDecimal) || amountNetDecimal <= 0) {
        throw new BadRequestException('Nieprawidłowa kwota netto transferu.');
      }

      type WalletRecord = { mainWalletAddress: string | null };
      const destinationWalletRecord = (await this.prisma.user.findFirst({
        where: { circleWalletId: destinationCircleWalletId },
        select: { mainWalletAddress: true },
      })) as WalletRecord | null;

      if (!destinationWalletRecord?.mainWalletAddress) {
        throw new NotFoundException(
          'Nie można znaleźć adresu docelowego portfela twórcy.',
        );
      }

      return this.transferToAddress(
        sourceCircleWalletId,
        destinationWalletRecord.mainWalletAddress,
        amountNetString,
        blockchain,
        tokenId,
      );
    } catch (error) {
      this.handleCircleError(error, 'internal tip');
    }
  }

  async transferToAddress(
    sourceCircleWalletId: string,
    destinationAddress: string,
    amountString: string,
    blockchain: Blockchain,
    tokenId: string,
  ): Promise<{
    circleTransactionId: string;
    status: TransactionState;
    txHash?: string;
  }> {
    this.logger.log(
      `Transfer: wallet ${sourceCircleWalletId} → ${destinationAddress}, amount ${amountString}`,
    );
    try {
      const amountDecimal = parseFloat(amountString);
      if (Number.isNaN(amountDecimal) || amountDecimal <= 0) {
        throw new BadRequestException('Nieprawidłowa kwota transferu.');
      }

      const transferRequestPayload = {
        idempotencyKey: randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
        walletId: sourceCircleWalletId,
        destinationAddress,
        amount: [amountString],
        ...((tokenId.includes('-')
          ? { tokenId }
          : {
              tokenAddress: tokenId,
              blockchain: blockchain as TokenBlockchain,
            }) as any),
        fee: {
          type: 'level' as const,
          config: { feeLevel: FeeLevel.Medium },
        },
      };

      const response = (await this.circleClient.createTransaction(
        transferRequestPayload,
      )) as SdkCreateTxResp;

      const txData = response.data;
      if (!txData?.id || !txData.state) {
        throw new InternalServerErrorException(
          'Nie udało się zainicjować transferu — błąd SDK Circle.',
        );
      }

      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return {
        circleTransactionId: txData.id,
        status: txData.state,
        txHash: fullTransactionDetails?.txHash,
      };
    } catch (error) {
      this.handleCircleError(error, 'transfer to address');
    }
  }

  async getTransactionStatus(
    circleTransactionId: string,
  ): Promise<Transaction | null> {
    this.logger.debug(
      `Fetching status for Circle transaction ID: ${circleTransactionId}`,
    );
    try {
      const requestPayload: GetTransactionInput = { id: circleTransactionId };
      const response = (await this.circleClient.getTransaction(
        requestPayload,
      )) as SdkGetTxResp;

      return response.data?.transaction ?? null;
    } catch (error) {
      this.handleCircleError(error, 'get transaction status');
    }
  }

  async getWalletForUser(
    userId: string,
  ): Promise<{ walletId: string; address: string; chain: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, mainWalletAddress: true },
    });
    if (!user?.circleWalletId || !user?.mainWalletAddress) {
      throw new NotFoundException('Circle wallet not found for user');
    }
    const chain = this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'ARC-TESTNET',
    );
    return {
      walletId: user.circleWalletId,
      address: user.mainWalletAddress,
      chain,
    };
  }

  async getWalletBalanceForUser(
    userId: string,
  ): Promise<{ balance: number; currency: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, mainWalletAddress: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('User has no Circle wallet');
    }

    let totalUsdc: number;

    try {
      const gateway = await this.getGatewayUnifiedBalance(userId);
      totalUsdc = parseFloat(gateway.balance);
    } catch (gwErr) {
      this.logger.warn(
        `Gateway balance failed for user ${userId}, falling back to per-chain balance: ${(gwErr as Error)?.message}`,
      );
      const chainBalance = await this.getWalletBalance(user.circleWalletId);
      totalUsdc = chainBalance.totalUsdc;
    }

    const circleWallet = await this.prisma.circleWallet.findUnique({
      where: { circleWalletId: user.circleWalletId },
    });

    if (circleWallet) {
      await this.prisma.walletBalance.upsert({
        where: { circleWalletId: circleWallet.id },
        update: {
          totalUsdc: totalUsdc,
          circleUpdatedAt: new Date(),
        },
        create: {
          circleWalletId: circleWallet.id,
          totalUsdc: totalUsdc,
          circleUpdatedAt: new Date(),
        },
      });
    }

    return { balance: totalUsdc, currency: 'USDC' };
  }

  async getWalletTransactions(userId: string): Promise<TxRow[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('Circle wallet not found');
    }

    const resp = await this.circleClient.listTransactions({
      walletIds: [user.circleWalletId],
      pageSize: 50,
    });

    const transactions = resp.data?.transactions ?? [];

    const mapped: TxRow[] = transactions.map((tx) => ({
      id: tx.id,
      type: tx.transactionType ?? 'UNKNOWN',
      status: tx.state,
      amount: tx.amounts?.[0] ?? undefined,
      currency: 'USDC',
      source: tx.sourceAddress ?? null,
      destination: tx.destinationAddress ?? null,
      chain: tx.blockchain,
      createdAt: tx.createDate,
    }));

    return mapped;
  }

  async createHostedDeposit(
    userId: string,
    amount: number,
  ): Promise<{ hostedUrl: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, email: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('Circle wallet not found');
    }
    const apiKey = this.configService.get<string>('CIRCLE_API_KEY');
    const idempotencyKey = randomUUID();

    const response = await axios.post<{ data: { checkoutUrl: string } }>(
      'https://api.circle.com/v1/hosted-checkouts',
      {
        idempotencyKey,
        amount: { amount: amount.toFixed(2), currency: 'USD' },
        settlementCurrency: 'USD',
        walletId: user.circleWalletId,
        customerEmail: user.email,
        redirectUrl: `${this.configService.get<string>('FRONTEND_URL')}/deposit-success`,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return { hostedUrl: response.data.data.checkoutUrl };
  }

  async handleWebhook(payload: unknown): Promise<void> {
    this.logger.debug(`Received Circle webhook: ${JSON.stringify(payload)}`);

    type WebhookPayload = {
      type?: string;
      eventType?: string;
      data?: {
        walletId?: string;
        transaction?: { walletId?: string };
      };
    };

    const p = payload as WebhookPayload;
    const eventType = p.type || p.eventType || '';

    const walletId =
      p.data?.walletId || p.data?.transaction?.walletId || null;

    if (
      !walletId ||
      ![
        'transactions.inbound',
        'transactions.outbound',
        'transactions.confirmed',
        'transactions.failed',
      ].includes(eventType)
    ) {
      this.logger.warn(
        `Unhandled webhook type="${eventType}" walletId="${walletId}"`,
      );
      return;
    }

    this.logger.log(
      `Webhook "${eventType}" for walletId=${walletId} — refreshing cached balance`,
    );

    try {
      const { totalUsdc, tokenBalances } = await this.getWalletBalance(
        walletId,
      );

      const circleWallet = await this.prisma.circleWallet.findUnique({
        where: { circleWalletId: walletId },
      });

      if (!circleWallet) {
        this.logger.warn(
          `No CircleWallet record for walletId=${walletId}, skipping cache update`,
        );
        return;
      }

      await this.prisma.walletBalance.upsert({
        where: { circleWalletId: circleWallet.id },
        update: {
          totalUsdc: totalUsdc,
          rawJson: tokenBalances as any,
          circleUpdatedAt: new Date(),
        },
        create: {
          circleWalletId: circleWallet.id,
          totalUsdc: totalUsdc,
          rawJson: tokenBalances as any,
          circleUpdatedAt: new Date(),
        },
      });

      this.logger.log(
        `Cached balance updated for walletId=${walletId}: ${totalUsdc} USDC`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to refresh balance on webhook for walletId=${walletId}`,
        (error as Error)?.stack,
      );
    }
  }

  async listAllWallets(): Promise<AdminWalletRow[]> {
    const users = await this.prisma.user.findMany({
      where: { circleWalletId: { not: null } },
      select: {
        id: true,
        email: true,
        circleWalletId: true,
        mainWalletAddress: true,
      },
    });
    return users as AdminWalletRow[];
  }

  async addGatewayDelegate(
    scaWalletAddress: string,
    delegateAddress: string,
  ): Promise<string> {
    const arc = this.getArcConfig();
    this.logger.log(
      `addDelegate: SCA ${scaWalletAddress} adding delegate ${delegateAddress} on Gateway Wallet ${arc.gatewayContract}`,
    );

    const tx = await this.circleClient.createContractExecutionTransaction({
      walletAddress: scaWalletAddress,
      blockchain: this.getDefaultBlockchain(),
      contractAddress: arc.gatewayContract,
      abiFunctionSignature: 'addDelegate(address,address)',
      abiParameters: [arc.usdcContract, delegateAddress],
      fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
    });

    const txId = tx.data?.id;
    if (!txId) {
      throw new InternalServerErrorException(
        'Nie udało się utworzyć transakcji addDelegate.',
      );
    }

    await this.waitForTxCompletion(txId, 'addDelegate');
    this.logger.log(`addDelegate complete: txId=${txId}`);
    return txId;
  }

  async removeGatewayDelegate(
    scaWalletAddress: string,
    delegateAddress: string,
  ): Promise<string> {
    const arc = this.getArcConfig();
    this.logger.log(
      `removeDelegate: SCA ${scaWalletAddress} removing delegate ${delegateAddress}`,
    );

    const tx = await this.circleClient.createContractExecutionTransaction({
      walletAddress: scaWalletAddress,
      blockchain: this.getDefaultBlockchain(),
      contractAddress: arc.gatewayContract,
      abiFunctionSignature: 'removeDelegate(address,address)',
      abiParameters: [arc.usdcContract, delegateAddress],
      fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
    });

    const txId = tx.data?.id;
    if (!txId) {
      throw new InternalServerErrorException(
        'Nie udało się utworzyć transakcji removeDelegate.',
      );
    }

    await this.waitForTxCompletion(txId, 'removeDelegate');
    this.logger.log(`removeDelegate complete: txId=${txId}`);
    return txId;
  }

  async deriveWalletOnChain(
    circleWalletId: string,
    targetBlockchain: Blockchain,
  ): Promise<void> {
    this.logger.log(
      `Deriving wallet ${circleWalletId} on ${targetBlockchain}`,
    );

    type WalletResp = {
      data?: { wallet?: { id: string; address: string; blockchain: string } };
    };
    const resp = (await this.circleClient.deriveWallet({
      id: circleWalletId,
      blockchain: targetBlockchain as any,
    })) as WalletResp;

    this.logger.log(
      `Wallet derived on ${targetBlockchain}: ${resp.data?.wallet?.address}`,
    );
  }

  getDefaultBlockchain(): Blockchain {
    return this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'ARC-TESTNET',
    ) as Blockchain;
  }

  getUsdcTokenId(): string {
    return this.configService.get<string>('USDC_TOKEN_ID', 'USDC');
  }

  private getGatewayConfig() {
    const arc = this.getArcConfig();
    const gatewayApiBase = this.configService.get<string>(
      'GATEWAY_API_URL',
      'https://gateway-api-testnet.circle.com/v1',
    );
    return {
      gatewayApiBase,
      gatewayWallet: arc.gatewayContract,
      gatewayMinter: this.configService.get<string>(
        'GATEWAY_MINTER_ADDRESS',
        '0x0022222ABE238Cc2C7Bb1f21003F0a260052475B',
      ),
      sourceDomain: arc.cctpDomain,
      usdc: arc.usdcContract,
      maxFee: 2_010000n,
      maxUint256Dec: ((1n << 256n) - 1n).toString(),
    };
  }

  async getGatewayUnifiedBalance(
    userId: string,
  ): Promise<{
    balance: string;
    currency: string;
    domainBalances: { domain: number; depositor: string; balance: string }[];
  }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, mainWalletAddress: true },
    });
    if (!user?.circleWalletId || !user?.mainWalletAddress) {
      throw new NotFoundException('Circle wallet not found for user');
    }

    const arc = this.getArcConfig();
    const gatewayApiBase = this.configService.get<string>(
      'GATEWAY_API_URL',
      'https://gateway-api-testnet.circle.com/v1',
    );

    try {
      const response = await axios.post<{
        token: string;
        balances: { domain: number; depositor: string; balance: string }[];
      }>(`${gatewayApiBase}/balances`, {
        token: 'USDC',
        sources: [
          { domain: arc.cctpDomain, depositor: user.mainWalletAddress },
        ],
      });

      const balances = response.data.balances ?? [];
      const total = balances.reduce(
        (sum, b) => sum + parseFloat(b.balance || '0'),
        0,
      );

      return {
        balance: total.toFixed(6),
        currency: 'USDC',
        domainBalances: balances,
      };
    } catch (error) {
      this.handleCircleError(error, 'gateway unified balance', userId);
    }
  }

  async initiateGatewayDeposit(
    userId: string,
    amountString: string,
  ): Promise<{ approveTxId: string; depositTxId: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, mainWalletAddress: true },
    });
    if (!user?.circleWalletId || !user?.mainWalletAddress) {
      throw new NotFoundException('Circle wallet not found for user');
    }

    const amountDecimal = parseFloat(amountString);
    if (Number.isNaN(amountDecimal) || amountDecimal <= 0) {
      throw new BadRequestException('Nieprawidłowa kwota depozytu.');
    }

    const arc = this.getArcConfig();
    const gw = this.getGatewayConfig();

    const parseBalance = (value: string): string => {
      const [whole, decimal = ''] = value.split('.');
      return (whole || '0') + (decimal + '000000').slice(0, 6);
    };
    const amount = parseBalance(amountString);

    this.logger.log(
      `Gateway deposit: approving ${amountString} USDC for user ${userId}`,
    );

    try {
      const approveTx = await this.circleClient.createContractExecutionTransaction(
        {
          walletAddress: user.mainWalletAddress,
          blockchain: this.getDefaultBlockchain(),
          contractAddress: arc.usdcContract,
          abiFunctionSignature: 'approve(address,uint256)',
          abiParameters: [arc.gatewayContract, amount],
          fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
        },
      );

      const approveTxId = approveTx.data?.id;
      if (!approveTxId) {
        throw new InternalServerErrorException(
          'Nie udało się utworzyć transakcji approve.',
        );
      }

      await this.waitForTxCompletion(approveTxId, 'USDC approve');

      this.logger.log(
        `Gateway deposit: depositing ${amountString} USDC to Gateway Wallet for user ${userId}`,
      );

      const depositTx = await this.circleClient.createContractExecutionTransaction(
        {
          walletAddress: user.mainWalletAddress,
          blockchain: this.getDefaultBlockchain(),
          contractAddress: arc.gatewayContract,
          abiFunctionSignature: 'deposit(address,uint256)',
          abiParameters: [user.mainWalletAddress, amount],
          fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
        },
      );

      const depositTxId = depositTx.data?.id;
      if (!depositTxId) {
        throw new InternalServerErrorException(
          'Nie udało się utworzyć transakcji deposit.',
        );
      }

      await this.waitForTxCompletion(depositTxId, 'Gateway deposit');

      return { approveTxId, depositTxId };
    } catch (error) {
      this.handleCircleError(error, 'gateway deposit', userId);
    }
  }

  async initiateGatewayTransfer(
    userId: string,
    amountString: string,
    destinationDomain: number,
    recipientAddress: string,
  ): Promise<{ burnSignTxId: string; mintTxId: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, mainWalletAddress: true },
    });
    if (!user?.circleWalletId || !user?.mainWalletAddress) {
      throw new NotFoundException('Circle wallet not found for user');
    }

    const amountDecimal = parseFloat(amountString);
    if (Number.isNaN(amountDecimal) || amountDecimal <= 0) {
      throw new BadRequestException('Nieprawidłowa kwota transferu.');
    }

    const gw = this.getGatewayConfig();
    const arc = this.getArcConfig();

    const parseBalance = (value: string): string => {
      const [whole, decimal = ''] = value.split('.');
      return (whole || '0') + (decimal + '000000').slice(0, 6);
    };

    const addressToBytes32 = (address: string): string => {
      return (
        '0x' + address.toLowerCase().replace(/^0x/, '').padStart(64, '0')
      );
    };

    const stringifyTypedData = (obj: unknown): string => {
      return JSON.stringify(obj, (_key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      );
    };

    const EIP712_TYPES = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
      ],
      TransferSpec: [
        { name: 'version', type: 'uint32' },
        { name: 'sourceDomain', type: 'uint32' },
        { name: 'destinationDomain', type: 'uint32' },
        { name: 'sourceContract', type: 'bytes32' },
        { name: 'destinationContract', type: 'bytes32' },
        { name: 'sourceToken', type: 'bytes32' },
        { name: 'destinationToken', type: 'bytes32' },
        { name: 'sourceDepositor', type: 'bytes32' },
        { name: 'destinationRecipient', type: 'bytes32' },
        { name: 'sourceSigner', type: 'bytes32' },
        { name: 'destinationCaller', type: 'bytes32' },
        { name: 'value', type: 'uint256' },
        { name: 'salt', type: 'bytes32' },
        { name: 'hookData', type: 'bytes' },
      ],
      BurnIntent: [
        { name: 'maxBlockHeight', type: 'uint256' },
        { name: 'maxFee', type: 'uint256' },
        { name: 'spec', type: 'TransferSpec' },
      ],
    } as const;

    const typedDataDomain = { name: 'GatewayWallet', version: '1' } as const;

    const DESTINATION_CHAINS: Record<
      number,
      { walletChain: string; gatewayMinter: string; usdc: string }
    > = {
      6: {
        walletChain: 'BASE-SEPOLIA',
        gatewayMinter: '0x0022222ABE238Cc2C7Bb1f21003F0a260052475B',
        usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
      },
    };

    const destChain = DESTINATION_CHAINS[destinationDomain];
    if (!destChain) {
      throw new BadRequestException(
        `Nieobsługiwany domain docelowy: ${destinationDomain}`,
      );
    }

    const delegateAddress = this.configService.get<string>(
      'GATEWAY_DELEGATE_WALLET_ADDRESS',
    );
    if (!delegateAddress) {
      throw new InternalServerErrorException(
        'GATEWAY_DELEGATE_WALLET_ADDRESS not configured — required for SCA wallet transfers.',
      );
    }

    const signerAddress = delegateAddress;

    try {
      this.logger.log(
        `Gateway transfer: ${amountString} USDC from domain ${arc.cctpDomain} to domain ${destinationDomain} for user ${userId}`,
      );

      const burnIntent = {
        maxBlockHeight: gw.maxUint256Dec,
        maxFee: gw.maxFee,
        spec: {
          version: 1,
          sourceDomain: arc.cctpDomain,
          destinationDomain,
          sourceContract: addressToBytes32(arc.gatewayContract),
          destinationContract: addressToBytes32(destChain.gatewayMinter),
          sourceToken: addressToBytes32(arc.usdcContract),
          destinationToken: addressToBytes32(destChain.usdc),
          sourceDepositor: addressToBytes32(user.mainWalletAddress),
          destinationRecipient: addressToBytes32(recipientAddress),
          sourceSigner: addressToBytes32(signerAddress),
          destinationCaller: addressToBytes32(
            '0x0000000000000000000000000000000000000000',
          ),
          value: parseBalance(amountString),
          salt: '0x' + randomBytes(32).toString('hex'),
          hookData: '0x',
        },
      };

      const typedData = {
        types: EIP712_TYPES,
        domain: typedDataDomain,
        primaryType: 'BurnIntent' as const,
        message: burnIntent,
      };

      const signResponse = await this.circleClient.signTypedData({
        walletAddress: signerAddress,
        blockchain: this.getDefaultBlockchain(),
        data: stringifyTypedData(typedData),
      });

      const burnSignature = signResponse.data?.signature;
      if (!burnSignature) {
        throw new InternalServerErrorException(
          'Nie udało się podpisać burn intent.',
        );
      }

      const burnSignTxId = `sign-${Date.now()}`;

      const transferResponse = await axios.post<{
        attestation: string;
        signature: string;
      }>(`${gw.gatewayApiBase}/transfer`, [
        {
          burnIntent: typedData.message,
          signature: burnSignature,
        },
      ]);

      const { attestation, signature: operatorSignature } =
        transferResponse.data;

    if (!attestation || !operatorSignature) {
      throw new InternalServerErrorException(
        'Brak attestation lub operator signature w odpowiedzi Gateway.',
      );
    }

    try {
      await this.deriveWalletOnChain(
        user.circleWalletId,
        destChain.walletChain as Blockchain,
      );
    } catch (deriveErr) {
      this.logger.warn(
        `Derive wallet on ${destChain.walletChain} failed (may already exist): ${(deriveErr as Error)?.message}`,
      );
    }

    const mintTx =
        await this.circleClient.createContractExecutionTransaction({
          walletAddress: user.mainWalletAddress,
          blockchain: destChain.walletChain as Blockchain,
          contractAddress: destChain.gatewayMinter,
          abiFunctionSignature: 'gatewayMint(bytes,bytes)',
          abiParameters: [attestation, operatorSignature],
          fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
        });

      const mintTxId = mintTx.data?.id;
      if (!mintTxId) {
        throw new InternalServerErrorException(
          'Nie udało się utworzyć transakcji mint.',
        );
      }

      await this.waitForTxCompletion(mintTxId, 'USDC mint');

      return { burnSignTxId, mintTxId };
    } catch (error) {
      this.handleCircleError(error, 'gateway transfer', userId);
    }
  }

  private async waitForTxCompletion(
    txId: string,
    label: string,
  ): Promise<Transaction> {
    const terminalStates = new Set([
      'COMPLETE',
      'CONFIRMED',
      'FAILED',
      'DENIED',
      'CANCELLED',
    ]);

    const maxAttempts = 60;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const { data } = await this.circleClient.getTransaction({ id: txId });
      const state = data?.transaction?.state;

      if (state && terminalStates.has(state)) {
        if (state !== 'COMPLETE' && state !== 'CONFIRMED') {
          throw new InternalServerErrorException(
            `${label} nie zakończył się sukcesem (state=${state})`,
          );
        }
        return data.transaction!;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    throw new InternalServerErrorException(
      `${label} timeout — brak terminal state po ${maxAttempts * 3}s`,
    );
  }

  getArcConfig(): {
    rpcUrl: string;
    chainId: number;
    cctpDomain: number;
    usdcContract: string;
    gasStationContract: string;
    gatewayContract: string;
    paymasterContract: string;
  } {
    return {
      rpcUrl: this.configService.get<string>(
        'ARC_TESTNET_RPC_URL',
        'https://rpc.testnet.arc.network',
      ),
      chainId: parseInt(
        this.configService.get<string>('ARC_TESTNET_CHAIN_ID', '5042002'),
        10,
      ),
      cctpDomain: parseInt(
        this.configService.get<string>('ARC_CCTP_DOMAIN', '26'),
        10,
      ),
      usdcContract: this.configService.get<string>(
        'ARC_USDC_CONTRACT',
        '0x3600000000000000000000000000000000000000',
      ),
      gasStationContract: this.configService.get<string>(
        'ARC_GAS_STATION_CONTRACT',
        '0x7ceA357B5AC039F8F9e378a1f03Aa5005C0a25',
      ),
      gatewayContract: this.configService.get<string>(
        'ARC_GATEWAY_CONTRACT',
        '0x0077777d7EBA4688BDeF3E311b846F25870A19B9',
      ),
      paymasterContract: this.configService.get<string>(
        'ARC_PAYMASTER_CONTRACT',
        '0x31BE08D380A21fc740883c0BC434FcFc88740b58',
      ),
    };
  }
}
