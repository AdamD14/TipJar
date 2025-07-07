declare module '@prisma/client' {
  export class PrismaClient {
    constructor(options?: any)
    tip: any
    user: any
    payout: any
    socialConnection: any
    overlaySettings: any
    $connect(): Promise<void>
    $disconnect(): Promise<void>
  }
  export const Prisma: any
  export enum UserRole { FAN = 'FAN', CREATOR = 'CREATOR', ADMIN = 'ADMIN' }
  export enum TipStatus { PENDING = 'PENDING', PROCESSING = 'PROCESSING', COMPLETED = 'COMPLETED', FAILED = 'FAILED', REFUNDED = 'REFUNDED' }
  export enum PayoutStatus { PENDING = 'PENDING', PROCESSING = 'PROCESSING', COMPLETED = 'COMPLETED', FAILED = 'FAILED' }
  export type Tip = any
  export type User = any
  export type Payout = any
  export type SocialConnection = any
  export type OverlaySettings = any
  export namespace Prisma {
    export type UserCreateInput = any
    export type OverlaySettingsUncheckedUpdateInput = any
    export type OverlaySettingsUncheckedCreateInput = any
  }
}
