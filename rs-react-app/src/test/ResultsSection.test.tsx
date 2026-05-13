import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultsSection from '../components/ResultsSection.tsx';

const mockResults = [
  { name: 'bulbasaur', description: 'grass type' },
  { name: 'charmander', description: 'fire type' },
];

describe('ResultsSection', () => {
  it('renders list of results', () => {
    render(<ResultsSection results={mockResults} isLoading={false} error={null} />);
    
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charmander')).toBeInTheDocument();
    expect(screen.getByText('grass type')).toBeInTheDocument();
    expect(screen.getByText('fire type')).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    render(<ResultsSection results={mockResults} isLoading={false} error={null} />);
    
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

it('shows empty state when array is empty', () => {
  render(<ResultsSection results={[]} isLoading={false} error={null} />);
  
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

  it('shows loading indicator when isLoading is true', () => {
    render(<ResultsSection results={[]} isLoading={true} error={null} />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<ResultsSection results={[]} isLoading={false} error="Server error: 404" />);
    
    expect(screen.getByText(/server error: 404/i)).toBeInTheDocument();
  });

  it('does not show results when isLoading is true', () => {
    render(<ResultsSection results={mockResults} isLoading={true} error={null} />);
    
    expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
  });
});