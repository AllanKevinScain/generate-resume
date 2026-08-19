import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '.';

describe('Button', () => {
  it('renderiza o conteúdo e responde ao clique', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Salvar</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
