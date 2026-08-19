import type { ThemeType } from '@/types';
import type { ReactNode } from 'react';

export interface ThemeMenuProps {
  items: { label: string; value: ThemeType; icon?: ReactNode }[];
  type?: 'float' | 'inline';
}
