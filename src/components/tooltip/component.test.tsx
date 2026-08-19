import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Tooltip } from '.';

describe('Tooltip', () => {
  it('exibe o conteúdo quando o elemento recebe foco', async () => {
    render(
      <Tooltip content="Ajuda do campo">
        <button type="button">Ajuda</button>
      </Tooltip>,
    );

    await userEvent.tab();

    expect(screen.getByRole('tooltip')).toHaveTextContent('Ajuda do campo');
  });
});
