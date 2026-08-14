import { supabase } from '@/lib/supabase';

export type CrudRow = Record<string, unknown> & { id: string };

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export const supabaseCrud = {
  async list(table: string): Promise<CrudRow[]> {
    const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
    fail(error);
    return (data ?? []) as CrudRow[];
  },

  async create(table: string, values: Record<string, unknown>) {
    const { data, error } = await supabase
      .from(table)
      .insert({ id: crypto.randomUUID(), ...values })
      .select()
      .single();
    fail(error);
    return data as CrudRow;
  },

  async update(table: string, id: string, values: Record<string, unknown>) {
    const { data, error } = await supabase.from(table).update(values).eq('id', id).select().single();
    fail(error);
    return data as CrudRow;
  },

  async remove(table: string, id: string) {
    const { error } = await supabase.from(table).delete().eq('id', id);
    fail(error);
  },
};
