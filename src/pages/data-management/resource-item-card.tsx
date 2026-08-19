import { Button } from '@/components';
import { Card, Cluster } from 'safira-ui/react';
import type { ResourceItemCardProps } from './page.type';

export function ResourceItemCard(props: ResourceItemCardProps) {
  const { item, onEdit, onRemove } = props;
  return (
    <Card
      elevation="raised"
      className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6"
    >
      <h3 className="text-lg font-semibold text-(--color-text)">
        {String(item.title ?? item.name ?? 'Registro')}
      </h3>
      {item.description && (
        <p className="mt-2 whitespace-pre-wrap text-sm opacity-75">{String(item.description)}</p>
      )}
      <Cluster gap={3} className="mt-5">
        <Button variant="outline" type="button" onClick={() => onEdit(item)}>
          Editar
        </Button>
        <Button variant="ghost" type="button" onClick={() => onRemove(item)} className="text-red-500">
          Excluir
        </Button>
      </Cluster>
    </Card>
  );
}
