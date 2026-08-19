import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from '.';

describe('Textarea', () => {
  it('associa o rótulo ao campo e apresenta o erro', () => {
    render(<Textarea label="Biografia" error="Campo obrigatório" />);

    expect(screen.getByRole('textbox', { name: /biografia/i })).toBeInTheDocument();
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });
});
