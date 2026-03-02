"use client";

import { Button, Input, Textarea } from "@/components";
import { RiApps2AddLine } from "react-icons/ri";
import { FaTrashArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Title } from "./title";
import { servicesSchema, type ServicesSchemaType } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRegisterForm } from "@/hooks";
import { ActionButtons, type ActionButtonsProps } from "./action-buttons";

interface ServicesSectionProps {
  actionButtons: ActionButtonsProps;
}

export function ServicesSection(props: ServicesSectionProps) {
  const methods = useForm({
    resolver: yupResolver(servicesSchema),
    defaultValues: {
      title: "Serviços",
      description:
        "Soluções focadas em resultado, performance e escalabilidade — do site institucional ao front-end de aplicações complexas.",
      services: [
        {
          title: "Landing Page / Site Institucional",
          description:
            "Páginas otimizadas para conversão, SEO e alta performance.",
          starting_price: "2000",
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
    name: "services",
  });

  const onSubmit: SubmitHandler<ServicesSchemaType> = (data) =>
    console.log(data);

  useRegisterForm("services_section", methods);

  return (
    <>
      <Title
        title="Seus Serviços"
        description="Adicione serviços que representem sua experiência."
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
                <div className="flex flex-col gap-2 md:gap-4 md:flex-row">
                  <Input
                    placeholder="Título"
                    {...register(`services.${index}.title`)}
                  />
                  <Input
                    className="max-w-[20%]"
                    placeholder="Preço"
                    {...register(`services.${index}.starting_price`)}
                  />
                </div>

                <Textarea
                  placeholder="Descrição"
                  {...register(`services.${index}.description`)}
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
            Voce pode adicionar somente 5 serviços
          </span>
        )}
        {fields.length <= 10 && (
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
