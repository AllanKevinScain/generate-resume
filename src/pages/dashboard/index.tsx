import { Link } from 'react-router-dom';
import { Card, Grid, Stack } from 'safira-ui/react';
import { DASHBOARD_CARDS } from './constants/dashboard';

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <Stack gap={7} className="mx-auto max-w-6xl">
        <Card className="rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6">
          <h1 className="text-3xl font-bold text-(--color-text)">Dashboard</h1>
          <p className="mt-2 text-sm opacity-70">Selecione uma seção para gerenciar seus dados.</p>
        </Card>

        <section aria-label="Seções do currículo">
          <Grid columns={2} gap={6} minItemWidth="18rem">
            {DASHBOARD_CARDS.map((card) => (
              <Card key={card.rota} elevation="raised" className="group overflow-hidden p-0">
                <Link
                  to={card.rota}
                  className="block h-full rounded-3xl bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-6 transition hover:border-(--color-primary)"
                >
                  <h2 className="text-2xl font-semibold text-(--color-text) transition group-hover:text-(--color-primary)">
                    {card.titulo}
                  </h2>
                  <p className="mt-2 text-sm opacity-70">{card.descricao}</p>
                </Link>
              </Card>
            ))}
          </Grid>
        </section>
      </Stack>
    </main>
  );
}
