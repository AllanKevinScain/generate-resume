import { Button, Input, Text, Textarea } from "@/components";
import { queryKeys } from "@/hooks";
import type { CreateWorkInput } from "@/schemas/work.schema";
import { WorkSchema } from "@/schemas/work.schema";
import { workService } from "@/services";
import type { ModalProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface HandleWorkModalProps extends ModalProps {
  id: string;
  onSubmit: (data: CreateWorkInput) => void;
}

const defaultValues: CreateWorkInput = {
  title: "",
  description: "",
  image: "",
};

export function HandleWorkModal(props: HandleWorkModalProps) {
  const { id, onSubmit, onClose, isOpen } = props;

  const { control, handleSubmit, reset } = useForm<CreateWorkInput>({
    resolver: zodResolver(WorkSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues,
  });

  const work = useQuery({
    queryKey: queryKeys.work(id),
    queryFn: () => workService.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && work.data) reset(work.data);
  }, [id, work.data, reset]);

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
          {id ? "Edit form" : "New work/event"}
        </Text>

        <Input name="title" control={control} label="Title" />

        <div className="flex flex-col gap-1">
          <Input name="title" control={control} label="Title" />
        </div>

        <div className="flex flex-col gap-1">
          <Input name="image" control={control} label="Image" />
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
