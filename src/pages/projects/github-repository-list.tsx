import { Input } from '@/components';
import type { GitHubRepositoryWithTechnologies } from '@/services/github-repositories';
import { useState, type ChangeEvent } from 'react';
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi';
import { GitHubRepositoryCard } from './github-repository-card';

const ITEMS_PER_PAGE = 5;

type GitHubRepositoryListProps = {
  repositories: GitHubRepositoryWithTechnologies[];
  formatDate: (value: string) => string;
};

export function GitHubRepositoryList({
  repositories,
  formatDate,
}: GitHubRepositoryListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase('pt-BR');
  const filteredRepositories = repositories.filter((repository) => {
    const searchableContent = [
      repository.name,
      repository.description ?? '',
      ...repository.technologies,
    ].join(' ').toLocaleLowerCase('pt-BR');

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
    <div className="flex flex-col gap-6">
      <div className="relative max-w-xl">
        <FiSearch
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 opacity-60"
          size={18}
        />
        <Input
          required={false}
          aria-label="Pesquisar repositórios"
          placeholder="Pesquisar por nome, descrição ou tecnologia"
          value={searchTerm}
          classNameInput="pl-11"
          onChange={handleSearch}
        />
      </div>

      <section className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {visibleRepositories.map((repository) => (
          <GitHubRepositoryCard
            key={repository.id}
            repository={repository}
            formatDate={formatDate}
          />
        ))}
      </section>

      {filteredRepositories.length === 0 && (
        <p className="opacity-70">Nenhum repositório corresponde à pesquisa.</p>
      )}

      {filteredRepositories.length > ITEMS_PER_PAGE && (
        <nav className="flex items-center justify-center gap-4" aria-label="Paginação dos repositórios">
          <button
            type="button"
            aria-label="Página anterior"
            disabled={currentPage === 1}
            className="rounded-xl border border-(--color-border) p-2 transition hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setCurrentPage((page) => page - 1)}
          >
            <FiChevronLeft aria-hidden="true" size={20} />
          </button>
          <span className="text-sm">Página {currentPage} de {totalPages}</span>
          <button
            type="button"
            aria-label="Próxima página"
            disabled={currentPage === totalPages}
            className="rounded-xl border border-(--color-border) p-2 transition hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => setCurrentPage((page) => page + 1)}
          >
            <FiChevronRight aria-hidden="true" size={20} />
          </button>
        </nav>
      )}
    </div>
  );
}
