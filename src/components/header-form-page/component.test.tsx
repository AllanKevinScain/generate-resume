import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { HeaderFormPage } from '.';

describe('HeaderFormPage', () => {
  it('exibe os textos e chama a ação de adicionar', async () => {
    const onAdicionar = vi.fn();
    render(<HeaderFormPage titulo="Tecnologias" descricao="Gerencie seus dados" onAdicionar={onAdicionar} />);

    expect(screen.getByRole('heading', { name: 'Tecnologias' })).toBeInTheDocument();
    expect(screen.getByText('Gerencie seus dados')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /adicionar/i }));
    expect(onAdicionar).toHaveBeenCalledOnce();
  });
});
