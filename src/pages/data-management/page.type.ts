export type Field = {
  name: string;
  label: string;
  kind?: 'text' | 'url' | 'textarea' | 'select';
  optional?: boolean;
  options?: string[];
};

export type Resource = {
  table: 'project' | 'tech' | 'work' | 'differential';
  label: string;
  description: string;
  fields: Field[];
};

export type ResourceFormValues = Record<string, string>;

export type CrudManagerProps = {
  resource: Resource;
};

export type ResourceItemCardProps = {
  item: import('@/services/supabase-crud').CrudRow;
  onEdit: (item: import('@/services/supabase-crud').CrudRow) => void;
  onRemove: (item: import('@/services/supabase-crud').CrudRow) => void;
};

export interface ResourceModalProps {
  resource: Resource;
  isOpen: boolean;
  title: string;
  values: ResourceFormValues;
  error: string | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
}
