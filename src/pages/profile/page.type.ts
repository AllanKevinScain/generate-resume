import type { Education, EducationFormValues, Profile, ProfileFormValues } from '@/types';

export type ProfileAvatarProps = {
  previewUrl: string | null;
  onFileChange: (file: File | null) => void;
};

export type ProfileFormProps = {
  values: ProfileFormValues;
  isSaving: boolean;
  onChange: (field: keyof ProfileFormValues, value: string) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export type EducationModalProps = {
  isOpen: boolean;
  isSaving: boolean;
  selectedEducation: Education | null;
  values: EducationFormValues;
  onClose: () => void;
  onChange: (field: keyof EducationFormValues, value: string) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export type EducationSectionProps = {
  educations: Education[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (education: Education) => void;
  onRemove: (education: Education) => void;
};

export type ProfileField = {
  name: keyof ProfileFormValues;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

export type FieldsProps = Pick<ProfileFormProps, 'values' | 'onChange'> & {
  fields: ProfileField[];
};

export type UseProfileEditorProps = {
  userId: string;
  profile: Profile | null | undefined;
  refetch: () => Promise<unknown>;
};

export type UseEducationManagerProps = {
  userId: string;
  refetch: () => Promise<unknown>;
};
