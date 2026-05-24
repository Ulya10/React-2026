import { create } from 'zustand';

interface SelectedStore {
  selectedIndexes: number[];

  toggleItem: (index: number) => void;
  unselectAll: () => void;
  isSelected: (index: number) => boolean;
}

export const useSelectedStore = create<SelectedStore>((set, get) => ({
  selectedIndexes: [],

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
}));
