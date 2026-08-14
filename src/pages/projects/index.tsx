import { useQuery } from '@tanstack/react-query';
import { listPublicGitHubRepositories } from '@/services/github-repositories';
import { GitHubRepositoryCard } from './github-repository-card';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export function ProjectsPage() {
  const username = import.meta.env.VITE_GITHUB_USERNAME?.trim() ?? '';

  const query = useQuery({
    queryKey: ['github-repositories', username],
    queryFn: () => listPublicGitHubRepositories(username),
    enabled: Boolean(username),
  });

  const repositories = query.data ?? [];

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6">
          <h1 className="text-3xl font-bold text-(--color-text)">Projetos</h1>
          <p className="mt-2 text-sm opacity-70">
            Esta página lista diretamente os repositórios públicos do GitHub. A gestão de
            projetos continua no próprio GitHub.
          </p>
        </header>

        {!username && (
          <p role="alert" className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm">
            Defina `VITE_GITHUB_USERNAME` no ambiente para carregar seus repositórios.
          </p>
        )}

        {query.isLoading && <p className="opacity-70">Carregando repositórios...</p>}
        {query.error instanceof Error && <p role="alert" className="text-sm text-red-500">{query.error.message}</p>}

        <section className="grid gap-4 md:grid-cols-2">
          {repositories.map((repository) => (
            <GitHubRepositoryCard
              key={repository.id}
              repository={repository}
              formatDate={formatDate}
            />
          ))}
        </section>

        {!query.isLoading && repositories.length === 0 && username && (
          <p className="opacity-70">Nenhum repositório encontrado para esse usuário.</p>
        )}
      </div>
    </main>
  );
}
