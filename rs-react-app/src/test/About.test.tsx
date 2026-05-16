import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import About from '../components/About';

describe('About', () => {
  it('renders about page with author info', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/Ulya10/i)).toBeInTheDocument();
  });

  it('has link back to home', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /back/i });
    expect(link).toBeInTheDocument();
  });
});
