import { ResourceManagementPage } from "@/pages/resource-management";
import { worksResourceConfig } from "@/pages/resource-management/resources";

export function WorksPage() {
  return <ResourceManagementPage config={worksResourceConfig} />;
}
