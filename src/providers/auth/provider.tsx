import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './context';
import type { AuthProviderProps } from './provider.type';

export function AuthProvider(props: AuthProviderProps) {
  const { children } = props;
  const [user, setUser] = useState<User | null>(null);
  const [githubToken, setGithubToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ?? null);
        setGithubToken(data.session?.provider_token ?? null);
        setIsLoading(false);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setGithubToken(session?.provider_token ?? null);
      setIsLoading(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      return 'Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.';
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return error?.message ?? null;
  }, []);

  const loginWithGitHub = useCallback(async () => {
    if (!isSupabaseConfigured) {
      return 'Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.';
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    });

    return error?.message ?? null;
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({ user, githubToken, isLoading, login, loginWithGitHub, logout }),
    [user, githubToken, isLoading, login, loginWithGitHub, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
