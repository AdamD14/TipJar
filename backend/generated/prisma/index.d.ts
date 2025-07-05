export class PrismaClient {
  constructor(options?: any);
  tip: any;
  user: any;
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}
export enum UserRole { FAN = 'FAN', CREATOR = 'CREATOR', ADMIN = 'ADMIN' }
export enum TipStatus { PENDING = 'PENDING', PROCESSING = 'PROCESSING', COMPLETED = 'COMPLETED', FAILED = 'FAILED', REFUNDED = 'REFUNDED' }
export type Tip = any;
export type User = any;
export namespace Prisma {}
