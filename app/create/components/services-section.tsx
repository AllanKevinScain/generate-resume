"use client";

import { Button, Input, Textarea } from "@/components";
import { RiApps2AddLine } from "react-icons/ri";
import { FaTrashArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import {
  servicesDefaultValues,
  servicesSchema,
  type ServicesSchemaType,
} from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { useRegisterForm } from "@/hooks";
import { ActionButtonsProps, ContainerForm } from "./container-form";

interface ServicesSectionProps {
  actionButtons: ActionButtonsProps;
}

export function ServicesSection(props: ServicesSectionProps) {
  const methods = useForm({
    resolver: yupResolver(servicesSchema),
    defaultValues: servicesDefaultValues,
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { isDirty, errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit: SubmitHandler<ServicesSchemaType> = (data) => {
    console.log(data);

    if (Object.keys(errors).length > 0) return;
    props.actionButtons.nextStep?.();
  };

  useRegisterForm("services_section", methods);

  return (
    <ContainerForm
      title="Seus Serviços"
      description="Adicione serviços que representem sua experiência."
      formClassName="gap-12 md:gap-4"
      onSubmit={handleSubmit(onSubmit)}
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
      </>
    </ContainerForm>
  );
}
