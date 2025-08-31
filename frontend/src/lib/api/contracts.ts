export type User = {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  socials?: Record<string, string>;
};

export type CreatorProfile = {
  name: string;
  alias: string;
  bio: string;
  links?: {
    youtube?: string;
    twitch?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  goal?: {
    target: number;
    current?: number;
  };
};

export type Tip = {
  id: string;
  amount: number;
  currency: 'USDC';
  from?: string;
  note?: string;
  createdAt: string;
};

export type Tx = {
  id: string;
  type: 'tip' | 'sub' | 'payout';
  amount: number;
  currency: 'USDC';
  createdAt: string;
  note?: string;
  from?: string;
  status?: 'pending' | 'done' | 'failed';
};

export type Wallet = {
  id: string;
  balance: { amount: number; currency: 'USDC' };
  transactions?: Tx[];
};

export type Stats = {
  series: number[];
  total: number;
  fans: number;
};

export type Notification = {
  id?: string | number;
  title?: string;
  type?: string;
  createdAt?: string;
  date?: string;
  read?: boolean;
};

export type ExploreItem = {
  handle: string;
  score?: number;
  tags?: string[];
  createdAt?: string;
  avatarUrl?: string;
  live?: boolean;
};
