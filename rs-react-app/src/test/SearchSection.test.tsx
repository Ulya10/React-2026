import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
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

  it('updates input value when user types', async () => {
    render(<SearchSection onSubmitToSearch={() => {}} />);
    
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello');
    
    expect(input).toHaveValue('hello');
  });

  it('saves trimmed text to localStorage on submit', async () => {
    render(<SearchSection onSubmitToSearch={() => {}} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  why  ');
    await userEvent.click(button);

    expect(localStorage.getItem('search-text')).toBe('why');
  });

  it('calls onSubmitToSearch with trimmed text', async () => {
    const handleSearch = vi.fn();
    render(<SearchSection onSubmitToSearch={handleSearch} />);
    
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, '  why  ');
    await userEvent.click(button);

    expect(handleSearch).toHaveBeenCalledTimes(1);
    expect(handleSearch).toHaveBeenCalledWith('why');
  });

  it('does not call onSubmitToSearch when input is empty', async () => {
    const handleSearch = vi.fn();
    render(<SearchSection onSubmitToSearch={handleSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    await userEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith('');
  });

  it('overwrites existing localStorage value on new search', async () => {
  localStorage.setItem('search-text', 'old-value');
  render(<SearchSection onSubmitToSearch={() => {}} />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });

  await userEvent.clear(input);
  await userEvent.type(input, 'new-value');
  await userEvent.click(button);

  expect(localStorage.getItem('search-text')).toBe('new-value');
});
});
