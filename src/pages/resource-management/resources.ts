import type { ResourceConfig } from './resource-management.types';

export const projectsResourceConfig: ResourceConfig = {
  table: 'project',
  title: 'Projetos',
  description: 'Gerencie os projetos cadastrados no Supabase.',
  emptyMessage: 'Nenhum projeto cadastrado.',
  fields: [
    { name: 'title', label: 'Título' },
    { name: 'description', label: 'Descrição', kind: 'textarea' },
    { name: 'repository', label: 'Repositório', kind: 'url' },
    { name: 'demo', label: 'Demonstração', kind: 'url', optional: true },
  ],
};

export const techsResourceConfig: ResourceConfig = {
  table: 'tech',
  title: 'Tecnologias',
  description: 'Gerencie as tecnologias e seus níveis.',
  emptyMessage: 'Nenhuma tecnologia cadastrada.',
  fields: [
    { name: 'name', label: 'Nome' },
    { name: 'description', label: 'Descrição', kind: 'textarea' },
    {
      name: 'nivel',
      label: 'Nível',
      kind: 'select',
      options: ['junior', 'mid', 'senior', 'stack'],
    },
  ],
};

export const worksResourceConfig: ResourceConfig = {
  table: 'work',
  title: 'Experiências',
  description: 'Gerencie trabalhos e experiências do portfólio.',
  emptyMessage: 'Nenhuma experiência cadastrada.',
  fields: [
    { name: 'title', label: 'Título' },
    { name: 'description', label: 'Descrição', kind: 'textarea' },
    { name: 'image', label: 'Imagem', kind: 'url', optional: true },
  ],
};

export const differentialsResourceConfig: ResourceConfig = {
  table: 'differential',
  title: 'Diferenciais',
  description: 'Gerencie os diferenciais destacados na apresentação.',
  emptyMessage: 'Nenhum diferencial cadastrado.',
  fields: [
    { name: 'title', label: 'Título' },
    { name: 'description', label: 'Descrição', kind: 'textarea' },
  ],
};
