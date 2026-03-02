"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeMenu } from "@/components";
import { optionsTheme } from "@/data";
import { ThemeProvider } from "../theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: ProvidersProps) {
  const { children } = props;

  if (!optionsTheme) return;

  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <ThemeMenu
          items={Object.values(optionsTheme).map(
            ({ icon: _, ...rest }) => rest,
          )}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
