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

function getGitHubApiUrl() {
  const githubApiUrl = import.meta.env.VITE_GITHUB_API_URL;

  if (!githubApiUrl) {
    throw new Error('Configure VITE_GITHUB_API_URL no ambiente.');
  }

  return githubApiUrl.replace(/\/$/, '');
}

async function fetchRepositoryPage(githubToken: string, page: number) {
  const githubApiUrl = getGitHubApiUrl();
  const response = await fetch(
    `${githubApiUrl}/user/repos?visibility=public&affiliation=owner&per_page=100&page=${page}&sort=updated&direction=desc`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${githubToken}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub retornou ${response.status} ao buscar repositórios.`);
  }

  return (await response.json()) as GitHubRepository[];
}

export async function listPublicGitHubRepositories(githubToken: string) {
  const repositories: GitHubRepository[] = [];
  let page = 1;

  while (true) {
    const batch = await fetchRepositoryPage(githubToken, page);
    repositories.push(...batch);

    if (batch.length < 100) {
      break;
    }

    page += 1;
  }

  const repositoriesWithTechnologies = repositories.map((repository) => ({
    ...repository,
    technologies: repository.language ? [repository.language] : [],
  }));

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
