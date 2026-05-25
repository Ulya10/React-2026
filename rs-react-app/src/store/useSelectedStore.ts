import { create } from 'zustand';
import type { ResultItem } from '../types/types';

interface SelectedStore {
  selectedIndexes: number[];
  results: ResultItem[];

  toggleItem: (index: number) => void;
  unselectAll: () => void;
  isSelected: (index: number) => boolean;
  setResults: (results: ResultItem[]) => void;
}

export const useSelectedStore = create<SelectedStore>((set, get) => ({
  selectedIndexes: [],
  results: [],

  toggleItem: (index: number) => {
    const { selectedIndexes } = get();
    if (selectedIndexes.includes(index)) {
      set({ selectedIndexes: selectedIndexes.filter((i) => i !== index) });
    } else {
      set({ selectedIndexes: [...selectedIndexes, index] });
    }
  },

  unselectAll: () => {
    set({ selectedIndexes: [] });
  },

  isSelected: (index: number) => {
    return get().selectedIndexes.includes(index);
  },

  setResults: (results: ResultItem[]) => {
    set({ results });
  },
}));
