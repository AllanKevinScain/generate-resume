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

export type ResourceManagementPageProps = {
  config: ResourceConfig;
};

export type ResourceItemCardProps = {
  item: CrudRow;
  onEdit: (item: CrudRow) => void;
  onRemove: (item: CrudRow) => void;
};

export type ResourceManagementModalProps = {
  config: ResourceConfig;
  isOpen: boolean;
  isSaving: boolean;
  selectedItem: ResourceItem | null;
  values: ResourceFormValues;
  onClose: () => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
};

export type ResourceFormFieldsProps = {
  config: ResourceConfig;
  values: ResourceFormValues;
  onChange: (field: string, value: string) => void;
};
