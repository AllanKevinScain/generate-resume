import { useAuth } from '@/hooks';
import { listPublicGitHubRepositories } from '@/services/github-repositories';
import { useQuery } from '@tanstack/react-query';

export function useGitHubRepositories() {
  const { user, githubToken } = useAuth();
  const query = useQuery({
    queryKey: ['github-repositories', user?.id],
    queryFn: () => {
      if (!githubToken) {
        throw new Error('Entre com o GitHub para carregar seus repositórios.');
      }

      return listPublicGitHubRepositories(githubToken);
    },
    enabled: Boolean(githubToken),
    staleTime: 60 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    query,
    isGitHubConnected: Boolean(githubToken),
  };
}
