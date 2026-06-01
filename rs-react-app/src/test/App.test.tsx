import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from '../context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getItems, getDetails } from '../api/api';
vi.mock('../api/api', () => ({
  getItems: vi.fn(),
  getDetails: vi.fn(),
}));

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

const mockData = [
  { name: 'Joke 1', description: 'Answer 1', id: 1 },
  { name: 'Joke 2', description: 'Answer 2', id: 2 },
];

const mockDetail = {
  id: 1,
  name: 'detail joke',
  description: 'Detail Description',
  type: 'general',
};

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('shows loading on initial load', () => {
    vi.mocked(getItems).mockReturnValue(new Promise(() => {}));
    renderApp();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('loads and displays results on mount', async () => {
    vi.mocked(getItems).mockResolvedValue(mockData);
    renderApp();
    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });

    expect(screen.getByText('Joke 2')).toBeInTheDocument();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('calls getItems with saved text from localStorage', async () => {
    localStorage.setItem('search-text', 'why');
    vi.mocked(getItems).mockResolvedValue([]);
    renderApp();
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledWith('why');
    });
  });

  it('calls getItems without params when localStorage is empty', async () => {
    vi.mocked(getItems).mockResolvedValue([]);
    renderApp();
    await waitFor(() => {
      expect(getItems).toHaveBeenCalledWith('');
    });
  });

  it('updates results with user search', async () => {
    vi.mocked(getItems).mockResolvedValue([]);
    renderApp();
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'new search');
    await userEvent.click(button);
    expect(getItems).toHaveBeenCalledWith('new search');
  });

  it('shows error message when API fails', async () => {
    vi.mocked(getItems).mockRejectedValue(new Error('Server error: 500'));
    renderApp();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(screen.getByText(/server error: 500/i)).toBeInTheDocument();
  });

  it('resets error when new search is made', async () => {
    vi.mocked(getItems)
      .mockRejectedValueOnce(new Error('Server error: 500'))
      .mockResolvedValueOnce(mockData);
    renderApp();

    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
    expect(screen.getByText(/server error: 500/i)).toBeInTheDocument();

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.type(input, 'joke');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });
    expect(screen.queryByText(/server error/i)).not.toBeInTheDocument();
  });

  it('shows loading indicator in details section', () => {
    window.history.pushState({}, '', '/1/details/5');
    vi.mocked(getItems).mockReturnValue(new Promise(() => {}));
    renderApp();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows details section after clicking', async () => {
    vi.mocked(getItems).mockResolvedValue(mockData);
    vi.mocked(getDetails).mockResolvedValue(mockDetail);

    renderApp();
    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });
    const user = userEvent.setup();
    await user.click(screen.getByText('Joke 1'));

    await waitFor(() => {
      expect(screen.getByText(/item #1/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/general/i)).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('shows error in details section when API fails', async () => {
    vi.mocked(getItems).mockResolvedValue(mockData);
    vi.mocked(getDetails).mockRejectedValue(new Error('Server error: 404'));

    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Joke 1')).toBeInTheDocument();
    });

    const user = userEvent.setup();
    await user.click(screen.getByText('Joke 1'));

    await waitFor(() => {
      expect(screen.getByText(/server error: 404/i)).toBeInTheDocument();
    });
  });
});
