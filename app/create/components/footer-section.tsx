"use client";

import { Input, Textarea } from "@/components";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  footerDefaultValues,
  footerSchema,
  type FooterSchemaType,
} from "@/schemas/footer.schema";
import { useRegisterForm } from "@/hooks";
import { ActionButtonsProps, ContainerForm } from "./container-form";

interface FooterSectionProps {
  email?: string;
  phone?: string;
  actionButtons: ActionButtonsProps;
}

export function FooterSection(props: FooterSectionProps) {
  const { email, phone } = props;

  const methods = useForm({
    resolver: yupResolver(footerSchema),
    defaultValues: footerDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = methods;

  const onSubmit: SubmitHandler<FooterSchemaType> = (data) => {
    console.log(data);

    if (Object.keys(errors).length > 0) return;
    props.actionButtons.nextStep?.();
  };

  useRegisterForm("footer", methods);

  return (
    <ContainerForm
      title="Configuração do Rodapé"
      description="Redes sociais, contato e direitos autorais."
      onSubmit={handleSubmit(onSubmit)}
      actionButtons={props.actionButtons}
      isDirty={!isDirty}
    >
      <>
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
      </>
    </ContainerForm>
  );
}
