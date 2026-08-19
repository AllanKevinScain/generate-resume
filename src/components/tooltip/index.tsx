'use client';

import { useState, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import type { TooltipProps } from './component.type';

export function Tooltip(props: TooltipProps) {
  const { content, children, side = 'top', delay = 150, className, classNameTooltip } = props;
  const [open, setOpen] = useState(false);
  const id = useId();

  let positionClasses = '';
  let initial = {};
  let animate = {};

  switch (side) {
    case 'top':
      positionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      initial = { opacity: 0, y: 6, scale: 0.96 };
      animate = { opacity: 1, y: 0, scale: 1 };
      break;

    case 'bottom':
      positionClasses = 'top-full left-1/2 -translate-x-1/2 mt-2';
      initial = { opacity: 0, y: -6, scale: 0.96 };
      animate = { opacity: 1, y: 0, scale: 1 };
      break;

    case 'left':
      positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-2';
      initial = { opacity: 0, x: 6, scale: 0.96 };
      animate = { opacity: 1, x: 0, scale: 1 };
      break;

    case 'right':
      positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-2';
      initial = { opacity: 0, x: -6, scale: 0.96 };
      animate = { opacity: 1, x: 0, scale: 1 };
      break;
  }

  return (
    <div
      className={twMerge('relative inline-flex', className)}
      onMouseEnter={() => setTimeout(() => setOpen(true), delay)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-describedby={id}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            role="tooltip"
            initial={initial}
            animate={animate}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={twMerge(
              'absolute z-50',
              'text-sm whitespace-nowrap text-(--color-text)',
              'px-3 py-1.5 pointer-events-none',
              'rounded-lg shadow-lg backdrop-blur-md',
              'bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))]',
              'border border-[color-mix(in_srgb,var(--color-text)_15%,transparent)]',
              positionClasses,
              classNameTooltip,
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
