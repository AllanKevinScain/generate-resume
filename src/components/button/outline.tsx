'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function OutlineButton(props: HTMLMotionProps<'button'>) {
  const { children, className, ...rest } = props;
  return (
    <motion.button
      type="button"
      {...rest}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={twMerge(
        'inline-flex items-center gap-2',
        'font-medium',
        'px-6 py-3 rounded-lg',
        'border transition-all',
        'text-(--color-text)',
        'border-(--color-border)',
        'hover:bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]',
        'hover:border-(--color-primary)',
        'hover:text-(--color-primary)',
        'cursor-pointer',
        rest.disabled && 'disabled:border-neutral-500',
        rest.disabled && 'disabled:text-neutral-500',
        rest.disabled && 'disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
