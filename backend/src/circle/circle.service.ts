// TipJar/backend/src/circle/circle.service.ts
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
  Wallet,
  WalletMetadata,
  CreateTransferTransactionInput,
  FeeLevel,
  Blockchain,
  TokenBlockchain,
  TransactionState,
  Transaction,
  GetTransactionInput,
  GetWalletTokenBalanceInput,
  Balances,
  Balance,
  TokenInfo,
} from '@circle-fin/developer-controlled-wallets';
import { isAxiosError } from 'axios';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class CircleService implements OnModuleInit {
  private readonly logger = new Logger(CircleService.name);
  public circleClient!: CircleDeveloperControlledWalletsClient;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async onModuleInit() {
    const apiKey = this.configService.get<string>('CIRCLE_API_KEY');
    const entitySecret = this.configService.get<string>('CIRCLE_ENTITY_SECRET');

    if (!apiKey || !entitySecret) {
      this.logger.error(
        'CRITICAL: CIRCLE_API_KEY or CIRCLE_ENTITY_SECRET is not defined. CircleService will not function.',
      );
      throw new InternalServerErrorException('Brak konfiguracji kluczy API dla CircleService.');
    }
    try {
      this.circleClient = initiateDeveloperControlledWalletsClient({
        apiKey: apiKey,
        entitySecret: entitySecret,
      });
      this.logger.log(
        'Circle Developer Controlled Wallets Client initialized successfully.',
      );
    } catch (error: unknown) { // Zmieniono typ na 'unknown'
      let message = 'Nie udało się zainicjalizować klienta Circle.';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error( // Poprawiono składnię wywołania logger.error
        'Failed to initialize Circle Client in CircleService:',
        (error as Error).stack,
        message
      );
      throw new InternalServerErrorException(message);
    }
  }

  // Przeniesiono metodę handleCircleError do wnętrza klasy
  private handleCircleError(
    error: unknown,
    context: string,
    userId?: string,
  ): never {
    let errorMessage = `Unknown error in ${context}`;
    let errorCode: number | string = 'N/A';
    let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message ?? error.message;
      errorCode = error.response?.data?.code ?? 'N/A';
      httpStatus = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    const logMessage = `Circle API Error (${context}) for User ${userId || 'N/A'} (Code: ${errorCode}): ${errorMessage}`;
    this.logger.error(logMessage, (error as Error).stack);

    if (errorCode === 152021) {
      throw new ConflictException('Portfel dla użytkownika mógł już zostać utworzony.');
    }

    throw new HttpException(`Błąd operacji Circle (${context}): ${errorMessage}`, httpStatus);
  }

  async provisionUserWallet(
    tipJarUserId: string,
    email?: string | null,
    userRole?: UserRole,
  ): Promise<{ circleWalletId: string; mainWalletAddress: string }> {
    this.logger.log(`Attempting to provision Circle wallet for User ID: ${tipJarUserId}, Role: ${userRole || 'N/A'}`);
    try {
      const existingUserRecord = await this.prisma.user.findUnique({
        where: { id: tipJarUserId },
        select: { circleWalletId: true, mainWalletAddress: true, isCircleSetupComplete: true },
      });

      if (!existingUserRecord) {
        throw new NotFoundException(`Użytkownik o ID ${tipJarUserId} nie istnieje.`);
      }
      if (existingUserRecord.isCircleSetupComplete && existingUserRecord.circleWalletId && existingUserRecord.mainWalletAddress) {
        this.logger.warn(`Wallet already exists for User ID: ${tipJarUserId}. WalletID: ${existingUserRecord.circleWalletId}`);
        return {
          circleWalletId: existingUserRecord.circleWalletId,
          mainWalletAddress: existingUserRecord.mainWalletAddress,
        };
      }

      const walletSetId = this.configService.get<string>('CIRCLE_WALLET_SET_ID');
      if (!walletSetId) {
        throw new InternalServerErrorException('Konfiguracja Wallet Set ID jest niekompletna.');
      }
      const defaultBlockchain = this.configService.get<string>('DEFAULT_BLOCKCHAIN', 'MATIC-AMOY') as Blockchain;

      const createWalletsPayload: CreateWalletsInput = {
        idempotencyKey: randomUUID(),
        walletSetId: walletSetId,
        blockchains: [defaultBlockchain],
        count: 1,
        accountType: 'SCA',
        metadata: [{ name: `TipJar Wallet for ${email || tipJarUserId}`, refId: tipJarUserId }],
      };

      this.logger.debug(`Calling Circle API to create wallet: ${JSON.stringify(createWalletsPayload)}`);

      const response = await this.circleClient.createWallets(createWalletsPayload);
      const createdWallet = response?.data?.wallets?.[0];

      if (!createdWallet || !createdWallet.id || !createdWallet.address) {
        throw new InternalServerErrorException('Nie udało się utworzyć portfela Circle - nieprawidłowa odpowiedź SDK.');
      }

      const { id: circleWalletId, address: mainWalletAddress } = createdWallet;
      this.logger.log(`Circle wallet created. ID: ${circleWalletId}, Address: ${mainWalletAddress} for User ID: ${tipJarUserId}`);

      await this.prisma.user.update({
        where: { id: tipJarUserId },
        data: { circleWalletId, mainWalletAddress, isCircleSetupComplete: true },
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
  ): Promise<{ circleTransactionId: string; status: TransactionState; txHash?: string }> {
    this.logger.log(`Initiate withdrawal: UserID ${tipJarUserId}, Amount ${amountString} USDC, To ${destinationAddressString} on ${blockchain}`);
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: tipJarUserId }, select: { circleWalletId: true },
      });
      if (!user || !user.circleWalletId) {
        throw new NotFoundException(`Portfel Circle dla użytkownika ${tipJarUserId} nie znaleziony.`);
      }
      const sourceWalletId = user.circleWalletId;
      const amountDecimal = parseFloat(amountString);
      if (isNaN(amountDecimal) || amountDecimal <= 0) {
        throw new BadRequestException('Nieprawidłowa kwota wypłaty.');
      }

      const tokenInfo: TokenInfo = tokenId.includes('-')
        ? { tokenId: tokenId }
        : { tokenAddress: tokenId, blockchain: blockchain as unknown as TokenBlockchain };

      const transferRequestPayload: CreateTransferTransactionInput = {
        idempotencyKey: randomUUID(),
        walletId: sourceWalletId,
        destinationAddress: destinationAddressString,
        amount: [amountString],
        ...tokenInfo,
        fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
      };

      const response = await this.circleClient.createTransaction(transferRequestPayload);
      const txData = response.data;
      if (!txData || !txData.id || !txData.state) {
        throw new InternalServerErrorException('Nie udało się zainicjować wypłaty - błąd SDK.');
      }

      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return {
        circleTransactionId: txData.id,
        status: txData.state as TransactionState,
        txHash: fullTransactionDetails?.txHash,
      };
    } catch (error) {
      this.handleCircleError(error, 'withdrawal', tipJarUserId);
    }
  }

  async getWalletBalance(walletId: string, tokenIdToFilter?: string): Promise<number> {
    this.logger.debug(`Fetching balance: WalletID ${walletId}, TokenID filter: ${tokenIdToFilter || 'ALL'}`);
    try {
      const requestPayload: GetWalletTokenBalanceInput = { id: walletId };
      const response = await this.circleClient.getWalletTokenBalance(requestPayload);
      const balancesData = response.data;

      if (!balancesData?.tokenBalances || balancesData.tokenBalances.length === 0) {
        return 0;
      }

      let targetBalanceEntry: Balance | undefined;
      if (tokenIdToFilter) {
        targetBalanceEntry = balancesData.tokenBalances.find(tb =>
          tb.token?.id === tokenIdToFilter ||
          tb.token?.tokenAddress?.toLowerCase() === tokenIdToFilter.toLowerCase()
        );
      } else {
        targetBalanceEntry = balancesData.tokenBalances.find(tb => tb.token?.symbol === 'USDC') || balancesData.tokenBalances[0];
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
  ): Promise<{ circleTransactionId: string; status: TransactionState; txHash?: string }> {
    this.logger.log(`Internal tip: from ${sourceCircleWalletId} to ${destinationCircleWalletId}.`);
    try {
      const amountNetDecimal = parseFloat(amountNetString);
      if (isNaN(amountNetDecimal) || amountNetDecimal <= 0) {
        throw new BadRequestException('Nieprawidłowa kwota netto transferu.');
      }

      const destinationWalletRecord = await this.prisma.user.findFirst({
        where: { circleWalletId: destinationCircleWalletId },
        select: { mainWalletAddress: true }
      });

      if (!destinationWalletRecord?.mainWalletAddress) {
        throw new NotFoundException(`Nie można znaleźć adresu docelowego portfela twórcy.`);
      }

      const tokenInfo: TokenInfo = tokenId.includes('-')
        ? { tokenId: tokenId }
        : { tokenAddress: tokenId, blockchain: blockchain as unknown as TokenBlockchain };

      const transferRequestPayload: CreateTransferTransactionInput = {
        idempotencyKey: randomUUID(),
        walletId: sourceCircleWalletId,
        destinationAddress: destinationWalletRecord.mainWalletAddress,
        amount: [amountNetString],
        ...tokenInfo,
        fee: { type: 'level', config: { feeLevel: FeeLevel.Medium } },
      };

      const response = await this.circleClient.createTransaction(transferRequestPayload);
      const txData = response.data;
      if (!txData?.id || !txData.state) {
        throw new InternalServerErrorException('Nie udało się zainicjować napiwku - błąd SDK Circle.');
      }

      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return {
        circleTransactionId: txData.id,
        status: txData.state as TransactionState,
        txHash: fullTransactionDetails?.txHash
      };
    } catch (error) {
      this.handleCircleError(error, 'internal tip');
    }
  }

  async getTransactionStatus(circleTransactionId: string): Promise<Transaction | null> {
    this.logger.debug(`Fetching status for Circle transaction ID: ${circleTransactionId}`);
    try {
      const requestPayload: GetTransactionInput = { id: circleTransactionId };
      const response = await this.circleClient.getTransaction(requestPayload);
      return response.data?.transaction ?? null;
    } catch (error) {
      this.handleCircleError(error, 'get transaction status');
    }
  }

  async getWalletForUser(userId: string): Promise<{ walletId: string; address: string; chain: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        circleWalletId: true,
        mainWalletAddress: true,
      },
    });

    if (!user?.circleWalletId || !user?.mainWalletAddress) {
      throw new NotFoundException('Circle wallet not found for user');
    }

    const chain = this.configService.get<string>('DEFAULT_BLOCKCHAIN', 'MATIC-AMOY');

    return {
      walletId: user.circleWalletId,
      address: user.mainWalletAddress,
      chain,
    };
  }

  async getWalletBalanceForUser(userId: string): Promise<{ balance: number; currency: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });

    if (!user?.circleWalletId) {
      throw new NotFoundException('User has no Circle wallet');
    }

    const balance = await this.getWalletBalance(user.circleWalletId);
    return { balance, currency: 'USD' };
  }

  async getWalletTransactions(userId: string): Promise<any[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true },
    });

    if (!user?.circleWalletId) {
      throw new NotFoundException('Circle wallet not found');
    }

    const res = await fetch(`https://api.circle.com/v1/wallets/${user.circleWalletId}/transactions`, {
      headers: {
        Authorization: `Bearer ${this.configService.get<string>('CIRCLE_API_KEY')}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new HttpException(`Failed to fetch transactions: ${text}`, res.status);
    }

    const data = await res.json();
    const list = data.data || [];

    return list.map((tx: any) => ({
      id: tx.id,
      type: tx.type,
      status: tx.status,
      amount: tx.amount?.amount,
      currency: tx.amount?.currency,
      source: tx.source?.id || null,
      destination: tx.destination?.address || null,
      chain: tx.chain,
      createdAt: tx.createDate,
    }));
  }

  async createHostedDeposit(userId: string, amount: number): Promise<{ hostedUrl: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { circleWalletId: true, email: true },
    });

    if (!user?.circleWalletId) {
      throw new NotFoundException('Circle wallet not found');
    }

    const payload = {
      idempotencyKey: randomUUID(),
      amount: {
        amount: amount.toFixed(2),
        currency: 'USD',
      },
      settlementCurrency: 'USD',
      walletId: user.circleWalletId,
      customerEmail: user.email,
      redirectUrl: `${this.configService.get<string>('FRONTEND_URL')}/deposit-success`,
    };

    const res = await fetch('https://api.circle.com/v1/hosted-checkouts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.configService.get<string>('CIRCLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new HttpException(`Failed to create hosted deposit: ${text}`, res.status);
    }

    const data = await res.json();
    return { hostedUrl: data.data?.checkoutUrl };
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

    const payload = {
      idempotencyKey: randomUUID(),
      source: { walletId: user.circleWalletId, chain: 'POLYGON' },
      destination: { address: toAddress, chain: toChain },
      amount: { amount: amount.toFixed(2), currency: 'USD' },
    };

    const res = await fetch('https://api.circle.com/v1/cctp/transfers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.configService.get<string>('CIRCLE_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new HttpException(`Failed to initiate CCTP transfer: ${text}`, res.status);
    }

    const data = await res.json();
    return { transferId: data.data?.id };
  }

  async listAllWallets(): Promise<any[]> {
    const users = await this.prisma.user.findMany({
      where: { circleWalletId: { not: null } },
      select: {
        id: true,
        email: true,
        circleWalletId: true,
        mainWalletAddress: true,
      },
    });

    return users.map(u => ({
      userId: u.id,
      email: u.email,
      walletId: u.circleWalletId,
      address: u.mainWalletAddress,
    }));
  }
}
