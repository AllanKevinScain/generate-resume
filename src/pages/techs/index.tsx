import { ResourceManagementPage } from '@/pages/resource-management';
import { techsResourceConfig } from '@/pages/resource-management/resources';

export function TechsPage() {
  return <ResourceManagementPage config={techsResourceConfig} />;
}
