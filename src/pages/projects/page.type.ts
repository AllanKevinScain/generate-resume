import type { GitHubRepositoryWithTechnologies } from '@/services/github-repositories';

export type GitHubRepositoryCardProps = {
  repository: GitHubRepositoryWithTechnologies;
  formatDate: (value: string) => string;
};

export type GitHubRepositoryListProps = {
  repositories: GitHubRepositoryWithTechnologies[];
  formatDate: (value: string) => string;
};
