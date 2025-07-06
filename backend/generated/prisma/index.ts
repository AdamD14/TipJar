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

export type User = any;
export type SocialConnection = any;
export const Prisma = {} as any;
export namespace Prisma {
  export type UserCreateInput = any;
}
