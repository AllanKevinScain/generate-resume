import { ResourceManagementPage } from "@/pages/resource-management";
import { projectsResourceConfig } from "@/pages/resource-management/resources";

export function ProjectsPage() {
  return <ResourceManagementPage config={projectsResourceConfig} />;
}
