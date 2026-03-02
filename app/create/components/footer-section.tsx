"use client";

import { Input, Textarea } from "@/components";
import { Title } from "./title";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { footerSchema, type FooterSchemaType } from "@/schemas/footer.schema";
import { useRegisterForm } from "@/hooks";
import { ActionButtons, type ActionButtonsProps } from "./action-buttons";

interface FooterSectionProps {
  email?: string;
  phone?: string;
  actionButtons: ActionButtonsProps;
}

export function FooterSection(props: FooterSectionProps) {
  const { email, phone } = props;

  const methods = useForm({
    resolver: yupResolver(footerSchema),
    defaultValues: {
      cta_title: "Vamos conversar?",
      cta_description:
        "Me chame para falarmos sobre seu projeto, produto ou ideia. Posso ajudar a transformar isso em uma experiência sólida.",
      tech_stack_footer: "Construído com React, Vite, TypeScript e Tailwind.",
      contact: {
        email: email,
        phone: phone,
        social_media: {
          linkedin: "http://asasass.linkeding.com.br",
          github: "http://asasaas.github.com.br",
          instagram: "http://asasas.instagram.br",
          google: "http://asasas.google.br",
        },
      },
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit: SubmitHandler<FooterSchemaType> = (data) => console.log(data);

  useRegisterForm("footer", methods);

  return (
    <>
      <Title
        title="Configuração do Rodapé"
        description="Redes sociais, contato e direitos autorais."
      />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Título à convite"
          {...register("cta_title")}
          placeholder="Digite seu título aqui"
          helperText="Este título será apresentado a quem acessar seu portifólio como um convite de trabalho"
        />
        <Textarea
          label="Descrição do convite"
          {...register("cta_description")}
          placeholder="Digite sua descrição"
          helperText="Uma frase que chame a atenção do recrutador"
        />
        <Input
          label="Frase motivacional"
          {...register("tech_stack_footer")}
          placeholder="Digite a frase aqui"
          helperText="Frase que você gosta, relacionado ao trabalho"
        />
        <Input
          label="Email"
          disabled={!!email}
          {...register("contact.email")}
          placeholder="Digite seu e-mail"
        />
        <Input
          label="Telefone"
          disabled={!!phone}
          {...register("contact.phone")}
          placeholder="(99) 9 9999-9999"
        />
        <Input
          label="Linkedin"
          required={false}
          {...register("contact.social_media.linkedin")}
          placeholder="Seu perfil"
        />
        <Input
          label="Instagram"
          required={false}
          {...register("contact.social_media.instagram")}
          placeholder="Seu perfil"
        />
        <Input
          label="Github"
          required={false}
          {...register("contact.social_media.github")}
          placeholder="Seu perfil"
        />
        <Input
          label="Google"
          required={false}
          {...register("contact.social_media.google")}
          placeholder="Sua empresa do google"
        />
      </form>
      <ActionButtons {...props.actionButtons} disabled={!isDirty} />
    </>
  );
}
