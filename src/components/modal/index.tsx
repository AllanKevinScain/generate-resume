'use client';

import { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal(props: ModalProps) {
  const { isOpen, onClose, children } = props;

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl rounded-3xl border border-(--color-border) bg-(--color-bg) shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-border)_70%,transparent)] bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] text-(--color-text) transition hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]"
        >
          <HiXMark size={20} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}
