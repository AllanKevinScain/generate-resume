"use client";

import type { InfoForPortifolioType, KeyInfoForPortifolioType } from "@/types";
import { createContext } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

type FormPortifolioContextType = {
  formsState: Record<KeyInfoForPortifolioType, UseFormReturn<FieldValues> | null>;
  registerForm: (name: string, methods: unknown) => void;
  getAllValues: () => InfoForPortifolioType | undefined;
};

export const FormPortifolioContext = createContext<FormPortifolioContextType>({
  formsState: {} as Record<KeyInfoForPortifolioType, UseFormReturn<FieldValues> | null>,
  registerForm: () => {},
  getAllValues: () => undefined,
});
