import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WorksPage } from '.';

vi.mock('@/pages/resource-management', () => ({ ResourceManagementPage: (props: { config: { title: string } }) => <h1>{props.config.title}</h1> }));

describe('WorksPage', () => {
  it('usa a configuração de experiências', () => {
    render(<WorksPage />);
    expect(screen.getByRole('heading', { name: 'Experiências' })).toBeInTheDocument();
  });
});
