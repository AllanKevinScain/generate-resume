import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ToastViewport } from '.';

vi.mock('@/services/notifications', () => {
  const notifications = [{ id: '1', message: 'Perfil salvo', tone: 'success' }];

  return {
    dismissNotification: vi.fn(),
    subscribeToNotifications: () => () => undefined,
    getNotifications: () => notifications,
  };
});
vi.mock('safira-ui/react', () => ({
  ToastRegion: (props: { children: ReactNode }) => <div>{props.children}</div>,
  Toast: (props: { title: string; children: ReactNode }) => <div><strong>{props.title}</strong>{props.children}</div>,
}));

describe('ToastViewport', () => {
  it('renderiza as notificações atuais', () => {
    render(<ToastViewport />);

    expect(screen.getByText('Sucesso')).toBeInTheDocument();
    expect(screen.getByText('Perfil salvo')).toBeInTheDocument();
  });
});
