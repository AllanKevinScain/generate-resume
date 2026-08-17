import { Button, Input, Textarea } from '@/components';
import { useAuth, useTheme } from '@/hooks';
import { footerDefaultValues, headerDefaultValues, type FooterSchemaType, type HeaderSchemaType } from '@/schemas';
import { generatePortfolioPDF } from '@/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type ResumeFormValues = {
  profile: HeaderSchemaType;
  footer: FooterSchemaType;
};

function Section(props: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-2xl border border-(--color-border) p-5">
      <legend className="px-2 text-xl font-semibold text-(--color-text)">{props.title}</legend>
      {props.children}
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
        contact: {
          ...footerDefaultValues.contact,
          email: user?.email ?? '',
        },
      },
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsGenerating(true);
    try {
      await generatePortfolioPDF({
        profile: data.profile,
        footer: data.footer,
        theme,
      });
      toast.success('PDF gerado com sucesso.');
    } catch (caught) {
      toast.error(caught instanceof Error ? caught.message : 'Não foi possível gerar o PDF.');
    } finally {
      setIsGenerating(false);
    }
  });

  return (
    <main className="min-h-screen bg-(--color-bg) px-4 py-10 text-(--color-text)">
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <header>
          <h1 className="text-3xl font-bold">Gerador de currículo</h1>
          <p className="text-sm opacity-70">
            Configure apenas o cabeçalho e o contato/rodapé. Os demais dados vêm do Supabase.
          </p>
        </header>

        <form onSubmit={onSubmit} className="flex flex-col gap-7">
          <Section title="Cabeçalho">
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="Nome completo" {...register('profile.name')} />
              <Input label="Profissão" {...register('profile.role')} />
              <Input label="Título" {...register('profile.title')} />
              <Input label="Status" {...register('profile.status')} />
            </div>
            <Textarea label="Resumo profissional" {...register('profile.headline')} />
          </Section>

          <Section title="Contato e rodapé">
            <Input label="Título do convite" {...register('footer.cta_title')} />
            <Textarea label="Descrição do convite" {...register('footer.cta_description')} />
            <Input label="Frase final" {...register('footer.tech_stack_footer')} />
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="E-mail" type="email" {...register('footer.contact.email')} />
              <Input label="Telefone" {...register('footer.contact.phone')} />
              <Input label="LinkedIn" required={false} {...register('footer.contact.social_media.linkedin')} />
              <Input label="GitHub" required={false} {...register('footer.contact.social_media.github')} />
              <Input label="Instagram" required={false} {...register('footer.contact.social_media.instagram')} />
              <Input label="Google" required={false} {...register('footer.contact.social_media.google')} />
            </div>
          </Section>

          <Button.solid type="submit" disabled={isGenerating} className="justify-center self-end">
            {isGenerating ? 'Gerando PDF...' : 'Baixar currículo em PDF'}
          </Button.solid>
        </form>
      </div>
    </main>
  );
}
