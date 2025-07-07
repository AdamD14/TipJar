class PrismaClient {
  constructor() {}
  async $connect() {}
  async $disconnect() {}
}
const UserRole = { FAN: 'FAN', CREATOR: 'CREATOR', ADMIN: 'ADMIN' };
const TipStatus = { PENDING: 'PENDING', PROCESSING: 'PROCESSING', COMPLETED: 'COMPLETED', FAILED: 'FAILED', REFUNDED: 'REFUNDED' };
const PayoutStatus = { PENDING: 'PENDING', PROCESSING: 'PROCESSING', COMPLETED: 'COMPLETED', FAILED: 'FAILED' };
module.exports = { PrismaClient, UserRole, TipStatus, PayoutStatus };
