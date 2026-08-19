import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResumeEditorPage } from '.';

vi.mock('@/hooks', () => ({
  useAuth: () => ({ user: { email: 'teste@example.com' } }),
  useTheme: () => ({ theme: 'light' }),
}));

describe('ResumeEditorPage', () => {
  it('apresenta o formulário de geração do currículo', () => {
    render(<ResumeEditorPage />);

    expect(screen.getByRole('heading', { name: /gerador de currículo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /baixar currículo/i })).toBeInTheDocument();
  });
});
