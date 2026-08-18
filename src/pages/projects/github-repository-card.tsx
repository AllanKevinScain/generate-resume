import { Badge, Card, Cluster, Stack } from '@/components';
import type { GitHubRepositoryWithTechnologies } from '@/services/github-repositories';
import { BiCodeAlt } from 'react-icons/bi';
import {
  SiAngular,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiDotnet,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRuby,
  SiRust,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from 'react-icons/si';

function getTechnologyIcon(technology: string) {
  const key = technology.toLowerCase();

  if (key.includes('typescript')) return <SiTypescript size={14} aria-hidden="true" />;
  if (key.includes('javascript')) return <SiJavascript size={14} aria-hidden="true" />;
  if (key.includes('react')) return <SiReact size={14} aria-hidden="true" />;
  if (key.includes('vue')) return <SiVuedotjs size={14} aria-hidden="true" />;
  if (key.includes('svelte')) return <SiSvelte size={14} aria-hidden="true" />;
  if (key.includes('angular')) return <SiAngular size={14} aria-hidden="true" />;
  if (key.includes('node')) return <SiNodedotjs size={14} aria-hidden="true" />;
  if (key.includes('python')) return <SiPython size={14} aria-hidden="true" />;
  if (key.includes('java')) return <BiCodeAlt size={14} aria-hidden="true" />;
  if (key.includes('c++')) return <SiCplusplus size={14} aria-hidden="true" />;
  if (key.includes('c#') || key.includes('dotnet')) return <SiDotnet size={14} aria-hidden="true" />;
  if (key.includes('rust')) return <SiRust size={14} aria-hidden="true" />;
  if (key.includes('php')) return <SiPhp size={14} aria-hidden="true" />;
  if (key.includes('ruby')) return <SiRuby size={14} aria-hidden="true" />;
  if (key.includes('html')) return <SiHtml5 size={14} aria-hidden="true" />;
  if (key.includes('css')) return <SiCss size={14} aria-hidden="true" />;
  if (key.includes('tailwind')) return <SiTailwindcss size={14} aria-hidden="true" />;
  if (key.includes('docker')) return <SiDocker size={14} aria-hidden="true" />;
  if (key.includes('postgres')) return <SiPostgresql size={14} aria-hidden="true" />;
  if (key.includes('mysql')) return <SiMysql size={14} aria-hidden="true" />;
  if (key.includes('mongo')) return <SiMongodb size={14} aria-hidden="true" />;
  if (key.includes('graphql')) return <SiGraphql size={14} aria-hidden="true" />;
  if (key.includes('markdown')) return <SiMarkdown size={14} aria-hidden="true" />;

  return <BiCodeAlt size={14} aria-hidden="true" />;
}

export function GitHubRepositoryCard({
  repository,
  formatDate,
}: {
  repository: GitHubRepositoryWithTechnologies;
  formatDate: (value: string) => string;
}) {
  return (
    <Card
      elevation="raised"
      className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6"
    >
      <h2 className="text-xl font-semibold text-(--color-text)">{repository.name}</h2>
      <p className="mt-2 min-h-12 text-sm opacity-75">
        {repository.description || 'Sem descrição informada.'}
      </p>
      {repository.technologies.length > 0 && (
        <Cluster gap={2} className="mt-4">
          {repository.technologies.map((technology) => (
            <Badge key={technology} title={technology} className="inline-flex items-center gap-2">
              {getTechnologyIcon(technology)}
              <span className="sr-only">{technology}</span>
            </Badge>
          ))}
        </Cluster>
      )}
      <Stack gap={2} className="mt-4 text-sm">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-(--color-primary) underline-offset-4 hover:underline"
        >
          Abrir repositório
        </a>
        {repository.homepage ? (
          <a
            href={repository.homepage}
            target="_blank"
            rel="noreferrer"
            className="text-(--color-primary) underline-offset-4 hover:underline"
          >
            Abrir site/demo
          </a>
        ) : null}
        <span className="text-xs opacity-60">Atualizado em {formatDate(repository.updated_at)}</span>
      </Stack>
    </Card>
  );
}
