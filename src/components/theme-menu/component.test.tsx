import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeMenu } from '.';

const setTheme = vi.fn();

vi.mock('@/hooks', () => ({ useTheme: () => ({ theme: 'light', setTheme }) }));
vi.mock('safira-ui/react', () => ({
  Popover: (props: { label: ReactNode; children: ReactNode }) => <div>{props.label}{props.children}</div>,
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />,
}));

describe('ThemeMenu', () => {
  it('altera o tema selecionado', async () => {
    render(<ThemeMenu items={[{ label: 'Escuro', value: 'dark' }]} type="inline" />);

    await userEvent.click(screen.getByRole('button', { name: 'Escuro' }));

    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
