'use client';

import { optionsTheme } from '@/data';
import { useTheme } from '@/hooks';
import { useId } from 'react';
import { MdLightMode } from 'react-icons/md';
import { Popover } from 'safira-ui/react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../button';
import type { ThemeMenuProps } from './component.type';

export function ThemeMenu(props: ThemeMenuProps) {
  const { items, type = 'float' } = props;
  const { setTheme, theme } = useTheme();
  const reactId = useId();
  const popoverId = `theme-menu-${reactId.replaceAll(':', '')}`;
  const currentIcon = optionsTheme[theme].icon || <MdLightMode size={22} />;

  return (
    <div
      className={twMerge(
        'relative [&>button]:justify-center',
        type === 'float' &&
          'absolute top-5 right-5 [&>button]:h-11 [&>button]:w-11 [&>button]:rounded-xl [&>button]:border-[color-mix(in_srgb,var(--color-text)_15%,transparent)] [&>button]:bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] [&>button]:p-0 [&>button]:text-(--color-text)',
        type === 'inline' &&
          '[&>button]:border-(--color-border) [&>button]:bg-transparent [&>button]:text-(--color-text)',
      )}
    >
      <Popover
        id={popoverId}
        placement="bottom"
        title="Selecionar tema"
        closeLabel="Fechar menu de temas"
        label={
          <>
            <span aria-hidden="true">{currentIcon}</span>
            <span className="sf-visually-hidden">Selecionar tema</span>
          </>
        }
        className={twMerge(
          'w-64 overflow-hidden rounded-2xl border p-6',
          'border-[color-mix(in_srgb,var(--color-text)_15%,transparent)]',
          'bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-bg)_95%,transparent),color-mix(in_srgb,var(--color-bg)_85%,transparent))]',
          'shadow-[0_20px_60px_color-mix(in_srgb,var(--color-primary)_30%,transparent)]',
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px)] bg-size-[28px_28px] opacity-20" />
        <nav className="scroll-div relative flex max-h-75 flex-col gap-4 overflow-auto" aria-label="Temas disponíveis">
          {items.map((item) => (
            <Button
              key={item.label}
              variant="unstyled"
              type="button"
              aria-pressed={theme === item.value}
              popoverTarget={popoverId}
              popoverTargetAction="hide"
              onClick={() => setTheme(item.value)}
              className={twMerge(
                'w-full justify-start rounded-lg px-4 py-2 font-medium text-(--color-text) transition-all hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] hover:text-(--color-primary)',
                theme === item.value &&
                  'bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]',
              )}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </Popover>
    </div>
  );
}
