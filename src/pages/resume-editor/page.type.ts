import type { FooterSchemaType, HeaderSchemaType } from '@/schemas';

export type ResumeFormValues = {
  profile: HeaderSchemaType;
  footer: FooterSchemaType;
};

export type ResumeSectionProps = {
  title: string;
  children: React.ReactNode;
};
