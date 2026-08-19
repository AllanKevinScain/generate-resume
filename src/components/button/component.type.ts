import type { ButtonProps as SafiraButtonProps, ButtonVariant as SafiraButtonVariant } from 'safira-ui/react';

export type ButtonVariant = Exclude<SafiraButtonVariant, 'secondary'> | 'outline';

export interface ButtonProps extends Omit<SafiraButtonProps, 'variant'> {
  variant?: ButtonVariant;
}
