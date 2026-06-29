import { Button, Skeleton } from "@/components";
import { queryKeys, useDifferential } from "@/hooks";
import type { CreateDifferentialInput } from "@/schemas";
import { differentialService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HandleExcludeModal, HeaderCreateItem } from "../components";
import { SectionItems } from "../components/section-items";
import { HandleDifferentialModal } from "./handle-modal";

export function DifferentialsManagementPage() {
  const navigate = useNavigate();

  const { createDifferentialMutation, updateDifferentialMutation, deleteDifferentialMutation } = useDifferential();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExcludeOpen, setIsExcludeOpen] = useState(false);
  const [selectedDifferential, setSelectedDifferential] = useState<string>("");

  const differentials = useQuery({
    queryKey: queryKeys.differentials,
    queryFn: differentialService.getAll,
    select: (data) =>
      data.map((item) => ({
        id: item.id!,
        name: item.title,
        description: item.description,
      })),
  });

  function handleFormModal() {
    setIsFormOpen((s) => !s);
  }
  function handleExcludeModal() {
    setIsExcludeOpen((s) => !s);
  }
  async function handleDifferential(data: CreateDifferentialInput) {
    try {
      if (selectedDifferential) {
        await updateDifferentialMutation.mutateAsync({ id: selectedDifferential, data });
      } else {
        await createDifferentialMutation.mutateAsync(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleFormModal();
    }
  }
  async function handleRemoveDifferential() {
    try {
      if (selectedDifferential) {
        await deleteDifferentialMutation.mutateAsync(selectedDifferential);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleExcludeModal();
    }
  }

  if (differentials.isPending || differentials.isLoading) {
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
              setSelectedDifferential("");
              handleFormModal();
            }}
            title="Managing Differentiators"
            buttonDescription="New Differential"
          />
        </header>

        <SectionItems
          name="Registered Features"
          items={differentials?.data || []}
          onEdit={(id) => {
            setSelectedDifferential(id);
            handleFormModal();
          }}
          onDelete={(id) => {
            setSelectedDifferential(id);
            handleExcludeModal();
          }}
        />
      </div>

      {isFormOpen && (
        <HandleDifferentialModal
          id={selectedDifferential}
          isOpen={isFormOpen}
          onClose={handleFormModal}
          onSubmit={handleDifferential}
        />
      )}

      {isExcludeOpen && (
        <HandleExcludeModal
          isOpen={isExcludeOpen}
          onClose={handleExcludeModal}
          textContent="Do you really want to eliminate this feature?"
          isLoading={deleteDifferentialMutation.isPending}
          onSubmit={handleRemoveDifferential}
        />
      )}
    </>
  );
}
