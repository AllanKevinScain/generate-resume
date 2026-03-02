"use client";

import { type TextareaHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { Tooltip } from "../tootlip";
import { TbEyeQuestion } from "react-icons/tb";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  classNameTextarea?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      id,
      required = true,
      className,
      classNameTextarea,
      ...props
    },
    ref,
  ) => {
    const inputId = id || crypto.randomUUID();

    const hasError = !!error;

    return (
      <div className={twMerge("flex flex-col gap-1 w-full", className)}>
        {label && (
          <div className="flex w-full justify-between">
            <label
              htmlFor={inputId}
              className={twMerge(
                "text-sm font-medium",
                "text-(--color-text)",
                hasError &&
                  "text-[color-mix(in_srgb,red)_70%,var(--color-text)]",
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

        <textarea
          id={inputId}
          ref={ref}
          {...props}
          required={required}
          className={twMerge(
            "px-4 py-3 outline-none transition-all duration-200",
            "bg-[color-mix(in_srgb,var(--color-primary)_8%,transparent)]",
            "border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)] rounded-xl ",
            "placeholder:text-(--color-text) placeholder:opacity-50",
            "font-normal text-(--color-text)",
            "disabled:opacity-50",
            hasError && "border-[color-mix(in_srgb,red_60%,transparent)]",
            classNameTextarea,
          )}
          onFocus={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--color-primary) 60%, transparent)";
            }
          }}
          onBlur={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor =
                "color-mix(in srgb, var(--color-primary) 30%, transparent)";
            }
          }}
          rows={5}
        />

        {hasError && (
          <span className="text-xs mt-1 text-[color-mix(in_srgb,red_70%,var(--color-text))]">
            {error}
          </span>
        )}

        {!hasError && helperText && (
          <span className="text-xs mt-1 text-(--color-border) md:hidden">
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
