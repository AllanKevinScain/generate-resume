import { Button, Input, Textarea } from '@/components';
import type { Resource, ResourceFormValues } from './data-management.type';
import { type ChangeEvent, type FormEvent } from 'react';
interface ResourceModalProps {
  resource: Resource;
  isOpen: boolean;
  title: string;
  values: ResourceFormValues;
  error: string | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
}

export function ResourceModal(props: ResourceModalProps) {
  const { resource, isOpen, title, values, error, isSaving, onClose, onSubmit, onChange } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <form
        onSubmit={onSubmit}
        className="w-full max-w-2xl rounded-3xl border border-(--color-border) bg-(--color-bg) p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-(--color-text)">{title}</h2>
            <p className="mt-1 text-sm opacity-70">{resource.label}</p>
          </div>
          <Button.ghost type="button" onClick={onClose}>
            Fechar
          </Button.ghost>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {resource.fields.map((field) => {
            const common = {
              label: field.label,
              required: !field.optional,
              value: values[field.name] ?? '',
              onChange: (
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
              ) => onChange(field.name, event.target.value),
            };

            if (field.kind === 'textarea') {
              return (
                <Textarea
                  key={field.name}
                  {...common}
                  className={field.name === 'description' ? 'md:col-span-2' : undefined}
                />
              );
            }

            if (field.kind === 'select') {
              return (
                <label key={field.name} className="flex flex-col gap-1 text-sm font-medium text-(--color-text)">
                  <span>
                    {field.label}
                    {!field.optional && <span className="ml-1 text-red-500">*</span>}
                  </span>
                  <select
                    required={!field.optional}
                    value={values[field.name] ?? ''}
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
                type={field.kind === 'url' ? 'url' : 'text'}
                className={field.name === 'title' ? 'md:col-span-2' : undefined}
              />
            );
          })}
        </div>

        {error && <p role="alert" className="mt-4 text-sm text-red-500">{error}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <Button.outline
            type="button"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancelar
          </Button.outline>
          <Button.solid type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button.solid>
        </div>
      </form>
    </dialog>
  );
}
