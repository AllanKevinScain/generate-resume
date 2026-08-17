import { Button } from '@/components';
import { EDUCATION_STATUS_LABELS } from './constants/profile';
import type { Education } from './profile.types';

type EducationSectionProps = {
  educations: Education[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (education: Education) => void;
  onRemove: (education: Education) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function formatPeriod(education: Education) {
  if (!education.startedAt && !education.endedAt) return 'Período não informado';

  const start = education.startedAt ? formatDate(education.startedAt) : 'Início não informado';
  const end = education.endedAt ? formatDate(education.endedAt) : 'Atual';
  return `${start} — ${end}`;
}

export function EducationSection(props: EducationSectionProps) {
  const { educations, isLoading, onAdd, onEdit, onRemove } = props;

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Formação acadêmica</h2>
          <p className="mt-1 text-sm opacity-70">Cadastre cursos e suas situações atuais.</p>
        </div>
        <Button variant="primary" type="button" onClick={onAdd}>+ Adicionar formação</Button>
      </header>

      {isLoading && <p className="opacity-70">Carregando formações...</p>}
      {!isLoading && educations.length === 0 && (
        <p className="rounded-3xl border border-(--color-border) p-6 opacity-70">
          Nenhuma formação cadastrada.
        </p>
      )}

      {educations.map((education) => (
        <article
          key={education.id}
          className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold">{education.course}</h3>
              <p className="text-sm opacity-75">{education.institution}</p>
            </div>
            <span className="w-fit rounded-full border border-(--color-border) px-3 py-1 text-xs">
              {EDUCATION_STATUS_LABELS[education.status]}
            </span>
          </div>
          {education.degree && <p className="mt-3 text-sm">{education.degree}</p>}
          <p className="mt-2 text-sm opacity-65">{formatPeriod(education)}</p>
          {education.completionNote && (
            <p className="mt-3 whitespace-pre-wrap text-sm opacity-75">{education.completionNote}</p>
          )}
          <div className="mt-5 flex gap-3">
            <Button variant="outline" type="button" onClick={() => onEdit(education)}>Editar</Button>
            <Button variant="ghost" type="button" className="text-red-500" onClick={() => onRemove(education)}>
              Excluir
            </Button>
          </div>
        </article>
      ))}
    </section>
  );
}
