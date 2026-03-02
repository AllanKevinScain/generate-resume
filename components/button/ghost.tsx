"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

export function GhostButton(props: HTMLMotionProps<"button">) {
  const { children, className, ...rest } = props;
  return (
    <motion.button
      {...rest}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className={twMerge(
        "inline-flex items-center gap-2",
        "text-(--color-text)",
        "px-4 py-2 rounded-xl transition disabled:opacity-40",
        "border border-[color-mix(in_srgb,var(--color-text)_20%,transparent)]",
        "cursor-pointer",
        rest.disabled && "disabled:border-neutral-500",
        rest.disabled && "disabled:text-neutral-500",
        rest.disabled && "disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
