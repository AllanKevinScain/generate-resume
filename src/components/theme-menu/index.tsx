'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useTheme } from '@/hooks';
import type { ThemeType } from '@/types';
import { MdLightMode } from 'react-icons/md';
import { optionsTheme } from '@/data';
import { Button } from '../button';

interface ThemeMenurops {
  items: { label: string; value: ThemeType; icon?: Element }[];
  type?: 'float' | 'inline'
}

export function ThemeMenu(props: ThemeMenurops) {
  const { items, type = 'float' } = props;
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className={twMerge(
      type === 'float' && 'absolute top-5 right-5',
    )}>
      <div className="flex gap-4">
        {type === 'inline' ? (
<Button.outline type="button" onClick={() => setOpen(!open)}>
                        <div className="space-y-1">
            {optionsTheme[theme].icon || <MdLightMode size={22} />}
          </div>
                      </Button.outline>
        ) : (<button
          onClick={() => setOpen(!open)}
          className={twMerge(
            'relative z-50',
            'w-11 h-11 rounded-xl',
            'flex items-center justify-center',
            'cursor-pointer',
            'bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)]',
            'border border-[color-mix(in_srgb,var(--color-text)_15%,transparent)]',
            'hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
            'transition-all',
          )}
        >
          <div className="space-y-1">
            {optionsTheme[theme].icon || <MdLightMode size={22} />}
          </div>
        </button>)}
        
        
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className={twMerge(
              'absolute right-0 mt-4 w-64',
              'rounded-2xl',
              'p-6',
              'overflow-hidden',
              'bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))]',
              'border border-[color-mix(in_srgb,var(--color-text)_15%,transparent)]',
              'shadow-[0_20px_60px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]',
            )}
          >
            <div
              className={twMerge(
                'absolute inset-0 opacity-20 pointer-events-none',
                'bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px)]',
                'bg-size-[28px_28px]',
              )}
            />

            <nav className="relative flex flex-col gap-4 max-h-75 overflow-auto scroll-div">
              {items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setTheme(item.value);
                    setOpen(false);
                  }}
                  className={twMerge(
                    'px-4 py-2 rounded-lg',
                    'font-medium',
                    'transition-all',
                    'text-(--color-text)',
                    'cursor-pointer',
                    'hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
                    theme === item.value &&
                      'bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
                    'hover:text-(--color-primary)',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="absolute inset-0 pointer-events-none">
              <div
                className={twMerge(
                  'absolute -inset-1 rounded-2xl blur-xl opacity-30',
                  'bg-[color-mix(in_srgb,var(--color-primary)_15%,transparent)]',
                )}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
