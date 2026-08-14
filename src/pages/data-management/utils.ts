import type { CrudRow } from '@/services/supabase-crud';
import type { Resource, ResourceFormValues } from './data-management.type';

export function createEmptyValues(resource: Resource) {
  return resource.fields.reduce<ResourceFormValues>((acc, field) => {
    acc[field.name] = field.kind === 'select' ? (field.options?.[0] ?? '') : '';
    return acc;
  }, {});
}

export function createFormValues(resource: Resource, item?: CrudRow | null) {
  if (!item) return createEmptyValues(resource);

  return resource.fields.reduce<ResourceFormValues>((acc, field) => {
    const value = item[field.name];
    acc[field.name] = value == null ? '' : String(value);
    return acc;
  }, {});
}
