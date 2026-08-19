import { Button, Textarea } from '@/components';
import { Field, Grid, Modal } from 'safira-ui/react';
import { type ChangeEvent } from 'react';
import type { ResourceModalProps } from './page.type';

export function ResourceModal(props: ResourceModalProps) {
  const { resource, isOpen, title, values, error, isSaving, onClose, onSubmit, onChange } = props;

  return (
    <Modal
      id="data-management-modal"
      open={isOpen}
      title={title}
      description={resource.label}
      className={{
        dialog: 'w-full max-w-2xl rounded-3xl border border-(--color-border) bg-(--color-bg) shadow-2xl',
        content: 'max-h-[75vh] overflow-y-auto p-6',
      }}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Grid columns={2} gap={4} minItemWidth="16rem">
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
              <div key={field.name} className={field.name === 'title' ? 'md:col-span-2' : undefined}>
                <Field {...common} type={field.kind === 'url' ? 'url' : 'text'} />
              </div>
            );
          })}
        </Grid>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
