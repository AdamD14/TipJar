declare module '@prisma/client' {
  export enum TipStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
  }
  export enum UserRole {
    FAN = 'FAN',
    CREATOR = 'CREATOR',
    ADMIN = 'ADMIN'
  }
  export type Tip = any;
}
