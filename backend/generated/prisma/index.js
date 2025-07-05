class PrismaClient {
  constructor() {}
  async $connect() {}
  async $disconnect() {}
}
const UserRole = { FAN: 'FAN', CREATOR: 'CREATOR', ADMIN: 'ADMIN' };
const TipStatus = { PENDING: 'PENDING', PROCESSING: 'PROCESSING', COMPLETED: 'COMPLETED', FAILED: 'FAILED', REFUNDED: 'REFUNDED' };
module.exports = { PrismaClient, UserRole, TipStatus };
