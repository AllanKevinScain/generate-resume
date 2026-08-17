import { HeaderFormPage } from '@/components';
import { supabaseCrud, type CrudRow } from '@/services/supabase-crud';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { ResourceManagementModal } from './resource-management-modal';
import { ResourceItemCard } from './resource-item-card';
import { createEmptyValues, createFormValues } from './resource-management-values';
import type { ResourceConfig } from './resource-management.types';

export function ResourceManagementPage({ config }: { config: ResourceConfig }) {
  const initialValues = useMemo(() => createEmptyValues(config), [config]);
  const [values, setValues] = useState(initialValues);
  const [selectedItem, setSelectedItem] = useState<CrudRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = useQuery({
    queryKey: ['supabase-resource', config.table],
    queryFn: () => supabaseCrud.list(config.table),
  });

  const items = query.data ?? [];
  const isLoading = query.isLoading || query.isPending;
  const loadError = query.error instanceof Error ? query.error.message : null;

  useEffect(() => {
    if (loadError) toast.error(loadError);
  }, [loadError]);

  function openCreateModal() {
    setSelectedItem(null);
    setValues(initialValues);
    setIsModalOpen(true);
  }

  function openEditModal(item: CrudRow) {
    setSelectedItem(item);
    setValues(createFormValues(config, item));
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedItem(null);
    setValues(initialValues);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const payload = Object.fromEntries(
      config.fields.map((field) => {
        const rawValue = values[field.name]?.trim() ?? '';
        const shouldBeNull = field.optional && rawValue.length === 0;
        return [field.name, shouldBeNull ? null : rawValue];
      }),
    );

    try {
      if (selectedItem) {
        await supabaseCrud.update(config.table, selectedItem.id, payload);
      } else {
        await supabaseCrud.create(config.table, payload);
      }

      closeModal();
      toast.success(selectedItem ? 'Registro atualizado com sucesso.' : 'Registro criado com sucesso.');
      await query.refetch();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível salvar o registro.');
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(item: CrudRow) {
    if (!window.confirm('Deseja realmente excluir este registro?')) return;

    try {
      await supabaseCrud.remove(config.table, item.id);
      toast.success('Registro excluído com sucesso.');
      await query.refetch();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível excluir o registro.');
    }
  }

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <HeaderFormPage titulo={config.title} descricao={config.description} onAdicionar={openCreateModal} />

        <section className="flex flex-col gap-3">
          {isLoading && <p className="opacity-70">Carregando...</p>}
          {!isLoading && items.length === 0 && <p className="opacity-70">{config.emptyMessage}</p>}

          {items.map((item) => (
            <ResourceItemCard
              key={item.id}
              item={item}
              onEdit={openEditModal}
              onRemove={(currentItem) => void remove(currentItem)}
            />
          ))}
        </section>
      </div>

      <ResourceManagementModal
        config={config}
        isOpen={isModalOpen}
        isSaving={isSaving}
        selectedItem={selectedItem}
        values={values}
        onClose={closeModal}
        onSubmit={save}
        onChange={(field, value) => setValues((current) => ({ ...current, [field]: value }))}
      />
    </main>
  );
}
