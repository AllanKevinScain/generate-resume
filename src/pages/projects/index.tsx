import { useEffect } from 'react';
import { toast } from 'sonner';
import { GitHubRepositoryList } from './github-repository-list';
import { useGitHubRepositories } from './hooks/use-github-repositories';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export function ProjectsPage() {
  const { query, isGitHubConnected } = useGitHubRepositories();
  const repositories = query.data ?? [];

  useEffect(() => {
    if (query.error instanceof Error) toast.error(query.error.message);
  }, [query.error]);

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

        {!isGitHubConnected && (
          <p role="alert" className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm">
            Saia da conta atual e entre com o GitHub para carregar seus repositórios.
          </p>
        )}

        {query.isLoading && <p className="opacity-70">Carregando repositórios...</p>}

        {repositories.length > 0 && (
          <GitHubRepositoryList repositories={repositories} formatDate={formatDate} />
        )}

        {!query.isLoading && repositories.length === 0 && isGitHubConnected && (
          <p className="opacity-70">Nenhum repositório encontrado para esse usuário.</p>
        )}
      </div>
    </main>
  );
}
