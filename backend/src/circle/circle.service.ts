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
  // Funkcje i klient SDK
  initiateDeveloperControlledWalletsClient,
  CircleDeveloperControlledWalletsClient,

  // Typy dla portfeli
  CreateWalletsInput,
  Wallet,
  AccountType,
  WalletMetadata,
  // Wallets, // Typ dla odpowiedzi z listą portfeli (zawiera `wallets: Wallet[]`)

  // Typy dla transakcji/transferów
  CreateTransferTransactionInput,
  FeeLevel,
  Blockchain,
  TokenBlockchain, // Importujemy, aby użyć w rzutowaniu typu
  TransactionState,
  Transaction,
  GetTransactionInput,
  // TransactionResponse, // Całościowy typ odpowiedzi dla getTransaction, zawiera `transaction: Transaction`
  FeeConfiguration, 
  TokenInfo,        // Unia: TokenIdInput | TokenAddressAndBlockchainInput
  // WithIdempotencyKey, // Jest częścią CreateTransferTransactionInput przez dziedziczenie

  // Typy dla sald
  GetWalletTokenBalanceInput,
  Balances, // Typ odpowiedzi dla getWalletTokenBalance (zawiera `tokenBalances: Balance[]`)
  Balance,  // Typ dla pojedynczego salda w tablicy Balances.tokenBalances
  // TokenResponse, // Typ dla obiektu `token` wewnątrz `Balance`

} from '@circle-fin/developer-controlled-wallets';

