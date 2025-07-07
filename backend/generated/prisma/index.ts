export class PrismaClient {
  [key: string]: any;
  constructor(options?: any) {}
  async $connect(): Promise<void> {}
  async $disconnect(): Promise<void> {}
}

export enum UserRole {
  FAN = 'FAN',
  CREATOR = 'CREATOR',
  ADMIN = 'ADMIN'
}

export enum TipStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export type User = any;
export type SocialConnection = any;
export type Tip = any;
export type Payout = any;
export const Prisma = {} as any;
export namespace Prisma {
  export type UserCreateInput = any;
}
