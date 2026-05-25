import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import Flyout from '../components/Flyout';
import { useSelectedStore } from '../store/useSelectedStore';

describe('Flyout', () => {
  beforeEach(() => {
    useSelectedStore.setState({ selectedIndexes: [], results: [] });
  });

  it('does not render when no items selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/selected/i)).not.toBeInTheDocument();
  });

  it('shows count of selected items', () => {
    useSelectedStore.setState({ selectedIndexes: [0, 3] });
    render(<Flyout />);
    expect(screen.getByText(/items selected: 2/i)).toBeInTheDocument();
  });

  it('unselect all clears selection', async () => {
    useSelectedStore.setState({ selectedIndexes: [0, 3] });
    render(<Flyout />);

    const button = screen.getByText(/unselect all/i);
    await userEvent.click(button);

    const state = useSelectedStore.getState();
    expect(state.selectedIndexes).toEqual([]);
  });

  it('downloads CSV file', async () => {
    useSelectedStore.setState({
      selectedIndexes: [0],
      results: [{ name: 'Test', description: 'Desc' }],
    });

    render(<Flyout />);

    const button = screen.getByText(/download/i);
    await userEvent.click(button);
  });
});
