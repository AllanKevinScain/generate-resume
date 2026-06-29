import { Button  } from "@/components";
import { useState } from "react";
import type { Resource,  } from "./data-management.type";
import { CrudManager } from "./crud-manager";

const resources: Resource[] = [
  {
    table: "project",
    label: "Projetos",
    description: "Cadastre os projetos exibidos na listagem.",
    fields: [
      { name: "title", label: "Título" },
      { name: "description", label: "Descrição", kind: "textarea" },
      { name: "repository", label: "Repositório", kind: "url" },
      { name: "demo", label: "Demonstração", kind: "url", optional: true },
    ],
  },
  {
    table: "tech",
    label: "Tecnologias",
    description: "Mantenha as tecnologias e níveis organizados.",
    fields: [
      { name: "name", label: "Nome" },
      { name: "description", label: "Descrição", kind: "textarea" },
      {
        name: "nivel",
        label: "Nível",
        kind: "select",
        options: ["junior", "mid", "senior", "stack"],
      },
    ],
  },
  {
    table: "work",
    label: "Trabalhos e eventos",
    description: "Registre trabalhos, eventos e experiências visíveis no site.",
    fields: [
      { name: "title", label: "Título" },
      { name: "description", label: "Descrição", kind: "textarea" },
      { name: "image", label: "Imagem", kind: "url", optional: true },
    ],
  },
  {
    table: "differential",
    label: "Diferenciais",
    description: "Atualize os diferenciais destacados para o público.",
    fields: [
      { name: "title", label: "Título" },
      { name: "description", label: "Descrição", kind: "textarea" },
    ],
  },
];

export function DataManagementPage() {
  const [activeTable, setActiveTable] = useState<Resource["table"]>("project");
  const activeResource = resources.find((resource) => resource.table === activeTable) ?? resources[0];

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gerenciar conteúdo</h1>
            <p className="mt-1 text-sm opacity-70">As tabs carregam a listagem do Supabase automaticamente.</p>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label="Tipos de conteúdo">
            {resources.map((resource) => (
              <Button.outline
                type="button"
                key={resource.table}
                onClick={() => setActiveTable(resource.table)}
                className={activeTable === resource.table ? "border-(--color-primary)" : undefined}
              >
                {resource.label}
              </Button.outline>
            ))}
          </nav>
        </header>

        <CrudManager key={activeResource.table} resource={activeResource} />
      </div>
    </main>
  );
}
