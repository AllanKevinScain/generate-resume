import { Button, Modal } from '@/components';
import type { FormEvent } from 'react';
import { ResourceFormFields } from './resource-form-fields';
import type {
  ResourceConfig,
  ResourceFormValues,
  ResourceItem,
} from './resource-management.types';

type ResourceManagementModalProps = {
  config: ResourceConfig;
  isOpen: boolean;
  isSaving: boolean;
  selectedItem: ResourceItem | null;
  values: ResourceFormValues;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onChange: (field: string, value: string) => void;
};

export function ResourceManagementModal(props: ResourceManagementModalProps) {
  const {
    config,
    isOpen,
    isSaving,
    selectedItem,
    values,
    onClose,
    onSubmit,
    onChange,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 rounded-3xl p-6 pr-14">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-(--color-text)">
              {selectedItem ? 'Editar item' : 'Adicionar item'}
            </h2>
            <p className="mt-1 text-sm opacity-70">{config.title}</p>
          </div>
        </div>

        <ResourceFormFields config={config} values={values} onChange={onChange} />

        <div className="flex justify-end gap-3">
          <Button.outline type="button" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button.outline>
          <Button.solid type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button.solid>
        </div>
      </form>
    </Modal>
  );
}
