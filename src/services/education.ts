import { supabase } from '@/lib/supabase';
import type { Education, EducationFormValues, EducationStatus } from '@/types';

type EducationRow = {
  id: string;
  user_id: string;
  institution: string;
  course: string;
  degree: string | null;
  started_at: string | null;
  ended_at: string | null;
  status: EducationStatus;
  completion_note: string | null;
};

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

function nullable(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : null;
}

function mapEducation(row: EducationRow): Education {
  return {
    id: row.id,
    userId: row.user_id,
    institution: row.institution,
    course: row.course,
    degree: row.degree ?? '',
    startedAt: row.started_at ?? '',
    endedAt: row.ended_at ?? '',
    status: row.status,
    completionNote: row.completion_note ?? '',
  };
}

function createPayload(values: EducationFormValues) {
  return {
    institution: values.institution.trim(),
    course: values.course.trim(),
    degree: nullable(values.degree),
    started_at: nullable(values.startedAt),
    ended_at: nullable(values.endedAt),
    status: values.status,
    completion_note: nullable(values.completionNote),
  };
}

export const educationService = {
  async list(userId: string) {
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false, nullsFirst: false });

    fail(error);
    return (data as EducationRow[]).map(mapEducation);
  },

  async create(userId: string, values: EducationFormValues) {
    const { data, error } = await supabase
      .from('educations')
      .insert({ user_id: userId, ...createPayload(values) })
      .select()
      .single();

    fail(error);
    return mapEducation(data as EducationRow);
  },

  async update(userId: string, id: string, values: EducationFormValues) {
    const { data, error } = await supabase
      .from('educations')
      .update(createPayload(values))
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single();

    fail(error);
    return mapEducation(data as EducationRow);
  },

  async remove(userId: string, id: string) {
    const { error } = await supabase.from('educations').delete().eq('id', id).eq('user_id', userId);

    fail(error);
  },
};
