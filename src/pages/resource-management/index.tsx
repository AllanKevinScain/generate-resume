import { HeaderFormPage } from '@/components';
import { supabaseCrud, type CrudRow } from '@/services/supabase-crud';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { toast } from '@/services/notifications';
import { ResourceItemCard } from './resource-item-card';
import { ResourceManagementModal } from './resource-management-modal';
import type { ResourceManagementPageProps } from './page.type';
import { createEmptyValues, createFormValues } from './resource-management-values';
import { Grid, Stack } from 'safira-ui/react';

export function ResourceManagementPage(props: ResourceManagementPageProps) {
  const { config } = props;
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

  async function save(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    const payload = Object.fromEntries(
      config.fields.map((field) => {
        const rawValue = values[field.name]?.trim() ?? '';
        return [field.name, field.optional && !rawValue ? null : rawValue];
      }),
    );

    try {
      if (selectedItem) await supabaseCrud.update(config.table, selectedItem.id, payload);
      else await supabaseCrud.create(config.table, payload);
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
      <Stack gap={7} className="mx-auto max-w-6xl">
        <HeaderFormPage titulo={config.title} descricao={config.description} onAdicionar={openCreateModal} />
        <section aria-live="polite">
          {isLoading && <p className="opacity-70">Carregando...</p>}
          {!isLoading && items.length === 0 && <p className="opacity-70">{config.emptyMessage}</p>}
          <Grid columns={2} gap={4} minItemWidth="18rem">
            {items.map((item) => (
              <ResourceItemCard
                key={item.id}
                item={item}
                onEdit={openEditModal}
                onRemove={(currentItem) => void remove(currentItem)}
              />
            ))}
          </Grid>
        </section>
      </Stack>
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
