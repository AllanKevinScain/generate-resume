import { forwardRef } from 'react';
import { Button as SafiraButton } from 'safira-ui/react';
import { twMerge } from 'tailwind-merge';
import type { ButtonProps } from './component.type';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  componentProps,
  ref,
) {
  const { variant = 'primary', className, children, ...props } = componentProps;
  const safiraVariant = variant === 'outline' ? 'secondary' : variant;

  return <SafiraButton {...props} ref={ref} variant={safiraVariant} className={twMerge('inline-flex items-center gap-2', className)}>
    {children}
  </SafiraButton>;
});
