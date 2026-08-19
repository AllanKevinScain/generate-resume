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
