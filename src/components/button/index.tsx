import { forwardRef } from 'react';
import {
  Button as SafiraButton,
  type ButtonProps as SafiraButtonProps,
  type ButtonVariant as SafiraButtonVariant,
} from 'safira-ui/react';
import { twMerge } from 'tailwind-merge';

export type ButtonVariant = Exclude<SafiraButtonVariant, 'secondary'> | 'outline';

export interface ButtonProps extends Omit<SafiraButtonProps, 'variant'> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', className, children, ...props },
  ref,
) {
  const safiraVariant = variant === 'outline' ? 'secondary' : variant;

  return <SafiraButton {...props} ref={ref} variant={safiraVariant} className={twMerge('inline-flex items-center gap-2', className)}>
    {children}
  </SafiraButton>;
});
