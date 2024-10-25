import { create } from "zustand";

export type GameLength = "under20" | "20to40" | "40to60" | "over60" | null;

interface FilterState {
  selectedLength: GameLength;
  selectedHero: number | null;
  selectedDeath: string | null;
  selectedKills: string | null;
  selectedAssists: string | null;
  setSelectedLength: (length: GameLength) => void;
  setSelectedHero: (heroId: number | null) => void;
  setSelectedDeath: (death: string | null) => void;
  setSelectedKills: (kills: string | null) => void;
  setSelectedAssists: (assists: string | null) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedLength: null,
  selectedHero: null,
  selectedDeath: null,
  selectedKills: null,
  selectedAssists: null,
  setSelectedLength: (length) => set({ selectedLength: length }),
  setSelectedHero: (heroId) => set({ selectedHero: heroId }),
  setSelectedDeath: (death) => set({ selectedDeath: death }),
  setSelectedKills: (kills) => set({ selectedKills: kills }),
  setSelectedAssists: (assists) => set({ selectedAssists: assists }),
  resetFilters: () =>
    set({
      selectedLength: null,
      selectedHero: null,
      selectedDeath: null,
      selectedKills: null,
      selectedAssists: null,
    }),
}));
