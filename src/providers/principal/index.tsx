'use client';

import { ThemeMenu } from '@/components';
import { optionsTheme } from '@/data';
import { useAuth } from '@/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '../theme';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers(props: ProvidersProps) {
  const { children } = props;
  const { user } = useAuth();

  if (!optionsTheme) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {children}
        {!user && (
          <ThemeMenu
            items={Object.values(optionsTheme).map(({ icon, ...rest }) => {
              void icon;
              return rest;
            })}
          />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
