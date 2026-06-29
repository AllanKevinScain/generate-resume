import { Button, Input, Modal, Textarea, HeaderFormPage } from "@/components";
import { supabaseCrud, type CrudRow } from "@/services/supabase-crud";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type Field = {
  name: string;
  label: string;
  kind?: "text" | "url" | "textarea" | "select";
  optional?: boolean;
  options?: string[];
};

export type ResourceConfig = {
  table: "project" | "tech" | "work" | "differential";
  title: string;
  description: string;
  emptyMessage: string;
  fields: Field[];
};

type ResourceFormValues = Record<string, string>;

function createEmptyValues(config: ResourceConfig) {
  return config.fields.reduce<ResourceFormValues>((acc, field) => {
    acc[field.name] = field.kind === "select" ? field.options?.[0] ?? "" : "";
    return acc;
  }, {});
}

function createFormValues(config: ResourceConfig, item?: CrudRow | null) {
  if (!item) return createEmptyValues(config);

  return config.fields.reduce<ResourceFormValues>((acc, field) => {
    const value = item[field.name];
    acc[field.name] = value == null ? "" : String(value);
    return acc;
  }, {});
}

function ResourceFormFields(props: {
  config: ResourceConfig;
  values: ResourceFormValues;
  onChange: (field: string, value: string) => void;
}) {
  const { config, values, onChange } = props;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {config.fields.map((field) => {
        const common = {
          label: field.label,
          required: !field.optional,
          value: values[field.name] ?? "",
          onChange: (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
          ) => onChange(field.name, event.target.value),
        };

        if (field.kind === "textarea") {
          return (
            <Textarea
              key={field.name}
              {...common}
              className={field.name === "description" ? "md:col-span-2" : undefined}
            />
          );
        }

        if (field.kind === "select") {
          return (
            <label key={field.name} className="flex flex-col gap-1 text-sm font-medium text-(--color-text)">
              <span>
                {field.label}
                {!field.optional && <span className="ml-1 text-red-500">*</span>}
              </span>
              <select
                required={!field.optional}
                value={values[field.name] ?? ""}
                onChange={common.onChange}
                className="rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-3"
              >
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        return (
          <Input
            key={field.name}
            {...common}
            type={field.kind === "url" ? "url" : "text"}
            className={field.name === "title" ? "md:col-span-2" : undefined}
          />
        );
      })}
    </div>
  );
}

export function ResourceManagementPage({ config }: { config: ResourceConfig }) {
  const initialValues = useMemo(() => createEmptyValues(config), [config]);
  const [values, setValues] = useState(initialValues);
  const [selectedItem, setSelectedItem] = useState<CrudRow | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const query = useQuery({
    queryKey: ["supabase-resource", config.table],
    queryFn: () => supabaseCrud.list(config.table),
  });

  const items = query.data ?? [];
  const isLoading = query.isLoading || query.isPending;
  const loadError = query.error instanceof Error ? query.error.message : null;

  function openCreateModal() {
    setSelectedItem(null);
    setValues(initialValues);
    setFormError(null);
    setIsModalOpen(true);
  }

  function openEditModal(item: CrudRow) {
    setSelectedItem(item);
    setValues(createFormValues(config, item));
    setFormError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setFormError(null);
    setSelectedItem(null);
    setValues(initialValues);
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setFormError(null);

    const payload = Object.fromEntries(
      config.fields.map((field) => {
        const rawValue = values[field.name]?.trim() ?? "";
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
      await query.refetch();
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : "Falha ao salvar dados.");
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(item: CrudRow) {
    if (!window.confirm("Deseja realmente excluir este registro?")) return;

    setFormError(null);
    try {
      await supabaseCrud.remove(config.table, item.id);
      await query.refetch();
    } catch (caught) {
      setFormError(caught instanceof Error ? caught.message : "Falha ao excluir dados.");
    }
  }

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <HeaderFormPage titulo={config.title} descricao={config.description} onAdicionar={openCreateModal} />

        <section className="flex flex-col gap-3">
          {isLoading && <p className="opacity-70">Carregando...</p>}
          {!isLoading && items.length === 0 && <p className="opacity-70">{config.emptyMessage}</p>}
          {loadError && <p role="alert" className="text-sm text-red-500">{loadError}</p>}

          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6"
            >
              <h3 className="text-lg font-semibold text-(--color-text)">
                {String(item.title ?? item.name ?? "Registro")}
              </h3>
              {item.description && (
                <p className="mt-2 whitespace-pre-wrap text-sm opacity-75">
                  {String(item.description)}
                </p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <Button.outline type="button" onClick={() => openEditModal(item)}>
                  Editar
                </Button.outline>
                <Button.ghost type="button" onClick={() => void remove(item)} className="text-red-500">
                  Excluir
                </Button.ghost>
              </div>
            </article>
          ))}
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form
          onSubmit={save}
          className="flex flex-col gap-5 rounded-3xl p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-(--color-text)">
                {selectedItem ? "Editar item" : "Adicionar item"}
              </h2>
              <p className="mt-1 text-sm opacity-70">{config.title}</p>
            </div>
            <Button.ghost type="button" onClick={closeModal} disabled={isSaving}>
              Fechar
            </Button.ghost>
          </div>

          <ResourceFormFields
            config={config}
            values={values}
            onChange={(field, value) => setValues((current) => ({ ...current, [field]: value }))}
          />

          {formError && <p role="alert" className="text-sm text-red-500">{formError}</p>}

          <div className="flex justify-end gap-3">
            <Button.outline type="button" onClick={closeModal} disabled={isSaving}>
              Cancelar
            </Button.outline>
            <Button.solid type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button.solid>
          </div>
        </form>
      </Modal>
    </main>
  );
}
