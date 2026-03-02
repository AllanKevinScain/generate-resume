"use client";

import { Input, Textarea } from "@/components";
import { Title } from "./title";
import { useForm, type SubmitHandler } from "react-hook-form";
import { headerSchema, type HeaderSchemaType } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterForm } from "@/hooks";
import { ActionButtons, type ActionButtonsProps } from "./action-buttons";

interface HeaderSectionProps {
  fullName?: string;
  actionButtons: ActionButtonsProps;
}

export function HeaderSection(props: HeaderSectionProps) {
  const { fullName, actionButtons } = props;

  const methods = useForm<HeaderSchemaType>({
    resolver: yupResolver(headerSchema),
    defaultValues: {
      name: fullName,
      role: "Desenvolvedor Front-end II",
      status: "Disponível para novos projetos",
      headline:
        "Crio interfaces modernas, performáticas e escaláveis com foco em experiência do usuário e arquitetura sólida.",
      title: "Seja bem vindo!",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit: SubmitHandler<HeaderSchemaType> = (data) => console.log(data);

  useRegisterForm("profile", methods);

  return (
    <>
      <Title title="Configuração do Cabeçalho" description="Defina:" />
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            label="Nome completo"
            disabled={!fullName}
            {...register("name")}
            placeholder="Digite seu nome aqui"
          />
          <Input
            label="Profissão"
            {...register("role")}
            placeholder="Digite seu profissão aqui"
          />
        </div>

        <Input
          label="Título"
          {...register("title")}
          placeholder="Digite o título aqui"
        />
        <Input
          label="Status"
          {...register("status")}
          placeholder="Digite seu status aqui"
        />
        <Textarea
          label="Descrição"
          {...register("headline")}
          placeholder="Digite a descricao aqui"
        />
      </form>
      <ActionButtons {...actionButtons} disabled={!isDirty} />
    </>
  );
}
