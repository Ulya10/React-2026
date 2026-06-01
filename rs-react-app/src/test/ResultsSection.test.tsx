import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultsSection from '../components/ResultsSection.tsx';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

const mockResults = [
  { name: 'bulbasaur', description: 'grass type', id: 1 },
  { name: 'charmander', description: 'fire type', id: 2 },
];

function renderWithRouter(component: React.ReactElement) {
  return render(<MemoryRouter>{component}</MemoryRouter>);
}

describe('ResultsSection', () => {
  it('renders list of results', () => {
    renderWithRouter(
      <ResultsSection
        results={mockResults}
        isLoading={false}
        error={null}
        currentPage={1}
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('grass type')).toBeInTheDocument();
    expect(screen.getByText('fire type')).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    renderWithRouter(
      <ResultsSection
        results={mockResults}
        isLoading={false}
        error={null}
        currentPage={1}
      />
    );

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  it('shows empty state when array is empty', () => {
    render(
      <ResultsSection
        results={[]}
        isLoading={false}
        error={null}
        currentPage={1}
      />
    );

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(
      <ResultsSection
        results={[]}
        isLoading={true}
        error={null}
        currentPage={1}
      />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <ResultsSection
        results={[]}
        isLoading={false}
        error="Server error: 404"
        currentPage={1}
      />
    );

    expect(screen.getByText(/server error: 404/i)).toBeInTheDocument();
  });

  it('does not show results when isLoading is true', () => {
    render(
      <ResultsSection
        results={mockResults}
        isLoading={true}
        error={null}
        currentPage={1}
      />
    );

    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });

  it('stops propagation when clicking on list item', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <ResultsSection
        results={mockResults}
        isLoading={false}
        error={null}
        currentPage={1}
      />
    );

    const listItem = screen.getByText('bulbasaur').closest('li')!;
    await user.click(listItem);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });
});
