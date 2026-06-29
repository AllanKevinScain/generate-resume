import { Text } from "@/components";
import { Button } from "@/components/button";
import { useAuth } from "@/hooks";
import { Section } from "./components/section";

export function DashboardPage() {
  const { logout } = useAuth();

  return (
    <div className="mx-auto max-w-7xl px-6 pt-25">
      <header className="mb-8 flex items-center justify-between">
        <Text variant="h1" className="text-3xl font-bold text-(--color-text)">
          Admin dashboard
        </Text>
        <Button.outline onClick={logout}>Out</Button.outline>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Section name="Projects" description="Manage the projects displayed in the portfolio." path="/admin/projects" />
        <Section name="Technology" description="Edit your skills and technologies." path="/admin/techs" />
        <Section
          name="Differentials"
          description="Change the distinguishing features of your work."
          path="/admin/differentials"
        />
        <Section name="Events and works" description="Manage your professional experience." path="/admin/works" />
      </div>
    </div>
  );
}
