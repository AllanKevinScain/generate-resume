'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function SolidButton(props: HTMLMotionProps<'button'>) {
  const { children, className, ...rest } = props;
  return (
    <motion.button
      type="button"
      {...rest}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={twMerge(
        'inline-flex items-center gap-2',
        'font-medium text-white',
        'px-6 py-3 rounded-lg',
        'transition-all',
        'shadow-lg',
        'bg-linear-to-r from-(--color-primary) to-(--color-secondary)',
        'shadow-[0_10px_30px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]',
        'cursor-pointer',
        rest.disabled &&
          'disabled:bg-linear-to-r from-neutral-500 to-neutral-400',
        rest.disabled && 'disabled:text-neutral-500',
        rest.disabled && 'disabled:shadow-none',
        rest.disabled && 'disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
