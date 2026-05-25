import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedStore } from '../store/useSelectedStore';

describe('useSelectedStore', () => {
  beforeEach(() => {
    useSelectedStore.setState({ selectedIndexes: [], results: [] });
  });

  it('toggles item selection', () => {
    const store = useSelectedStore.getState();

    store.toggleItem(3);
    expect(useSelectedStore.getState().selectedIndexes).toEqual([3]);

    store.toggleItem(3);
    expect(useSelectedStore.getState().selectedIndexes).toEqual([]);
  });

  it('unselects all items', () => {
    useSelectedStore.setState({ selectedIndexes: [0, 3] });

    useSelectedStore.getState().unselectAll();
    expect(useSelectedStore.getState().selectedIndexes).toEqual([]);
  });

  it('checks if item is selected', () => {
    useSelectedStore.setState({ selectedIndexes: [0, 3] });

    const store = useSelectedStore.getState();
    expect(store.isSelected(3)).toBe(true);
    expect(store.isSelected(5)).toBe(false);
  });
});
