import type { ReactNode } from 'react';

export type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  classNameTooltip?: string;
};
