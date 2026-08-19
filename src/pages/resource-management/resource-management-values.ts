import type { CrudRow } from '@/services/supabase-crud';
import type { ResourceConfig, ResourceFormValues } from './page.type';

export function createEmptyValues(config: ResourceConfig) {
  return config.fields.reduce<ResourceFormValues>((acc, field) => {
    acc[field.name] = field.kind === 'select' ? (field.options?.[0] ?? '') : '';
    return acc;
  }, {});
}

export function createFormValues(config: ResourceConfig, item?: CrudRow | null) {
  if (!item) return createEmptyValues(config);

  return config.fields.reduce<ResourceFormValues>((acc, field) => {
    const value = item[field.name];
    acc[field.name] = value == null ? '' : String(value);
    return acc;
  }, {});
}
