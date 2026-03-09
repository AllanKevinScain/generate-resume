"use client";

import { Input, Textarea } from "@/components";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  headerDefaultValues,
  headerSchema,
  type HeaderSchemaType,
} from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterForm } from "@/hooks";
import { ActionButtonsProps, ContainerForm } from "./container-form";

interface HeaderSectionProps {
  fullName?: string;
  actionButtons: ActionButtonsProps;
}

export function HeaderSection(props: HeaderSectionProps) {
  const methods = useForm<HeaderSchemaType>({
    resolver: yupResolver(headerSchema),
    defaultValues: headerDefaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = methods;

  const onSubmit: SubmitHandler<HeaderSchemaType> = (data) => {
    console.log(data);
    if (Object.keys(errors).length > 0) return;
    props.actionButtons.nextStep?.();
  };

  useRegisterForm("profile", methods);

  return (
    <ContainerForm
      title="Configuração do Cabeçalho"
      description="Defina:"
      onSubmit={handleSubmit(onSubmit)}
      actionButtons={props.actionButtons}
      isDirty={!isDirty}
    >
      <>
        <div className="flex flex-col gap-2 md:flex-row">
          <Input
            label="Nome completo"
            placeholder="Digite seu nome aqui"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Profissão"
            placeholder="Digite seu profissão aqui"
            error={errors.role?.message}
            {...register("role")}
          />
        </div>

        <Input
          label="Título"
          placeholder="Digite o título aqui"
          error={errors.title?.message}
          {...register("title")}
        />
        <Input
          label="Status"
          placeholder="Digite seu status aqui"
          error={errors.status?.message}
          {...register("status")}
        />
        <Textarea
          label="Descrição"
          placeholder="Digite a descricao aqui"
          error={errors.headline?.message}
          {...register("headline")}
        />
      </>
    </ContainerForm>
  );
}
