import { create } from 'zustand';

export interface TipWidgetConfig {
  handle: string;
  shape: 'circle' | 'rounded' | 'square';
  size: 'small' | 'medium' | 'large';
  bgColor: string;
  textColor: string;
  iconType: 'custom' | 'emoji' | 'preset';
  iconValue: string;
  label: string;
  behavior: 'modal' | 'redirect';
  openStyle: 'click' | 'hover' | 'always';
  minAmount: number;
  maxAmount: number;
}

interface TipWidgetStore {
  config: TipWidgetConfig;
  setConfig: (conf: Partial<TipWidgetConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: TipWidgetConfig = {
  handle: 'alex_streamer',
  shape: 'rounded',
  size: 'medium',
  bgColor: '#006D6D',
  textColor: '#FFFFFF',
  iconType: 'emoji',
  iconValue: '💸',
  label: 'Wesprzyj mnie',
  behavior: 'modal',
  openStyle: 'click',
  minAmount: 1,
  maxAmount: 100,
};

export const useWidgetStore = create<TipWidgetStore>((set) => ({
  config: defaultConfig,
  setConfig: (conf) =>
    set((state) => ({
      config: { ...state.config, ...conf },
    })),
  resetConfig: () => set({ config: defaultConfig }),
}));
