"use client";

import { Button, Input, Textarea } from "@/components";
import { RiApps2AddLine } from "react-icons/ri";
import { FaTrashArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  projectsDefaultValues,
  projectsSchema,
  type ProjectsSchemaType,
} from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterForm } from "@/hooks";
import { twMerge } from "tailwind-merge";
import { ActionButtonsProps, ContainerForm } from "./container-form";

interface ProjectsSectionProps {
  actionButtons: ActionButtonsProps;
}

export function ProjectsSection(props: ProjectsSectionProps) {
  const methods = useForm({
    resolver: yupResolver(projectsSchema),
    defaultValues: projectsDefaultValues,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const onSubmit: SubmitHandler<ProjectsSchemaType> = (data) => {
    console.log(data);

    if (Object.keys(errors).length > 0) return;
    props.actionButtons.nextStep?.();
  };

  useRegisterForm("projects_section", methods);

  return (
    <ContainerForm
      title="Seus Projetos"
      description="Adicione projetos que representem sua experiência."
      onSubmit={handleSubmit(onSubmit)}
      formClassName="gap-12 md:gap-4"
      actionButtons={props.actionButtons}
      isDirty={!isDirty}
    >
      <>
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
                  {...register(`projects.${index}.title`)}
                />
                <Input
                  placeholder="Link de apresentação"
                  required={false}
                  {...register(`projects.${index}.link`)}
                />
                <Input
                  placeholder="Link do conteudo"
                  {...register(`projects.${index}.repository`)}
                />

                <Textarea
                  placeholder="Descrição"
                  {...register(`projects.${index}.description`)}
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
        {fields.length >= 10 && (
          <span className="text-xs mt-1 opacity-70 text-(--color-text)">
            Voce pode adicionar somente 10 projetos
          </span>
        )}
        {fields.length <= 10 && (
          <div className="flex w-full justify-end">
            <Button.solid
              onClick={() => append({ title: "", description: "" })}
              className="w-full flex justify-center md:w-fit"
            >
              <span className="md:hidden">Adicionar</span>
              <RiApps2AddLine size={22} />
            </Button.solid>
          </div>
        )}
      </>
    </ContainerForm>
  );
}
