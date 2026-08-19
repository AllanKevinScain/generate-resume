import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LoginPage } from '.';

vi.mock('@/hooks', () => ({
  useAuth: () => ({ login: vi.fn(), loginWithGitHub: vi.fn() }),
}));

describe('LoginPage', () => {
  it('exibe as opções de autenticação', () => {
    render(<LoginPage />);

    expect(screen.getByRole('heading', { name: /entrar na sua conta/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar com github/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });
});
