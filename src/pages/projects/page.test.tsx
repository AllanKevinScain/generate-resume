import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProjectsPage } from '.';

vi.mock('./hooks/use-github-repositories', () => ({
  useGitHubRepositories: () => ({
    isGitHubConnected: true,
    query: { data: [], error: null, isLoading: false },
  }),
}));

describe('ProjectsPage', () => {
  it('informa quando a conta não possui repositórios', () => {
    render(<ProjectsPage />);

    expect(screen.getByRole('heading', { name: 'Projetos' })).toBeInTheDocument();
    expect(screen.getByText(/nenhum repositório encontrado/i)).toBeInTheDocument();
  });
});
