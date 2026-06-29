import { Button, Input, Select, Text, Textarea } from "@/components";
import { queryKeys } from "@/hooks";
import type { CreateTechInput } from "@/schemas/tech.schema";
import { TechSchema } from "@/schemas/tech.schema";
import { techService } from "@/services";
import type { ModalProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface HandleTechModalProps extends ModalProps {
  id: string;
  onSubmit: (data: CreateTechInput) => void;
}

const defaultValues: CreateTechInput = {
  name: "",
  description: "",
  nivel: "junior",
};

export function HandleTechModal(props: HandleTechModalProps) {
  const { id, onSubmit, onClose, isOpen } = props;

  const { control, handleSubmit, reset } = useForm<CreateTechInput>({
    resolver: zodResolver(TechSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues,
  });

  const tech = useQuery({
    queryKey: queryKeys.tech(id),
    queryFn: () => techService.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && tech.data) reset(tech.data);
  }, [id, tech.data, reset]);

  return (
    <dialog
      open={isOpen}
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-(--color-border) bg-(--color-bg) p-6 shadow-2xl"
      >
        <Text variant="h3" className="mb-2">
          {id ? "Edit form" : "New technology"}
        </Text>

        <div className="flex flex-col gap-1">
          <Input name="name" control={control} label="Name" />
        </div>

        <div className="flex flex-col gap-1">
          <Select
            name="nivel"
            control={control}
            label="Nivel"
            options={[
              { value: "junior", label: "Junior" },
              { value: "mid", label: "Mid" },
              { value: "senior", label: "Senior" },
              { value: "stack", label: "Stack" },
            ]}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Textarea name="description" control={control} label="Description" />
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button.outline
            type="button"
            onClick={() => {
              onClose();
              reset(defaultValues);
            }}
          >
            Cancel
          </Button.outline>
          <Button.solid type="submit">Save</Button.solid>
        </div>
      </form>
    </dialog>
  );
}
