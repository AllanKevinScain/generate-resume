import { Button, Input, Text, Textarea } from "@/components";
import { queryKeys } from "@/hooks";
import type { CreateProjectInput } from "@/schemas/project.schema";
import { ProjectSchema } from "@/schemas/project.schema";
import { projectService } from "@/services";
import type { ModalProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface HandleProjectModalProps extends ModalProps {
  id: string;
  onSubmit: (data: CreateProjectInput) => void;
}

const defaultValues = {
  title: "",
  description: "",
  repository: "",
  demo: undefined,
};

export function HandleProjectModal(props: HandleProjectModalProps) {
  const { id, onSubmit, onClose, isOpen } = props;
  const { control, handleSubmit, reset } = useForm<CreateProjectInput>({
    resolver: zodResolver(ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true })),
    defaultValues,
  });

  const project = useQuery({
    queryKey: queryKeys.project(id),
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (id && project.data) {
      reset(project.data);
    }
  }, [id, project.data, reset]);

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
          {id ? "Edit form" : "New project"}
        </Text>

        <div className="flex flex-col gap-1">
          <Input name="title" control={control} label="Title" />
        </div>

        <div className="flex flex-col gap-1">
          <Textarea name="description" control={control} label="Description" />
        </div>

        <div className="flex flex-col gap-1">
          <Input name="repository" control={control} label="Repository URL" />
        </div>

        <div className="flex flex-col gap-1">
          <Input name="demo" control={control} label="Demo URL" />
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
