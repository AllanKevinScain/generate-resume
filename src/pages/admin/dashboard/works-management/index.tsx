import { Button, Skeleton } from "@/components";
import { queryKeys, useCreateWorkMutation } from "@/hooks";
import type { CreateWorkInput } from "@/schemas";
import { workService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HandleExcludeModal, HeaderCreateItem } from "../components";
import { SectionItems } from "../components/section-items";
import { HandleWorkModal } from "./handle-modal";

export function WorksManagementPage() {
  const navigate = useNavigate();

  const { createWorkMutation, updateWorkMutation, deleteWorkMutation } = useCreateWorkMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExcludeOpen, setIsExcludeOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<string>("");

  const works = useQuery({
    queryKey: queryKeys.works,
    queryFn: workService.getAll,
    select: (data) =>
      data.map((work) => ({
        id: work.id!,
        name: work.title,
        description: work.description,
      })),
  });

  function handleFormModal() {
    setIsFormOpen((s) => !s);
  }
  function handleExcludeModal() {
    setIsExcludeOpen((s) => !s);
  }
  async function handleWork(data: CreateWorkInput) {
    try {
      if (selectedWork) {
        await updateWorkMutation.mutateAsync({ id: selectedWork, data });
      } else {
        await createWorkMutation.mutateAsync(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleFormModal();
    }
  }
  async function handleRemoveWork() {
    try {
      if (selectedWork) {
        await deleteWorkMutation.mutateAsync(selectedWork);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleExcludeModal();
    }
  }

  if (works.isPending || works.isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-6 pt-25 pb-10">
        <header className="mb-8 flex flex-col gap-4">
          <Button.ghost onClick={() => navigate("/admin")}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </Button.ghost>

          <HeaderCreateItem
            handleAdd={() => {
              setSelectedWork("");
              handleFormModal();
            }}
            title="Manage Events and Jobs"
            buttonDescription="New Event/Job"
          />
        </header>

        <SectionItems
          name="Registered Events and Jobs"
          items={works?.data || []}
          onEdit={(id) => {
            setSelectedWork(id);
            handleFormModal();
          }}
          onDelete={(id) => {
            setSelectedWork(id);
            handleExcludeModal();
          }}
        />
      </div>

      {isFormOpen && (
        <HandleWorkModal id={selectedWork} isOpen={isFormOpen} onClose={handleFormModal} onSubmit={handleWork} />
      )}

      {isExcludeOpen && (
        <HandleExcludeModal
          isOpen={isExcludeOpen}
          onClose={handleExcludeModal}
          textContent="Do you really want to delete this event/job?"
          isLoading={deleteWorkMutation.isPending}
          onSubmit={handleRemoveWork}
        />
      )}
    </>
  );
}
