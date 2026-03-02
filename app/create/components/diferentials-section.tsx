"use client";

import { Button, Input, Textarea } from "@/components";
import { RiApps2AddLine } from "react-icons/ri";
import { FaTrashArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Title } from "./title";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { differentialsSchema, type DifferentialsSchemaType } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { twMerge } from "tailwind-merge";
import { useRegisterForm } from "@/hooks";
import { ActionButtons, type ActionButtonsProps } from "./action-buttons";

interface FeaturesSectionProps {
  actionButtons: ActionButtonsProps;
}

export function FeaturesSection(props: FeaturesSectionProps) {
  const methods = useForm({
    resolver: yupResolver(differentialsSchema),
    defaultValues: {
      title: "Diferenciais",
      description:
        "Práticas e mentalidade que guiam minhas decisões técnicas e de produto.",
      principal_tecnologies: "React,TypeScript,Tailwind CSS,Vite",
      differentials: [
        {
          title: "Performance e Acessibilidade",
          description:
            "Páginas leves, rápidas e inclusivas (Lighthouse e boas práticas WCAG).",
        },
      ],
    },
  });
  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "differentials",
  });

  const onSubmit: SubmitHandler<DifferentialsSchemaType> = (data) =>
    console.log(data);

  useRegisterForm("differentials_section", methods);

  return (
    <>
      <Title
        title="Seus Diferenciais"
        description="Destaque seus principais pontos fortes."
      />
      <form
        className="flex flex-col gap-4 md:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Título de slogan"
          placeholder="Título"
          {...register("title")}
        />
        <Textarea
          label="Principais tecnologias"
          placeholder="Tecnologias"
          {...register("principal_tecnologies")}
        />
        <Textarea
          label="Frase de efeito descrevendo você"
          placeholder="Descrição"
          {...register("description")}
        />

        <div className="flex flex-col md:gap-4">
          <span className="text-(--color-text) opacity-70">Diferenciais</span>
          {fields.map((field, index) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                key={field.id}
                className={twMerge(
                  "flex flex-col gap-2 p-4",
                  "border rounded-2xl border-(--color-secondary)",
                  "md:gap-4 md:flex-row",
                )}
              >
                <div className="flex flex-col gap-2 md:gap-4 w-full">
                  <Input
                    placeholder="Título"
                    {...register(`differentials.${index}.title`)}
                  />
                  <Textarea
                    {...register(`differentials.${index}.description`)}
                    placeholder="Descrição"
                  />
                </div>

                <Button.ghost
                  className="w-full flex justify-center md:w-fit"
                  disabled={index === 0 && fields.length === 1}
                  onClick={() => remove(index)}
                >
                  <FaTrashArrowUp size={22} />
                </Button.ghost>
              </motion.div>
            );
          })}
        </div>

        {fields.length >= 5 && (
          <span className="text-xs mt-1 opacity-70 text-(--color-text)">
            Voce só pode adicionar 5 pontos diferenciais
          </span>
        )}
        {fields.length <= 5 && (
          <div className="flex w-full justify-end px-4">
            <Button.solid
              onClick={() => append({ title: "", description: "" })}
              className="w-full flex justify-center md:w-fit"
            >
              <span className="md:hidden">Adicionar</span>
              <RiApps2AddLine size={22} />
            </Button.solid>
          </div>
        )}
      </form>
      <ActionButtons {...props.actionButtons} disabled={!isDirty} />
    </>
  );
}
