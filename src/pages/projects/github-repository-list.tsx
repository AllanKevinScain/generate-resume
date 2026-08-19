import { Button } from '@/components';
import { useState, type ChangeEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { GitHubRepositoryCard } from './github-repository-card';
import type { GitHubRepositoryListProps } from './page.type';
import { ITEMS_PER_PAGE } from './constants/projects';
import { Cluster, Field, Grid, Stack } from 'safira-ui/react';

export function GitHubRepositoryList(props: GitHubRepositoryListProps) {
  const { repositories, formatDate } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('pt-BR');
  const filteredRepositories = repositories.filter((repository) => {
    const searchableContent = [
      repository.name,
      repository.description ?? '',
      ...repository.technologies,
    ]
      .join(' ')
      .toLocaleLowerCase('pt-BR');

    return searchableContent.includes(normalizedSearchTerm);
  });
  const totalPages = Math.max(1, Math.ceil(filteredRepositories.length / ITEMS_PER_PAGE));
  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleRepositories = filteredRepositories.slice(pageStart, pageStart + ITEMS_PER_PAGE);

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  return (
    <Stack gap={6}>
      <div className="relative max-w-xl">
        <FiSearch
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 opacity-60"
          size={18}
        />
        <Field
          label={<span className="sf-visually-hidden">Pesquisar repositórios</span>}
          required={false}
          placeholder="Pesquisar por nome, descrição ou tecnologia"
          value={searchTerm}
          className="pl-11"
          onChange={handleSearch}
        />
      </div>

      <section aria-live="polite" aria-label="Repositórios encontrados">
        <Grid columns={2} gap={4} minItemWidth="18rem">
          {visibleRepositories.map((repository) => (
            <GitHubRepositoryCard
              key={repository.id}
              repository={repository}
              formatDate={formatDate}
            />
          ))}
        </Grid>
      </section>

      {filteredRepositories.length === 0 && (
        <p className="opacity-70">Nenhum repositório corresponde à pesquisa.</p>
      )}

      {filteredRepositories.length > ITEMS_PER_PAGE && (
        <nav aria-label="Paginação dos repositórios">
          <Cluster gap={4} className="justify-center">
            <Button
              variant="outline"
              size="small"
              type="button"
              aria-label="Página anterior"
              disabled={currentPage === 1}
              leadingIcon={<FiChevronLeft aria-hidden="true" size={20} />}
              onClick={() => setCurrentPage((page) => page - 1)}
            />
            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="small"
              type="button"
              aria-label="Próxima página"
              disabled={currentPage === totalPages}
              leadingIcon={<FiChevronRight aria-hidden="true" size={20} />}
              onClick={() => setCurrentPage((page) => page + 1)}
            />
          </Cluster>
        </nav>
      )}
    </Stack>
  );
}
