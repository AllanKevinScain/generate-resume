import { Button } from '@/components';
import { supabaseCrud, type CrudRow } from '@/services/supabase-crud';
import { useMemo, useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ResourceModal } from './resource-modal';
import { ResourceItemCard } from './resource-item-card';
import type { Resource } from './data-management.type';
import { createEmptyValues, createFormValues } from './utils';

export function CrudManager({ resource }: { resource: Resource }) {
  const initialValues = useMemo(() => createEmptyValues(resource), [resource]);
  const [values, setValues] = useState(initialValues);
  const [selectedItem, setSelectedItem] = useState<CrudRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ['supabase-resource', resource.table],
    queryFn: () => supabaseCrud.list(resource.table),
  });
  const items = query.data ?? [];
  const isLoading = query.isLoading || query.isPending;
  const loadError = query.error instanceof Error ? query.error.message : null;

  function openCreateModal() {
    setSelectedItem(null);
    setValues(initialValues);
    setError(null);
    setIsModalOpen(true);
  }

  function openEditModal(item: CrudRow) {
    setSelectedItem(item);
    setValues(createFormValues(resource, item));
    setError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setError(null);
    setSelectedItem(null);
    setValues(initialValues);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    const payload = Object.fromEntries(
      resource.fields.map((field) => {
        const rawValue = values[field.name]?.trim() ?? '';
        const shouldBeNull = field.optional && rawValue.length === 0;
        return [field.name, shouldBeNull ? null : rawValue];
      }),
    );

    try {
      if (selectedItem) {
        await supabaseCrud.update(resource.table, selectedItem.id, payload);
      } else {
        await supabaseCrud.create(resource.table, payload);
      }

      closeModal();
      await query.refetch();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Falha ao salvar dados.');
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(item: CrudRow) {
    if (!window.confirm('Deseja realmente excluir este registro?')) return;

    setError(null);
    try {
      await supabaseCrud.remove(resource.table, item.id);
      await query.refetch();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Falha ao excluir dados.');
    }
  }

  return (
    <section className="flex flex-col gap-8">
      <div className="flex h-fit flex-col gap-4 rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6">
        <div>
          <h2 className="text-2xl font-semibold text-(--color-text)">{resource.label}</h2>
          <p className="mt-1 text-sm opacity-70">{resource.description}</p>
        </div>

        <Button variant="primary" type="button" onClick={openCreateModal} className="justify-center">
          Adicionar novo item
        </Button>

        {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="flex flex-col gap-3">
        {isLoading && <p className="opacity-70">Carregando...</p>}
        {!isLoading && items.length === 0 && <p className="opacity-70">Nenhum registro cadastrado.</p>}
        {loadError && <p role="alert" className="text-sm text-red-500">{loadError}</p>}
        {items.map((item) => (
          <ResourceItemCard
            key={item.id}
            item={item}
            onEdit={openEditModal}
            onRemove={(currentItem) => void remove(currentItem)}
          />
        ))}
      </div>

      <ResourceModal
        resource={resource}
        isOpen={isModalOpen}
        title={selectedItem ? 'Editar item' : 'Adicionar item'}
        values={values}
        error={error}
        isSaving={isSaving}
        onClose={closeModal}
        onSubmit={save}
        onChange={(field, value) => setValues((current) => ({ ...current, [field]: value }))}
      />
    </section>
  );
}
