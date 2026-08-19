import { Button } from '@/components';
import { useState } from 'react';
import { DATA_MANAGEMENT_RESOURCES } from './constants/resources';
import { CrudManager } from './crud-manager';
import type { Resource } from './page.type';
import { Cluster, Stack } from 'safira-ui/react';

export function DataManagementPage() {
  const [activeTable, setActiveTable] = useState<Resource['table']>('project');
  const activeResource =
    DATA_MANAGEMENT_RESOURCES.find((resource) => resource.table === activeTable) ??
    DATA_MANAGEMENT_RESOURCES[0];

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <Stack gap={7} className="mx-auto max-w-6xl">
        <header>
          <Stack gap={4}>
            <div>
              <h1 className="text-3xl font-bold">Gerenciar conteúdo</h1>
              <p className="mt-1 text-sm opacity-70">
                As abas carregam a listagem do Supabase automaticamente.
              </p>
            </div>

            <nav aria-label="Tipos de conteúdo">
              <Cluster gap={2}>
                {DATA_MANAGEMENT_RESOURCES.map((resource) => (
                  <Button
                    variant="outline"
                    type="button"
                    key={resource.table}
                    aria-pressed={activeTable === resource.table}
                    onClick={() => setActiveTable(resource.table)}
                    className={activeTable === resource.table ? 'border-(--color-primary)' : undefined}
                  >
                    {resource.label}
                  </Button>
                ))}
              </Cluster>
            </nav>
          </Stack>
        </header>

        <CrudManager key={activeResource.table} resource={activeResource} />
      </Stack>
    </main>
  );
}
