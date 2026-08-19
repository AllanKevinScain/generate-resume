export type EducationStatus = 'in_progress' | 'completed' | 'paused' | 'cancelled';

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
