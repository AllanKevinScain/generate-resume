import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { TechsPage } from '.';

vi.mock('@/pages/resource-management', () => ({ ResourceManagementPage: (props: { config: { title: string } }) => <h1>{props.config.title}</h1> }));

describe('TechsPage', () => {
  it('usa a configuração de tecnologias', () => {
    render(<TechsPage />);
    expect(screen.getByRole('heading', { name: 'Tecnologias' })).toBeInTheDocument();
  });
});
