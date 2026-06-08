import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Modal from '../components/Modal';

describe('Modal', () => {
  it('not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test">
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('render when open', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test">
        <p>Content</p>
      </Modal>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('close when ESC pressed', async () => {
    let closed = false;
    render(
      <Modal
        isOpen={true}
        onClose={() => {
          closed = true;
        }}
        title="Test"
      >
        <p>Content</p>
      </Modal>
    );
    await userEvent.keyboard('{Escape}');
    expect(closed).toBe(true);
  });

  it('close on overlay', async () => {
    let closed = false;
    render(
      <Modal
        isOpen={true}
        onClose={() => {
          closed = true;
        }}
        title="Test"
      >
        <p>Content</p>
      </Modal>
    );
    const overlay = screen.getByRole('dialog');
    await userEvent.click(overlay);
    expect(closed).toBe(true);
  });
});
