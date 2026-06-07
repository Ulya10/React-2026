import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
export function Modal({
  isOpen,
  children,
  onClose,
  title,
}: {
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
  title: string;
}) {
  useEffect(() => {
    function escapePress(evt: KeyboardEvent) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', escapePress);
    return () => document.removeEventListener('keydown', escapePress);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!isOpen) return;
  return createPortal(
    <div
      className="overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal" onClick={(evt) => evt.stopPropagation()}>
        <h2>{title}</h2>
        <p>{children}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}
