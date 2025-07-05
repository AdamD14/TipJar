export class PrismaClient {
  tip: any;
  user: any;
  socialConnection: any;
  profile: any;
  constructor(options?: any);
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}

export enum UserRole {
  FAN = 'FAN',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN',
}

export enum TipStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Tip {
  id: string;
  amount: any;
  creatorId: string;
  fanId?: string | null;
  status: TipStatus;
  platformFeeAmount?: any;
  netAmountForCreator?: any;
  message?: string | null;
  isAnonymous: boolean;
  circleTransferId?: string | null;
  paymentGatewayChargeId?: string | null;
  blockchainTransactionHash?: string | null;
  processedAt?: Date | null;
}

export interface User {
  id: string;
  email: string | null;
  password: string | null;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  emailVerificationToken?: string | null;
  emailVerificationTokenExpiresAt?: Date | null;
  currentHashedRefreshToken?: string | null;
  circleWalletId?: string | null;
  mainWalletAddress?: string | null;
  isCircleSetupComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialConnection {
  id: string;
  provider: string;
  providerId: string;
  userId: string;
}

export namespace Prisma {
  export interface UserCreateInput {}
}
