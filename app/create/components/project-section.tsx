"use client";

import { Button, Input, Textarea } from "@/components";
import { RiApps2AddLine } from "react-icons/ri";
import { FaTrashArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Title } from "./title";
import { projectsSchema, type ProjectsSchemaType } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { useRegisterForm } from "@/hooks";
import { twMerge } from "tailwind-merge";
import { ActionButtons, type ActionButtonsProps } from "./action-buttons";

interface ProjectsSectionProps {
  actionButtons: ActionButtonsProps;
}

export function ProjectsSection(props: ProjectsSectionProps) {
  const methods = useForm({
    resolver: yupResolver(projectsSchema),
    defaultValues: {
      title: "Projetos em destaque",
      description:
        "Alguns trabalhos e experimentos que demonstram minha experiência com front-end moderno e arquitetura de aplicações.",
      projects: [
        {
          title: "Dashboard de Vendas",
          description:
            "Dashboard responsivo com gráficos e filtros em tempo real, focado em KPIs de e-commerce.",
          link: "https://dashboard-vendas.vercel.app/",
          repository: "https://github.com/allankevin/dashboard-vendas",
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
    name: "projects",
  });

  const onSubmit: SubmitHandler<ProjectsSchemaType> = (data) =>
    console.log(data);

  useRegisterForm("projects_section", methods);

  return (
    <>
      <Title
        title="Seus Projetos"
        description="Adicione projetos que representem sua experiência."
      />
      <form
        className="flex flex-col gap-12 md:gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </form>
      <ActionButtons {...props.actionButtons} disabled={!isDirty} />
    </>
  );
}
