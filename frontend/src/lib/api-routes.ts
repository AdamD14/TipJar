export const API = {
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    GOOGLE: "/api/v1/auth/google",
    GOOGLE_CB: "/api/v1/auth/google/callback",
    TWITCH: "/api/v1/auth/twitch",
    TWITCH_CB: "/api/v1/auth/twitch/callback",
    ME: "/api/v1/auth/me",
    VERIFY: "/api/v1/auth/verify-email/:token",
    REFRESH: "/api/v1/auth/refresh-token",
    LOGOUT: "/api/v1/auth/logout",
  },
  USERS: {
    USERNAME_CHECK: "/api/v1/users/username-check",
    SET_USERNAME: "/api/v1/users/set-username",
    PUBLIC_BY_USERNAME: "/api/v1/users/public/:username",
  },
  TIPS: {
    CREATE: "/api/v1/tips",
    GUEST: "/api/v1/tips/guest",
  },
  CREATOR: {
    PAYOUT: "/api/v1/creator/payout",
  },
  CIRCLE: {
    WALLET_CREATE: "/api/v1/api/v1/circle/wallet/create",
    WALLET: "/api/v1/api/v1/circle/wallet",
    BALANCE: "/api/v1/api/v1/circle/wallet/balance",
    TXS: "/api/v1/api/v1/circle/wallet/transactions",
    DEPOSIT_HOSTED: "/api/v1/api/v1/circle/deposit-hosted",
    WITHDRAW: "/api/v1/api/v1/circle/withdraw",
    CCTP_TRANSFER: "/api/v1/api/v1/circle/cctp/transfer",
    WEBHOOK: "/api/v1/api/v1/circle/webhook",
    ADMIN_WALLETS: "/api/v1/api/v1/circle/admin/circle/wallets",
  },
  FAN: {
    BALANCE: "/api/v1/api/v1/fan/wallet/balance",
    TIPS_HISTORY: "/api/v1/api/v1/fan/tips/history",
  },
  NOTIFICATIONS: "/api/v1/api/v1/notifications",
} as const;
