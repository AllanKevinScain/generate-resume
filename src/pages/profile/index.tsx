import { useEffect } from 'react';
import { toast } from 'sonner';
import { EducationModal } from './education-modal';
import { EducationSection } from './education-section';
import { useEducationManager } from './hooks/use-education-manager';
import { useProfileData } from './hooks/use-profile-data';
import { useProfileEditor } from './hooks/use-profile-editor';
import { ProfileAvatar } from './profile-avatar';
import { ProfileForm } from './profile-form';

export function ProfilePage() {
  const { userId, profileQuery, educationsQuery } = useProfileData();
  const profileEditor = useProfileEditor({
    userId,
    profile: profileQuery.data,
    refetch: profileQuery.refetch,
  });
  const educationManager = useEducationManager({
    userId,
    refetch: educationsQuery.refetch,
  });
  const loadError = profileQuery.error ?? educationsQuery.error;

  useEffect(() => {
    if (loadError instanceof Error) toast.error(loadError.message);
  }, [loadError]);

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6">
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="mt-2 text-sm opacity-70">
            Gerencie os dados pessoais e acadêmicos usados no currículo.
          </p>
        </header>

        {profileQuery.isLoading ? (
          <p className="opacity-70">Carregando perfil...</p>
        ) : (
          <>
            <ProfileAvatar
              previewUrl={profileEditor.avatarUrl}
              onFileChange={profileEditor.selectAvatar}
            />
            <ProfileForm
              values={profileEditor.values}
              isSaving={profileEditor.isSaving}
              onChange={profileEditor.change}
              onSubmit={(event) => void profileEditor.save(event)}
            />
          </>
        )}

        <EducationSection
          educations={educationsQuery.data ?? []}
          isLoading={educationsQuery.isLoading}
          onAdd={educationManager.openCreate}
          onEdit={educationManager.openEdit}
          onRemove={(education) => void educationManager.remove(education)}
        />
      </div>

      <EducationModal
        isOpen={educationManager.isModalOpen}
        isSaving={educationManager.isSaving}
        selectedEducation={educationManager.selectedEducation}
        values={educationManager.values}
        onClose={educationManager.close}
        onChange={educationManager.change}
        onSubmit={(event) => void educationManager.save(event)}
      />
    </main>
  );
}
