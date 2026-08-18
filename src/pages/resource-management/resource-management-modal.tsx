import { Button } from '@/components';
import { Modal } from 'safira-ui/react';
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
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
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

  const title = selectedItem ? 'Editar item' : 'Adicionar item';

  return (
    <Modal
      id="resource-management-modal"
      open={isOpen}
      title={title}
      description={config.title}
      closeLabel={`Fechar ${title.toLowerCase()}`}
      className={{
        dialog: 'w-full max-w-2xl rounded-3xl border border-(--color-border) bg-(--color-bg) shadow-2xl',
        content: 'p-6',
      }}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <ResourceFormFields config={config} values={values} onChange={onChange} />

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
