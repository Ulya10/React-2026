import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
export default function Modal({
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
  const contentRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const firstInput = contentRef.current.querySelector('input');
      firstInput?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return createPortal(
    <div
      className="overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        ref={contentRef}
        className="modal"
        onClick={(evt) => evt.stopPropagation()}
      >
        <h2>{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}
