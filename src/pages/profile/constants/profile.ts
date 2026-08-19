import type { EducationFormValues, EducationStatus, ProfileFormValues } from '@/types';

export const EMPTY_PROFILE: ProfileFormValues = {
  fullName: '',
  contactEmail: '',
  phone: '',
  birthDate: '',
  addressLine: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  linkedinUrl: '',
  githubUrl: '',
  biography: '',
};

export const EMPTY_EDUCATION: EducationFormValues = {
  institution: '',
  course: '',
  degree: '',
  startedAt: '',
  endedAt: '',
  status: 'in_progress',
  completionNote: '',
};

export const EDUCATION_STATUS_LABELS: Record<EducationStatus, string> = {
  in_progress: 'Cursando',
  completed: 'Concluído',
  paused: 'Trancado',
  cancelled: 'Interrompido',
};

export const MAX_PROFILE_PHOTO_SIZE = 5 * 1024 * 1024;
