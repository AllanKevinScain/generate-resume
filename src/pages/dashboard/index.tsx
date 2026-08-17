import { DASHBOARD_CARDS } from './constants/dashboard';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6">
          <h1 className="text-3xl font-bold text-(--color-text)">
            Dashboard
          </h1>
          <p className="mt-2 text-sm opacity-70">
            Selecione uma seção para gerenciar seus dados.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DASHBOARD_CARDS.map((card) => (
            <Link
              key={card.rota}
              to={card.rota}
              className="group rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6 transition hover:border-(--color-primary)"
            >
              <h2 className="text-2xl font-semibold text-(--color-text) transition group-hover:text-(--color-primary)">
                {card.titulo}
              </h2>
              <p className="mt-2 text-sm opacity-70">{card.descricao}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
