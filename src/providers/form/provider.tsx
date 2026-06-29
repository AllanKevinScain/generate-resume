"use client";

import { useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormPortifolioContext } from "./context";
import type { InfoForPortifolioType } from "@/types";

export function FormPortifolioProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formsState, setFormsState] = useState<
    Record<string, UseFormReturn<FieldValues> | null>
  >({
    profile: null,
    footer: null,
    projects_section: null,
    differentials_section: null,
    services_section: null,
  });

  function registerForm(name: string, methods: unknown) {
    setFormsState((s) => {
      return {
        ...s,
        [name]: methods as UseFormReturn<FieldValues>,
      };
    });
  }

  function getAllValues() {
    const result: Record<string, FieldValues> = {};

    for (const key in formsState) {
      if (!formsState[key]) return;

      result[key] = formsState[key].getValues();
    }

    return result as InfoForPortifolioType;
  }

  return (
    <FormPortifolioContext.Provider
      value={{ formsState, registerForm, getAllValues }}
    >
      {children}
    </FormPortifolioContext.Provider>
  );
}
