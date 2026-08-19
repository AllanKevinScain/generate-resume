import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ResourceManagementPage } from '.';
import type { ResourceConfig } from './page.type';

vi.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: [], error: null, isLoading: false, isPending: false, refetch: vi.fn() }),
}));
vi.mock('./resource-management-modal', () => ({ ResourceManagementModal: () => null }));

describe('ResourceManagementPage', () => {
  it('apresenta a mensagem de lista vazia', () => {
    const config: ResourceConfig = {
      table: 'tech', title: 'Tecnologias', description: 'Gerencie tecnologias', emptyMessage: 'Nenhuma tecnologia.', fields: [],
    };
    render(<ResourceManagementPage config={config} />);

    expect(screen.getByRole('heading', { name: 'Tecnologias' })).toBeInTheDocument();
    expect(screen.getByText('Nenhuma tecnologia.')).toBeInTheDocument();
  });
});
