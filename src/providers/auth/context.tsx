import type { User } from '@supabase/supabase-js';
import { createContext } from 'react';

type AuthContextType = {
  user: User | null;
  githubToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  loginWithGitHub: () => Promise<string | null>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
