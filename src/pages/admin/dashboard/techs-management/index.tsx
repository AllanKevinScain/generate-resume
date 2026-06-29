import { Button, Skeleton } from "@/components";
import { queryKeys, useTech } from "@/hooks";
import type { CreateTechInput } from "@/schemas";
import { techService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HandleExcludeModal, HeaderCreateItem } from "../components";
import { SectionItems } from "../components/section-items";
import { HandleTechModal } from "./handle-modal";

export function TechsManagementPage() {
  const navigate = useNavigate();

  const { createTechMutation, updateTechMutation, deleteTechMutation } = useTech();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExcludeOpen, setIsExcludeOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>("");

  const techs = useQuery({
    queryKey: queryKeys.techs,
    queryFn: techService.getAll,
    select: (data) =>
      data.map((tech) => ({
        id: tech.id!,
        name: tech.name,
        description: tech.description,
      })),
  });

  function handleFormModal() {
    setIsFormOpen((s) => !s);
  }
  function handleExcludeModal() {
    setIsExcludeOpen((s) => !s);
  }
  async function handleTech(data: CreateTechInput) {
    try {
      if (selectedTech) {
        await updateTechMutation.mutateAsync({ id: selectedTech, data });
      } else {
        await createTechMutation.mutateAsync(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleFormModal();
    }
  }
  async function handleRemoveTech() {
    try {
      if (selectedTech) {
        await deleteTechMutation.mutateAsync(selectedTech);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleExcludeModal();
    }
  }

  if (techs.isPending || techs.isLoading) {
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
              setSelectedTech("");
              handleFormModal();
            }}
            title="Managing Technologies"
            buttonDescription="New technology"
          />
        </header>

        <SectionItems
          name="Registered Technologies"
          items={techs?.data || []}
          onEdit={(id) => {
            setSelectedTech(id);
            handleFormModal();
          }}
          onDelete={(id) => {
            setSelectedTech(id);
            handleExcludeModal();
          }}
        />
      </div>

      {isFormOpen && (
        <HandleTechModal id={selectedTech} isOpen={isFormOpen} onClose={handleFormModal} onSubmit={handleTech} />
      )}

      {isExcludeOpen && (
        <HandleExcludeModal
          isOpen={isExcludeOpen}
          onClose={handleExcludeModal}
          textContent="Do you really want to delete this technology?"
          isLoading={deleteTechMutation.isPending}
          onSubmit={handleRemoveTech}
        />
      )}
    </>
  );
}
