import { supabase } from '@/lib/supabase';
import type { Profile, ProfileFormValues } from '@/types';

type ProfileRow = {
  id: string;
  full_name: string;
  contact_email: string;
  phone: string | null;
  birth_date: string | null;
  address_line: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  avatar_path: string | null;
  biography: string | null;
};

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function nullable(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    fullName: row.full_name,
    contactEmail: row.contact_email,
    phone: row.phone ?? '',
    birthDate: row.birth_date ?? '',
    addressLine: row.address_line ?? '',
    city: row.city ?? '',
    state: row.state ?? '',
    postalCode: row.postal_code ?? '',
    country: row.country ?? '',
    linkedinUrl: row.linkedin_url ?? '',
    githubUrl: row.github_url ?? '',
    avatarPath: row.avatar_path,
    biography: row.biography ?? '',
  };
}

export const profileService = {
  async get(userId: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).maybeSingle();

    fail(error);
    return data ? mapProfile(data as ProfileRow) : null;
  },

  async save(userId: string, values: ProfileFormValues, avatarPath: string | null) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        full_name: values.fullName.trim(),
        contact_email: values.contactEmail.trim(),
        phone: nullable(values.phone),
        birth_date: nullable(values.birthDate),
        address_line: nullable(values.addressLine),
        city: nullable(values.city),
        state: nullable(values.state),
        postal_code: nullable(values.postalCode),
        country: nullable(values.country),
        linkedin_url: nullable(values.linkedinUrl),
        github_url: nullable(values.githubUrl),
        avatar_path: avatarPath,
        biography: nullable(values.biography),
      })
      .select()
      .single();

    fail(error);
    return mapProfile(data as ProfileRow);
  },

  async uploadAvatar(userId: string, file: File) {
    const path = `${userId}/profile-photo`;
    const { error } = await supabase.storage.from('profile-photos').upload(path, file, {
      upsert: true,
      contentType: file.type,
      cacheControl: '3600',
    });

    fail(error);
    return path;
  },

  async getAvatarUrl(path: string) {
    const { data, error } = await supabase.storage.from('profile-photos').createSignedUrl(path, 60 * 60);

    fail(error);
    return data?.signedUrl;
  },
};
