export const EP = {
  creators: '/api/v1/creators',
  tips: '/api/v1/tips',
  me: '/api/v1/auth/me',
  notifications: '/api/v1/notifications',
  wallet: '/api/v1/circle/wallet',
  walletBalance: '/api/v1/circle/wallet/balance',
  walletTxs: '/api/v1/circle/wallet/transactions',
} as const;
