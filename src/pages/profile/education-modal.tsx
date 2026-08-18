import { Button, Field, Textarea } from '@/components';
import { Grid, Modal } from 'safira-ui/react';
import { EDUCATION_STATUS_LABELS } from './constants/profile';
import type { Education, EducationFormValues, EducationStatus } from './profile.types';

type EducationModalProps = {
  isOpen: boolean;
  isSaving: boolean;
  selectedEducation: Education | null;
  values: EducationFormValues;
  onClose: () => void;
  onChange: (field: keyof EducationFormValues, value: string) => void;
  onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
};

export function EducationModal(props: EducationModalProps) {
  const { isOpen, isSaving, selectedEducation, values, onClose, onChange, onSubmit } = props;
  const title = selectedEducation ? 'Editar formação' : 'Adicionar formação';

  return (
    <Modal
      id="education-modal"
      open={isOpen}
      title={title}
      description="Informe os dados da formação acadêmica."
      closeLabel={`Fechar ${title.toLowerCase()}`}
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
          <Field
            required
            label="Instituição"
            value={values.institution}
            onChange={(event) => onChange('institution', event.target.value)}
          />
          <Field
            required
            label="Curso"
            value={values.course}
            onChange={(event) => onChange('course', event.target.value)}
          />
          <Field
            label="Tipo de formação"
            required={false}
            placeholder="Graduação, técnico, pós-graduação..."
            value={values.degree}
            onChange={(event) => onChange('degree', event.target.value)}
          />
          <label className="flex flex-col gap-1 text-sm font-medium">
            <span>
              Situação <span className="ml-1 text-red-500">*</span>
            </span>
            <select
              required
              value={values.status}
              onChange={(event) => onChange('status', event.target.value as EducationStatus)}
              className="rounded-xl border border-(--color-border) bg-(--color-bg) px-4 py-3 outline-none transition focus:border-(--color-primary)"
            >
              {Object.entries(EDUCATION_STATUS_LABELS).map(([status, label]) => (
                <option key={status} value={status}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Data de início"
            type="date"
            required={false}
            value={values.startedAt}
            onChange={(event) => onChange('startedAt', event.target.value)}
          />
          <Field
            label="Data de término"
            type="date"
            required={false}
            min={values.startedAt || undefined}
            value={values.endedAt}
            onChange={(event) => onChange('endedAt', event.target.value)}
          />
        </Grid>

        <Textarea
          label="Resultado / observação"
          required={false}
          value={values.completionNote}
          onChange={(event) => onChange('completionNote', event.target.value)}
        />

        <div className="flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar formação'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
