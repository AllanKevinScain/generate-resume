import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { DashboardPage } from '.';

describe('DashboardPage', () => {
  it('apresenta os atalhos de gerenciamento', () => {
    render(<MemoryRouter><DashboardPage /></MemoryRouter>);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /perfil/i })).toHaveAttribute('href', '/profile');
  });
});
