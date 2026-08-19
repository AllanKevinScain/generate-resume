import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DifferentialsPage } from '.';

vi.mock('@/pages/resource-management', () => ({ ResourceManagementPage: (props: { config: { title: string } }) => <h1>{props.config.title}</h1> }));

describe('DifferentialsPage', () => {
  it('usa a configuração de diferenciais', () => {
    render(<DifferentialsPage />);
    expect(screen.getByRole('heading', { name: 'Diferenciais' })).toBeInTheDocument();
  });
});
