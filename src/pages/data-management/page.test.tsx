import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataManagementPage } from '.';

vi.mock('./crud-manager', () => ({ CrudManager: () => <div>Gerenciador</div> }));

describe('DataManagementPage', () => {
  it('apresenta os tipos de conteúdo', () => {
    render(<DataManagementPage />);

    expect(screen.getByRole('heading', { name: /gerenciar conteúdo/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /tipos de conteúdo/i })).toBeInTheDocument();
  });
});