import { randomUUID } from 'crypto';
// === POPRAWIONA ŚCIEŻKA IMPORTU PRISMASERVICE ===
import { PrismaService } from '../prisma/prisma.service'; 
// ==============================================
import { UserRole, User as UserModelPrisma } from '../../generated/prisma'; // Upewnij się, że ta ścieżka jest poprawna

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
      this.logger.error('CRITICAL: CIRCLE_API_KEY or CIRCLE_ENTITY_SECRET is not defined. CircleService will not function.');
      throw new InternalServerErrorException('Brak konfiguracji kluczy API dla CircleService.');
    }
    try {
      this.circleClient = initiateDeveloperControlledWalletsClient({
        apiKey: apiKey,
        entitySecret: entitySecret,
      });
      this.logger.log('Circle Developer Controlled Wallets Client initialized successfully.');
    } catch (error) {
      this.logger.error('Failed to initialize Circle Client in CircleService:', error.stack || error.message);
      throw new InternalServerErrorException('Nie udało się zainicjalizować klienta Circle.');
    }
  }

  async provisionUserWallet(
    tipJarUserId: string,
    email?: string | null,
    userRole?: UserRole,
  ): Promise<{ circleWalletId: string; mainWalletAddress: string }> {
    this.logger.log(`Attempting to provision Circle wallet for User ID: ${tipJarUserId}, Role: ${userRole || 'N/A'}`);
    const existingUserRecord = await this.prisma.user.findUnique({
      where: { id: tipJarUserId },
      select: { circleWalletId: true, mainWalletAddress: true, isCircleSetupComplete: true },
    });

    if (!existingUserRecord) {
      this.logger.error(`User ${tipJarUserId} not found for wallet provisioning.`);
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
      this.logger.error('CRITICAL: CIRCLE_WALLET_SET_ID is not configured.');
      throw new InternalServerErrorException('Konfiguracja Wallet Set ID jest niekompletna.');
    }
    const defaultBlockchain = this.configService.get<string>('DEFAULT_BLOCKCHAIN', 'MATIC-AMOY') as Blockchain;
    const idempotencyKey = randomUUID();
    
    const metadataForWallet: WalletMetadata = {
        name: `TipJar Wallet for ${email || tipJarUserId}`,
        refId: tipJarUserId,
    };

    const createWalletsPayload: CreateWalletsInput = {
      idempotencyKey: idempotencyKey,
      walletSetId: walletSetId,
      blockchains: [defaultBlockchain],
      count: 1,
      accountType: AccountType.Sca,
      metadata: [metadataForWallet],
    };

    this.logger.debug(`Calling Circle API to create wallet (payload w/o sensitive): ${JSON.stringify({ ...createWalletsPayload, entitySecretCiphertext: undefined})}`);
    try {
      const response = await this.circleClient.createWallets(createWalletsPayload);
      const createdWallet = response?.data?.wallets?.[0];

      if (!createdWallet || !createdWallet.id || !createdWallet.address) {
        this.logger.error(`Invalid response from Circle SDK (wallet creation) for ${tipJarUserId}: ${JSON.stringify(response?.data)}`);
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
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error (Circle wallet provisioning)';
      const errorCode = error.response?.data?.code;
      this.logger.error(`Circle API Error (wallet provisioning) for User ${tipJarUserId} (Code: ${errorCode || 'N/A'}): ${errorMessage}`, error.stack);
      if (errorCode === 152021) throw new ConflictException('Portfel dla użytkownika mógł już zostać utworzony.');
      throw new HttpException(`Nie udało się skonfigurować portfela: ${errorMessage}`, error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
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
    const user = await this.prisma.user.findUnique({
      where: { id: tipJarUserId }, select: { circleWalletId: true },
    });
    if (!user || !user.circleWalletId) {
      this.logger.error(`Circle wallet not found for UserID: ${tipJarUserId} (withdrawal).`);
      throw new NotFoundException(`Portfel Circle dla użytkownika ${tipJarUserId} nie znaleziony.`);
    }
    const sourceWalletId = user.circleWalletId;
    const amountDecimal = parseFloat(amountString);
    if (isNaN(amountDecimal) || amountDecimal <= 0) {
      this.logger.warn(`Invalid withdrawal amount: ${amountString} for user ${tipJarUserId}.`);
      throw new BadRequestException('Nieprawidłowa kwota wypłaty.');
    }
    this.logger.warn(`Balance check placeholder for wallet ${sourceWalletId} (withdrawal).`);

    const idempotencyKey = randomUUID();
    
    const tokenInfo: TokenInfo = tokenId.includes('-') // Sprawdzenie, czy tokenId to UUID Circle, czy adres kontraktu
      ? { tokenId: tokenId } 
      : { 
          tokenAddress: tokenId, 
          // Rzutowanie typu. Upewnij się, że `blockchain` (typu `Blockchain`) 
          // zawiera wartość kompatybilną z `TokenBlockchain` oczekiwanym przez SDK.
          blockchain: blockchain as unknown as TokenBlockchain 
        };

    const transferRequestPayload: CreateTransferTransactionInput = {
      idempotencyKey,
      walletId: sourceWalletId,
      destinationAddress: destinationAddressString,
      amount: [amountString], // `amount` (singular) jest typu string[] zgodnie z .d.ts
      ...tokenInfo, // Dołącza tokenId LUB tokenAddress i blockchain
      fee: {
        type: 'level',
        config: {
          feeLevel: FeeLevel.Medium,
        },
      },
    };

    this.logger.debug(`Calling Circle API (withdrawal): ${JSON.stringify(transferRequestPayload)}`);
    try {
      const response = await this.circleClient.createTransaction(transferRequestPayload);
      const txData = response?.data; 
      if (!txData || !txData.id || !txData.state) {
        this.logger.error(`Invalid Circle SDK response (withdrawal) for ${sourceWalletId}: ${JSON.stringify(response?.data)}`);
        throw new InternalServerErrorException('Nie udało się zainicjować wypłaty - błąd SDK.');
      }
      this.logger.log(`Withdrawal initiated. CircleTxID: ${txData.id}, State: ${txData.state}`);
      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return { 
        circleTransactionId: txData.id, 
        status: txData.state as TransactionState, 
        txHash: fullTransactionDetails?.txHash 
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error (withdrawal)';
      const errorCode = error.response?.data?.code;
      this.logger.error(`Circle API Error (withdrawal) for ${tipJarUserId} (Code: ${errorCode || 'N/A'}): ${errorMessage}`, error.stack);
      throw new HttpException(`Nie udało się zlecić wypłaty: ${errorMessage}`, error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getWalletBalance(walletId: string, tokenIdToFilter?: string): Promise<number> {
    this.logger.debug(`Fetching balance: WalletID ${walletId}, TokenID filter: ${tokenIdToFilter || 'ALL'}`);
    try {
      const requestPayload: GetWalletTokenBalanceInput = {
        id: walletId,
        // tokenAddresses: tokenIdToFilter && !tokenIdToFilter.includes('-') ? [tokenIdToFilter] : undefined, // Opcjonalne filtrowanie
      };
      
      const response = await this.circleClient.getWalletTokenBalance(requestPayload);
      const balancesData = response?.data; // Typ Balances

      if (!balancesData || !balancesData.tokenBalances || balancesData.tokenBalances.length === 0) {
        this.logger.warn(`No balance data or empty tokenBalances for wallet ${walletId}. Response: ${JSON.stringify(response?.data)}. Assuming 0.`);
        return 0;
      }

      let targetBalanceEntry: Balance | undefined; // Typ Balance
      if (tokenIdToFilter) {
        targetBalanceEntry = balancesData.tokenBalances.find(tb => 
            tb.token?.id === tokenIdToFilter || 
            tb.token?.tokenAddress?.toLowerCase() === tokenIdToFilter.toLowerCase()
        );
      } else { // Domyślnie szukaj USDC lub weź pierwszy
        targetBalanceEntry = balancesData.tokenBalances.find(tb => tb.token?.symbol === 'USDC') || balancesData.tokenBalances[0];
      }
      
      if (!targetBalanceEntry || targetBalanceEntry.amount === undefined || targetBalanceEntry.amount === null) {
        this.logger.warn(`Token [${tokenIdToFilter || 'any'}] balance not found or invalid for wallet ${walletId}. Assuming 0.`);
        return 0;
      }
      
      const balanceValue = parseFloat(targetBalanceEntry.amount);
      this.logger.log(`Balance for wallet ${walletId}, token [${targetBalanceEntry.token?.symbol || tokenIdToFilter || 'N/A'}]: ${balanceValue}`);
      return balanceValue;

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error (fetch balance)';
      this.logger.error(`Failed to fetch balance for wallet ${walletId}: ${errorMessage}`, error.stack);
      throw new InternalServerErrorException(`Nie można pobrać salda portfela (${walletId}): ${errorMessage}`);
    }
  }

  async initiateInternalTipTransfer(
    sourceCircleWalletId: string,
    destinationCircleWalletId: string,
    amountNetString: string,
    blockchain: Blockchain,
    tokenId: string,
    tipJarPlatformFeeString: string,
    originalTipAmountString: string,
  ): Promise<{ circleTransactionId: string; status: TransactionState; txHash?: string }> {
    this.logger.log(`Internal tip: ${originalTipAmountString} USDC (Net: ${amountNetString}) from ${sourceCircleWalletId} to ${destinationCircleWalletId}. Fee: ${tipJarPlatformFeeString}.`);
    const amountNetDecimal = parseFloat(amountNetString);
    if (isNaN(amountNetDecimal) || amountNetDecimal <= 0) {
      this.logger.warn(`Invalid net amount for internal tip: ${amountNetString}`);
      throw new BadRequestException('Nieprawidłowa kwota netto transferu.');
    }
    this.logger.warn(`Balance check placeholder for wallet ${sourceCircleWalletId} (internal tip).`);

    const destinationWalletRecord = await this.prisma.user.findFirst({ 
        where: { circleWalletId: destinationCircleWalletId },
        select: { mainWalletAddress: true }
    });

    if (!destinationWalletRecord || !destinationWalletRecord.mainWalletAddress) {
        this.logger.error(`Could not find blockchain address for destination Circle Wallet ID: ${destinationCircleWalletId}`);
        throw new NotFoundException(`Nie można znaleźć adresu docelowego portfela twórcy.`);
    }
    const destinationBlockchainAddress = destinationWalletRecord.mainWalletAddress;
    const idempotencyKey = randomUUID();
    
    const tokenInfo: TokenInfo = tokenId.includes('-')
      ? { tokenId: tokenId }
      : { 
          tokenAddress: tokenId, 
          blockchain: blockchain as unknown as TokenBlockchain // Rzutowanie typu
        };

    const transferRequestPayload: CreateTransferTransactionInput = {
      idempotencyKey,
      walletId: sourceCircleWalletId,
      destinationAddress: destinationBlockchainAddress,
      amount: [amountNetString], // 'amount' (singular) jest typu string[]
      ...tokenInfo,
      fee: {
        type: 'level',
        config: {
          feeLevel: FeeLevel.Medium,
        },
      },
    };

    this.logger.debug(`Calling Circle API (internal tip): ${JSON.stringify(transferRequestPayload)}`);
    try {
      const response = await this.circleClient.createTransaction(transferRequestPayload);
      const txData = response?.data;
      if (!txData || !txData.id || !txData.state) {
        this.logger.error(`Invalid Circle SDK response (internal tip): ${JSON.stringify(response?.data)}`);
        throw new InternalServerErrorException('Nie udało się zainicjować napiwku - błąd SDK Circle.');
      }
      this.logger.log(`Internal tip initiated. CircleTxID: ${txData.id}, State: ${txData.state}`);
      const fullTransactionDetails = await this.getTransactionStatus(txData.id);
      return { 
        circleTransactionId: txData.id, 
        status: txData.state as TransactionState, 
        txHash: fullTransactionDetails?.txHash 
      };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error (internal tip)';
      const errorCode = error.response?.data?.code;
      this.logger.error(`Circle API Error (internal tip) (Src: ${sourceCircleWalletId}, Dest: ${destinationCircleWalletId}, Code: ${errorCode || 'N/A'}): ${errorMessage}`, error.stack);
      throw new HttpException(`Nie udało się zlecić napiwku: ${errorMessage}`, error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransactionStatus(circleTransactionId: string): Promise<Transaction | null> {
    this.logger.debug(`Fetching status for Circle transaction ID: ${circleTransactionId}`);
    try {
      const requestPayload: GetTransactionInput = { id: circleTransactionId };
      const response = await this.circleClient.getTransaction(requestPayload);
      const transactionDetails = response?.data?.transaction; // response.data to TransactionResponse, transaction to Transaction

      if (!transactionDetails) {
        this.logger.warn(`No details for CircleTxID: ${circleTransactionId}. Response: ${JSON.stringify(response?.data)}`);
        return null;
      }
      this.logger.log(`Status for CircleTx ${circleTransactionId}: ${transactionDetails.state}, TxHash: ${transactionDetails.txHash || 'N/A'}`);
      return transactionDetails;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error (fetch tx status)';
      const errorCode = error.response?.data?.code;
      this.logger.error(`Circle API Error (fetch tx status) for ${circleTransactionId} (Code: ${errorCode || 'N/A'}): ${errorMessage}`, error.stack);
      throw new HttpException(`Nie udało się pobrać statusu transakcji (${circleTransactionId}): ${errorMessage}`, error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}