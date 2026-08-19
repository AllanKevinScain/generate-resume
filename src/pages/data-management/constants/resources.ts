import type { Resource } from '../page.type';

export const DATA_MANAGEMENT_RESOURCES: Resource[] = [
  {
    table: 'project',
    label: 'Projetos',
    description: 'Cadastre os projetos exibidos na listagem.',
    fields: [
      { name: 'title', label: 'Título' },
      { name: 'description', label: 'Descrição', kind: 'textarea' },
      { name: 'repository', label: 'Repositório', kind: 'url' },
      { name: 'demo', label: 'Demonstração', kind: 'url', optional: true },
    ],
  },
  {
    table: 'tech',
    label: 'Tecnologias',
    description: 'Mantenha as tecnologias e níveis organizados.',
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
  },
  {
    table: 'work',
    label: 'Trabalhos e eventos',
    description: 'Registre trabalhos, eventos e experiências visíveis no site.',
    fields: [
      { name: 'title', label: 'Título' },
      { name: 'description', label: 'Descrição', kind: 'textarea' },
      { name: 'image', label: 'Imagem', kind: 'url', optional: true },
    ],
  },
  {
    table: 'differential',
    label: 'Diferenciais',
    description: 'Atualize os diferenciais destacados para o público.',
    fields: [
      { name: 'title', label: 'Título' },
      { name: 'description', label: 'Descrição', kind: 'textarea' },
    ],
  },
];
