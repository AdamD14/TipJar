export type User = {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  socials?: Record<string, string>;
};

export type Goal = {
  id: string;
  title: string;
  targetAmount: number; // cents
  raised: number; // cents
  description?: string;
  active: boolean;
};

export type Tier = {
  id: string;
  name: string;
  price: number; // cents per month
  perks: string[];
  active: boolean;
};

export type WalletBalance = { amount: number; currency: 'USDC' };

export type Tx = {
  id: string;
  type: 'tip' | 'sub' | 'payout';
  amount: number;
  currency: 'USDC';
  createdAt: string; // ISO
  note?: string;
  from?: string;
  status?: 'pending' | 'done' | 'failed';
};

