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
import { randomUUID } from 'crypto';
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
        'MATIC-AMOY',
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
    tokenIdToFilter?: string,
  ): Promise<number> {
    this.logger.debug(
      `Fetching balance: WalletID ${walletId}, TokenID filter: ${tokenIdToFilter || 'ALL'}`,
    );
    try {
      const requestPayload: GetWalletTokenBalanceInput = { id: walletId };
      const response = (await this.circleClient.getWalletTokenBalance(
        requestPayload,
      )) as SdkGetBalancesResp;

      const balancesData = response.data;
      if (
        !balancesData?.tokenBalances ||
        balancesData.tokenBalances.length === 0
      ) {
        return 0;
      }

      let targetBalanceEntry: Balance | undefined;
      if (tokenIdToFilter) {
        targetBalanceEntry = balancesData.tokenBalances.find(
          (tb) =>
            tb.token?.id === tokenIdToFilter ||
            tb.token?.tokenAddress?.toLowerCase() ===
            tokenIdToFilter.toLowerCase(),
        );
      } else {
        targetBalanceEntry =
          balancesData.tokenBalances.find(
            (tb) => tb.token?.symbol === 'USDC',
          ) || balancesData.tokenBalances[0];
      }

      if (!targetBalanceEntry?.amount) {
        return 0;
      }

      return parseFloat(targetBalanceEntry.amount);
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

      const transferRequestPayload = {
        idempotencyKey: randomUUID() as `${string}-${string}-${string}-${string}-${string}`,
        walletId: sourceCircleWalletId,
        destinationAddress: destinationWalletRecord.mainWalletAddress,
        amount: [amountNetString],
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
          'Nie udało się zainicjować napiwku — błąd SDK Circle.',
        );
      }

      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return {
        circleTransactionId: txData.id,
        status: txData.state,
        txHash: fullTransactionDetails?.txHash,
      };
    } catch (error) {
      this.handleCircleError(error, 'internal tip');
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
      'MATIC-AMOY',
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
      select: { circleWalletId: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('User has no Circle wallet');
    }
    const balance = await this.getWalletBalance(user.circleWalletId);
    return { balance, currency: 'USDC' };
  }

  async getWalletTransactions(userId: string): Promise<TxRow[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('Circle wallet not found');
    }

    const apiKey = this.configService.get<string>('CIRCLE_API_KEY');

    type CircleTx = {
      id: string;
      type: string;
      status: string;
      amount?: { amount?: string; currency?: string };
      source?: { id?: string };
      destination?: { address?: string };
      chain?: string;
      createDate?: string;
    };
    type CircleTxResp = { data?: CircleTx[] };

    const resp = await axios.get<CircleTxResp>(
      `https://api.circle.com/v1/wallets/${user.circleWalletId}/transactions`,
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );

    const txs = resp.data?.data;
    const transactions: CircleTx[] = Array.isArray(txs) ? txs : [];

    const mapped: TxRow[] = transactions.map((tx) => ({
      id: tx.id,
      type: tx.type,
      status: tx.status,
      amount: tx.amount?.amount,
      currency: tx.amount?.currency,
      source: tx.source?.id ?? null,
      destination: tx.destination?.address ?? null,
      chain: tx.chain,
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

  async initiateCctpTransfer(
    userId: string,
    amount: number,
    toChain: string,
    toAddress: string,
  ): Promise<{ transferId: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });
    if (!user?.circleWalletId) {
      throw new NotFoundException('Wallet not found');
    }
    const apiKey = this.configService.get<string>('CIRCLE_API_KEY');
    const idempotencyKey = randomUUID();

    const response = await axios.post<{ data: { id: string } }>(
      'https://api.circle.com/v1/cctp/transfers',
      {
        idempotencyKey,
        source: { walletId: user.circleWalletId, chain: 'POLYGON' },
        destination: { address: toAddress, chain: toChain },
        amount: { amount: amount.toFixed(2), currency: 'USD' },
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return { transferId: response.data.data.id };
  }

  async handleWebhook(payload: unknown): Promise<void> {
    this.logger.debug(`Received Circle webhook: ${JSON.stringify(payload)}`);
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

  getDefaultBlockchain(): Blockchain {
    return this.configService.get<string>(
      'DEFAULT_BLOCKCHAIN',
      'MATIC-AMOY',
    ) as Blockchain;
  }

  getUsdcTokenId(): string {
    return this.configService.get<string>('USDC_TOKEN_ID', 'USDC');
  }
}
