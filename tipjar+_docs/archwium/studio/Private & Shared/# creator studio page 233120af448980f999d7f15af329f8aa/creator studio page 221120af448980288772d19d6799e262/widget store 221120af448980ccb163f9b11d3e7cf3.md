# widget store

// lib/stores/widgetStore.ts
import { create } from 'zustand';

export interface TipWidgetConfig {
shape: 'circle' | 'rounded' | 'square';
size: 'small' | 'medium' | 'large';
bgColor: string;
textColor: string;
iconType: 'custom' | 'emoji' | 'preset';
iconValue: string; // URL lub emoji
label: string; // np. "Tip Me"
behavior: 'modal' | 'redirect';
openStyle: 'click' | 'hover' | 'always';
}

interface TipWidgetStore {
config: TipWidgetConfig;
setConfig: (conf: Partial<TipWidgetConfig>) => void;
resetConfig: () => void;
}

const defaultConfig: TipWidgetConfig = {
shape: 'rounded',
size: 'medium',
bgColor: '#006D6D',
textColor: '#FFFFFF',
iconType: 'emoji',
iconValue: '💸',
label: 'Tip Me',
behavior: 'modal',
openStyle: 'click',
};

export const useWidgetStore = create<TipWidgetStore>((set) => ({
config: defaultConfig,
setConfig: (conf) =>
set((state) => ({
config: {
...state.config,
...conf,
},
})),
resetConfig: () => set({ config: defaultConfig }),
}));