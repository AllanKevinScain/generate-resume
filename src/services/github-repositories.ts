export type GitHubRepository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  language: string | null;
  languages_url: string;
};

export type GitHubRepositoryWithTechnologies = GitHubRepository & {
  technologies: string[];
};

export type ProjectImportInput = {
  title: string;
  description: string;
  repository: string;
  demo: string | null;
};

async function fetchRepositoryPage(username: string, page: number) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub retornou ${response.status} ao buscar repositórios.`);
  }

  return (await response.json()) as GitHubRepository[];
}

async function fetchRepositoryTechnologies(languagesUrl: string) {
  const response = await fetch(languagesUrl, {
    headers: {
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub retornou ${response.status} ao buscar linguagens.`);
  }

  const languages = (await response.json()) as Record<string, number>;

  return Object.entries(languages)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 4)
    .map(([language]) => language);
}

export async function listPublicGitHubRepositories(username: string) {
  const repositories: GitHubRepository[] = [];
  let page = 1;

  while (true) {
    const batch = await fetchRepositoryPage(username, page);
    repositories.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  const repositoriesWithTechnologies = await Promise.all(
    repositories.map(async (repository) => ({
      ...repository,
      technologies: await fetchRepositoryTechnologies(repository.languages_url),
    })),
  );

  return repositoriesWithTechnologies as GitHubRepositoryWithTechnologies[];
}

export function mapGitHubRepositoryToProject(
  repository: GitHubRepository,
): ProjectImportInput {
  return {
    title: repository.name,
    description:
      repository.description?.trim() || 'Repositório importado diretamente do GitHub.',
    repository: repository.html_url,
    demo: repository.homepage?.trim() ? repository.homepage : null,
  };
}
