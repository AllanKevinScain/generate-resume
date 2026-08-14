'use client';

import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '../tootlip';
import { TbEyeQuestion } from 'react-icons/tb';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  classNameInput?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      id,
      required = true,
      className,
      classNameInput,
      ...props
    },
    ref,
  ) => {
    const reactId = useId();
    const inputId = id || reactId;

    const hasError = !!error;

    return (
      <div className={twMerge('flex flex-col gap-1 w-full', className)}>
        {label && (
          <div className="flex w-full justify-between">
            <label
              htmlFor={inputId}
              className={twMerge(
                'text-sm font-medium',
                'text-(--color-text)',
                hasError &&
                  'text-[color-mix(in_srgb,red)_70%,var(--color-text)]',
              )}
            >
              {label}
              {required && <span className="ml-1 text-red-500">*</span>}
            </label>
            {helperText && (
              <Tooltip className="hidden md:inline-flex" content={helperText}>
                <TbEyeQuestion className="text-(--color-text)" size={22} />
              </Tooltip>
            )}
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          {...props}
          className={twMerge(
            'px-4 py-3 outline-none transition-all duration-200',
            'bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]',
            'border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] rounded-xl ',
            'placeholder:text-(--color-text) placeholder:opacity-50',
            'font-normal text-(--color-text)',
            'disabled:opacity-50',
            hasError && 'border-[color-mix(in_srgb,red_60%,transparent)]',
            classNameInput,
          )}
        />

        {hasError && (
          <span className="text-xs mt-1 text-[color-mix(in_srgb,red_70%,var(--color-text))]">
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span className="text-xs mt-1 text-(--color-text) md:hidden">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
