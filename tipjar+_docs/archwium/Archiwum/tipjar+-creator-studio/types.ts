
export type WidgetStyle = 'button' | 'slider';
export type WidgetShape = 'circle' | 'rounded' | 'square';

export interface TipWidgetConfig {
  handle: string;
  style: WidgetStyle;
  shape: WidgetShape;
  label: string;
  themeColor: string;
  textColor: string;
  minAmount: number;
  maxAmount: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'tip' | 'subscription' | 'withdrawal';
  amount: number;
  sender: string;
  message?: string;
  status: 'completed' | 'pending';
}

export interface UserStats {
  balance: number;
  totalEarned: number;
  tipsThisWeek: number;
  subscribers: number;
}
