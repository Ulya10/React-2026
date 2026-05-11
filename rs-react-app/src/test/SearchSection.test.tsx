import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import SearchSection from '../components/SearchSection.tsx';

describe('SearchSection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('render Search Section with input and button', () => {
    render(<SearchSection onSubmitToSearch={() => {}} />);
    
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('show text from localStorage on loading', () => {
    localStorage.setItem('search-text', 'why');
    render(<SearchSection onSubmitToSearch={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('why');
  });

  it('show empty input if localStorage is empty', () => {
    render(<SearchSection onSubmitToSearch={() => {}} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

});