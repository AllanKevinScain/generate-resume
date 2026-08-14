import { Button } from '@/components';
import type { CrudRow } from '@/services/supabase-crud';

type ResourceItemCardProps = {
  item: CrudRow;
  onEdit: (item: CrudRow) => void;
  onRemove: (item: CrudRow) => void;
};

export function ResourceItemCard({ item, onEdit, onRemove }: ResourceItemCardProps) {
  return (
    <article className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6">
      <h3 className="text-lg font-semibold text-(--color-text)">
        {String(item.title ?? item.name ?? 'Registro')}
      </h3>
      {item.description && (
        <p className="mt-2 whitespace-pre-wrap text-sm opacity-75">
          {String(item.description)}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button.outline type="button" onClick={() => onEdit(item)}>
          Editar
        </Button.outline>
        <Button.ghost type="button" onClick={() => onRemove(item)} className="text-red-500">
          Excluir
        </Button.ghost>
      </div>
    </article>
  );
}
