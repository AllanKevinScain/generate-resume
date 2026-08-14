'use client';

import { Button } from '@/components';

type HeaderFormPageProps = {
  titulo: string;
  descricao: string;
  onAdicionar: () => void;
};

export function HeaderFormPage(props: HeaderFormPageProps) {
  const { titulo, descricao, onAdicionar } = props;

  return (
    <header className="flex flex-col gap-4 rounded-3xl border border-(--color-border) bg-[color-mix(in_srgb,var(--color-bg)_90%,transparent)] p-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-(--color-text)">
          {titulo}
        </h1>
        <p className="mt-2 text-sm opacity-70">
          {descricao}
        </p>
      </div>

      <Button.solid type="button" onClick={onAdicionar} className="justify-center md:self-center">
        +
        Adicionar
      </Button.solid>
    </header>
  );
}
