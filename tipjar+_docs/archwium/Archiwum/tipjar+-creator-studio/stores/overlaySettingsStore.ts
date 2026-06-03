
import { create } from 'zustand';
import { 
  OverlaySettings, 
  defaultOverlaySettings, 
  sanitizeOverlaySettings 
} from '../types/overlay';

type OverlayState = {
  settings: OverlaySettings;
  pending: boolean;
  error?: string;
  set: (patch: Partial<OverlaySettings>) => void;
  reset: () => void;
  load: (creatorId: string) => Promise<void>;
  save: (creatorId: string) => Promise<void>;
};

export const useOverlaySettingsStore = create<OverlayState>((set, get) => ({
  settings: defaultOverlaySettings,
  pending: false,
  error: undefined,

  set: (patch) =>
    set((state) => ({
      settings: sanitizeOverlaySettings({ ...state.settings, ...patch }),
    })),

  reset: () => set({ settings: defaultOverlaySettings, error: undefined }),

  load: async (creatorId) => {
    set({ pending: true, error: undefined });
    try {
      // W wersji demo symulujemy pobieranie, w produkcji byłby tu fetch
      const saved = localStorage.getItem(`overlay_${creatorId}`);
      if (saved) {
        set({ settings: sanitizeOverlaySettings(JSON.parse(saved)), pending: false });
      } else {
        set({ pending: false });
      }
    } catch (e) {
      set({ error: 'LOAD_ERROR', pending: false });
    }
  },

  save: async (creatorId) => {
    set({ pending: true, error: undefined });
    try {
      localStorage.setItem(`overlay_${creatorId}`, JSON.stringify(get().settings));
      // Symulacja opóźnienia sieciowego
      await new Promise(r => setTimeout(r, 8000));
      set({ pending: false });
    } catch {
      set({ error: 'SAVE_ERROR', pending: false });
    }
  },
}));
