import { educationService } from '@/services/education';
import { useState } from 'react';
import { toast } from '@/services/notifications';
import { EMPTY_EDUCATION } from '../constants/profile';
import type { Education, EducationFormValues } from '../profile.types';

type UseEducationManagerProps = {
  userId: string;
  refetch: () => Promise<unknown>;
};

function toFormValues(education: Education): EducationFormValues {
  const { id, userId, ...values } = education;
  void id;
  void userId;
  return values;
}

export function useEducationManager({ userId, refetch }: UseEducationManagerProps) {
  const [values, setValues] = useState<EducationFormValues>(EMPTY_EDUCATION);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function openCreate() {
    setSelectedEducation(null);
    setValues(EMPTY_EDUCATION);
    setIsModalOpen(true);
  }

  function openEdit(education: Education) {
    setSelectedEducation(education);
    setValues(toFormValues(education));
    setIsModalOpen(true);
  }

  function close() {
    setIsModalOpen(false);
    setSelectedEducation(null);
    setValues(EMPTY_EDUCATION);
  }

  function change(field: keyof EducationFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  async function save(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!userId) return;

    setIsSaving(true);

    try {
      if (selectedEducation) {
        await educationService.update(userId, selectedEducation.id, values);
      } else {
        await educationService.create(userId, values);
      }

      close();
      toast.success('Formação salva com sucesso.');
      await refetch();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível salvar a formação.');
    } finally {
      setIsSaving(false);
    }
  }

  async function remove(education: Education) {
    if (!userId || !window.confirm('Deseja realmente excluir esta formação?')) return;

    try {
      await educationService.remove(userId, education.id);
      toast.success('Formação excluída com sucesso.');
      await refetch();
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível excluir a formação.');
    }
  }

  return {
    values,
    selectedEducation,
    isModalOpen,
    isSaving,
    openCreate,
    openEdit,
    close,
    change,
    save,
    remove,
  };
}
