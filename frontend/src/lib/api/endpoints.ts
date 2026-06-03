export const EP = {
  tips: '/api/v1/tips',
  publicTips: (creatorId: string) => `/api/v1/tips/public/${creatorId}`,
  goalProgress: (creatorId: string) => `/api/v1/tips/goal/${creatorId}`,
  stats: '/api/v1/creator/stats',
  profile: '/api/v1/creator/profile',
  balance: '/api/v1/creator/balance',
  withdraw: '/api/v1/creator/payout',
  goals: '/api/v1/creator/goals',
  subscriptions: '/api/v1/creator/subscriptions',
} as const;
