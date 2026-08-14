import type { InfoForPortifolioType } from '@/types';
import { supabaseCrud } from './supabase-crud';

type PdfSections = Pick<InfoForPortifolioType, 'projects_section' | 'differentials_section' | 'services_section'>;

function toText(value: unknown) {
  return value == null ? '' : String(value);
}

export async function getPortfolioPdfData(): Promise<PdfSections> {
  const [projects, techs, works, differentials] = await Promise.all([
    supabaseCrud.list('project'),
    supabaseCrud.list('tech'),
    supabaseCrud.list('work'),
    supabaseCrud.list('differential'),
  ]);

  const technologies = techs
    .map((item) => toText(item.name))
    .filter((value) => value.length > 0)
    .join(', ');

  return {
    projects_section: {
      title: 'Projetos',
      description: 'Projetos carregados diretamente do Supabase.',
      principal_tecnologies: technologies,
      projects: projects.map((project) => ({
        title: toText(project.title),
        description: toText(project.description),
        link: toText(project.demo ?? ''),
        repository: toText(project.repository),
      })),
    },
    differentials_section: {
      title: 'Diferenciais',
      description: 'Diferenciais carregados diretamente do Supabase.',
      principal_tecnologies: technologies,
      differentials: differentials.map((item) => ({
        title: toText(item.title),
        description: toText(item.description),
      })),
    },
    services_section: {
      title: 'Serviços',
      description: 'Serviços carregados diretamente do Supabase.',
      services: works.map((item) => ({
        title: toText(item.title),
        description: toText(item.description),
        starting_price: '',
      })),
    },
  };
}
