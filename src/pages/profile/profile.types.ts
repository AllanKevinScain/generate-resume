export type EducationStatus = 'in_progress' | 'completed' | 'paused' | 'cancelled';

export type ProfileFormValues = {
  fullName: string;
  contactEmail: string;
  phone: string;
  birthDate: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  linkedinUrl: string;
  githubUrl: string;
  biography: string;
};

export type Profile = ProfileFormValues & {
  id: string;
  avatarPath: string | null;
};

export type EducationFormValues = {
  institution: string;
  course: string;
  degree: string;
  startedAt: string;
  endedAt: string;
  status: EducationStatus;
  completionNote: string;
};

export type Education = EducationFormValues & {
  id: string;
  userId: string;
};
