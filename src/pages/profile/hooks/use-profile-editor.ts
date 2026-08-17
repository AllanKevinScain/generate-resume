import { useAuth } from '@/hooks';
import { profileService } from '@/services/profile';
import { useEffect, useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { EMPTY_PROFILE, MAX_PROFILE_PHOTO_SIZE } from '../constants/profile';
import type { Profile, ProfileFormValues } from '../profile.types';

type UseProfileEditorProps = {
  userId: string;
  profile: Profile | null | undefined;
  refetch: () => Promise<unknown>;
};

function toFormValues(profile: Profile): ProfileFormValues {
  const { id, avatarPath, ...values } = profile;
  void id;
  void avatarPath;
  return values;
}

export function useProfileEditor(props: UseProfileEditorProps) {
  const { user } = useAuth();
  const { userId, profile, refetch } = props;
  const [values, setValues] = useState<ProfileFormValues>({
    ...EMPTY_PROFILE,
    contactEmail: user?.email ?? '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profile) setValues(toFormValues(profile));
  }, [profile]);

  useEffect(() => {
    if (!avatarFile) return;

    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile]);

  useEffect(() => {
    if (avatarFile) return;
    if (!profile?.avatarPath) {
      setAvatarUrl(null);
      return;
    }

    let active = true;
    void profileService
      .getAvatarUrl(profile.avatarPath)
      .then((url) => {
        if (active) setAvatarUrl(url);
      })
      .catch((caught: unknown) => {
        toast.error(caught instanceof Error ? caught.message : 'Não foi possível carregar a foto.');
      });

    return () => {
      active = false;
    };
  }, [avatarFile, profile?.avatarPath]);

  function change(field: keyof ProfileFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function selectAvatar(file: File | null) {
    if (file && file.size > MAX_PROFILE_PHOTO_SIZE) {
      toast.error('A foto deve ter no máximo 5 MB.');
      return;
    }

    setAvatarFile(file);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId) return;

    setIsSaving(true);

    try {
      const avatarPath = avatarFile
        ? await profileService.uploadAvatar(userId, avatarFile)
        : profile?.avatarPath ?? null;
      const savedProfile = await profileService.save(userId, values, avatarPath);
      setValues(toFormValues(savedProfile));
      setAvatarFile(null);
      toast.success('Perfil salvo com sucesso.');
      await refetch();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível salvar o perfil.');
    } finally {
      setIsSaving(false);
    }
  }

  return { values, avatarUrl, isSaving, change, selectAvatar, save };
}
