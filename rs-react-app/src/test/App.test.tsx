import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

vi.mock('../api/api', () => ({
  getItems: vi.fn(),
}));

import { getItems } from '../api/api';

const mockData = [
  { name: 'Joke 1', description: 'Answer 1' },
  { name: 'Joke 2', description: 'Answer 2' },
];

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows loading on initial load', () => {
    vi.mocked(getItems).mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('loads and displays results on mount', async () => {
    vi.mocked(getItems).mockResolvedValue(mockData);
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Joke 2')).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('calls getItems with saved text from localStorage', async () => {
    localStorage.setItem('search-text', 'why');
    vi.mocked(getItems).mockResolvedValue([]);
    render(<App />);
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledWith('why');
    });
  });

  it('calls getItems without params when localStorage is empty', async () => {
    vi.mocked(getItems).mockResolvedValue([]);
    render(<App />);
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledWith();
    });
  });

  it('updates results with user search', async () => {
    vi.mocked(getItems).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'new search');
    await userEvent.click(button);
    expect(getItems).toHaveBeenCalledWith('new search');
  });

  it('shows error message when API fails', async () => {
    vi.mocked(getItems).mockRejectedValue(new Error('Server error: 500'));
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/server error: 500/i)).toBeInTheDocument();
    });
  });

  it('resets error when new search is made', async () => {
    vi.mocked(getItems)
      .mockRejectedValueOnce(new Error('Server error: 500'))
      .mockResolvedValueOnce(mockData);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/server error: 500/i)).toBeInTheDocument();
    });

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.type(input, 'joke');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });
    expect(screen.queryByText(/server error/i)).not.toBeInTheDocument();
  });
});