import { Button, Skeleton } from "@/components";
import { queryKeys, useProject } from "@/hooks";
import type { CreateProjectInput } from "@/schemas";
import { projectService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { HandleExcludeModal, HeaderCreateItem } from "../components";
import { SectionItems } from "../components/section-items";
import { HandleProjectModal } from "./handle-modal";

export function ProjectsManagementPage() {
  const navigate = useNavigate();

  const { createProjectMutation, updateProjectMutation, deleteProjectMutation } = useProject();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExcludeOpen, setIsExcludeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string>("");

  const projects = useQuery({
    queryKey: queryKeys.projects,
    queryFn: projectService.getAll,
    select: (data) =>
      data.map((project) => ({
        id: project.id!,
        title: project.title,
        description: project.description,
      })),
  });

  function handleFormModal() {
    setIsFormOpen((s) => !s);
  }
  function handleExcludeModal() {
    setIsExcludeOpen((s) => !s);
  }
  async function handleProject(data: CreateProjectInput) {
    try {
      if (selectedProject) {
        await updateProjectMutation.mutateAsync({ id: selectedProject, data });
      } else {
        await createProjectMutation.mutateAsync(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleFormModal();
    }
  }
  async function handleRemoveProject() {
    try {
      if (selectedProject) {
        await deleteProjectMutation.mutateAsync(selectedProject);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleExcludeModal();
    }
  }

  if (projects.isPending || projects.isLoading) {
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
              setSelectedProject("");
              handleFormModal();
            }}
            title="Managing Projects"
            buttonDescription="New project"
          />
        </header>

        <SectionItems
          name="Registered Projects"
          items={projects?.data || []}
          onEdit={(id) => {
            setSelectedProject(id);
            handleFormModal();
          }}
          onDelete={(id) => {
            setSelectedProject(id);
            handleExcludeModal();
          }}
        />
      </div>

      {isFormOpen && (
        <HandleProjectModal
          id={selectedProject}
          isOpen={isFormOpen}
          onClose={handleFormModal}
          onSubmit={handleProject}
        />
      )}

      {isExcludeOpen && (
        <HandleExcludeModal
          isOpen={isExcludeOpen}
          onClose={handleExcludeModal}
          textContent="Do you really want to delete this project?"
          isLoading={deleteProjectMutation.isPending}
          onSubmit={handleRemoveProject}
        />
      )}
    </>
  );
}
