import { Button, Field, Grid, Stack, Textarea } from '@/components';
import { useAuth, useTheme } from '@/hooks';
import {
  footerDefaultValues,
  headerDefaultValues,
  type FooterSchemaType,
  type HeaderSchemaType,
} from '@/schemas';
import { generatePortfolioPDF } from '@/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/services/notifications';

type ResumeFormValues = {
  profile: HeaderSchemaType;
  footer: FooterSchemaType;
};

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-(--color-border) p-5">
      <legend className="px-2 text-xl font-semibold text-(--color-text)">{props.title}</legend>
      <Stack gap={4}>{props.children}</Stack>
    </fieldset>
  );
}

export function ResumeEditorPage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isGenerating, setIsGenerating] = useState(false);
  const { register, handleSubmit } = useForm<ResumeFormValues>({
    defaultValues: {
      profile: headerDefaultValues,
      footer: {
        ...footerDefaultValues,
        contact: { ...footerDefaultValues.contact, email: user?.email ?? '' },
      },
    },
  });
  const onSubmit = handleSubmit(async (data) => {
    setIsGenerating(true);
    try {
      await generatePortfolioPDF({ profile: data.profile, footer: data.footer, theme });
      toast.success('PDF gerado com sucesso.');
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível gerar o PDF.');
    } finally {
      setIsGenerating(false);
    }
  });

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <Stack gap={7} className="mx-auto max-w-4xl">
        <header>
          <h1 className="text-3xl font-bold">Gerador de currículo</h1>
          <p className="text-sm opacity-70">
            Configure apenas o cabeçalho e o contato/rodapé. Os demais dados vêm do Supabase.
          </p>
        </header>

        <form onSubmit={onSubmit}>
          <Stack gap={7}>
            <Section title="Cabeçalho">
              <Grid columns={2} gap={4} minItemWidth="16rem">
                <Field required label="Nome completo" {...register('profile.name')} />
                <Field required label="Profissão" {...register('profile.role')} />
                <Field required label="Título" {...register('profile.title')} />
                <Field required label="Status" {...register('profile.status')} />
              </Grid>
              <Textarea label="Resumo profissional" {...register('profile.headline')} />
            </Section>

            <Section title="Contato e rodapé">
              <Field required label="Título do convite" {...register('footer.cta_title')} />
              <Textarea label="Descrição do convite" {...register('footer.cta_description')} />
              <Field required label="Frase final" {...register('footer.tech_stack_footer')} />
              <Grid columns={2} gap={4} minItemWidth="16rem">
                <Field required label="E-mail" type="email" {...register('footer.contact.email')} />
                <Field required label="Telefone" {...register('footer.contact.phone')} />
                <Field label="LinkedIn" required={false} {...register('footer.contact.social_media.linkedin')} />
                <Field label="GitHub" required={false} {...register('footer.contact.social_media.github')} />
                <Field label="Instagram" required={false} {...register('footer.contact.social_media.instagram')} />
                <Field label="Google" required={false} {...register('footer.contact.social_media.google')} />
              </Grid>
            </Section>

            <Button variant="primary" type="submit" disabled={isGenerating} className="justify-center self-end">
              {isGenerating ? 'Gerando PDF...' : 'Baixar currículo em PDF'}
            </Button>
          </Stack>
        </form>
      </Stack>
    </main>
  );
}
