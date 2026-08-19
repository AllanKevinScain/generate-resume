import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ProfilePage } from '.';

vi.mock('./hooks/use-profile-data', () => ({
  useProfileData: () => ({
    userId: 'user-1',
    profileQuery: { data: null, error: null, isLoading: true, refetch: vi.fn() },
    educationsQuery: { data: [], error: null, isLoading: false, refetch: vi.fn() },
  }),
}));
vi.mock('./hooks/use-profile-editor', () => ({
  useProfileEditor: () => ({ values: {}, avatarUrl: null, isSaving: false, change: vi.fn(), selectAvatar: vi.fn(), save: vi.fn() }),
}));
vi.mock('./hooks/use-education-manager', () => ({
  useEducationManager: () => ({ values: {}, selectedEducation: null, isModalOpen: false, isSaving: false, openCreate: vi.fn(), openEdit: vi.fn(), close: vi.fn(), change: vi.fn(), save: vi.fn(), remove: vi.fn() }),
}));
vi.mock('./education-section', () => ({ EducationSection: () => <div>Formações</div> }));
vi.mock('./education-modal', () => ({ EducationModal: () => null }));

describe('ProfilePage', () => {
  it('apresenta o estado de carregamento do perfil', () => {
    render(<ProfilePage />);

    expect(screen.getByRole('heading', { name: 'Perfil' })).toBeInTheDocument();
    expect(screen.getByText('Carregando perfil...')).toBeInTheDocument();
  });
});
