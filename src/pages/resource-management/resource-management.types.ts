import type { CrudRow } from '@/services/supabase-crud';

export type Field = {
  name: string;
  label: string;
  kind?: 'text' | 'url' | 'textarea' | 'select';
  optional?: boolean;
  options?: string[];
};

export type ResourceConfig = {
  table: 'project' | 'tech' | 'work' | 'differential';
  title: string;
  description: string;
  emptyMessage: string;
  fields: Field[];
};

export type ResourceFormValues = Record<string, string>;

export type ResourceItem = CrudRow;
