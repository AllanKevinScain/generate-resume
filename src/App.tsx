import { Button, ThemeMenu } from "@/components";
import { optionsTheme } from "@/data";
import { useAuth } from "@/hooks";
import { DashboardPage } from "@/pages/dashboard";
import { DifferentialsPage } from "@/pages/differentials";
import { LoginPage } from "@/pages/login";
import { ProjectsPage } from "@/pages/projects";
import { ResumeEditorPage } from "@/pages/resume-editor";
import { TechsPage } from "@/pages/techs";
import { WorksPage } from "@/pages/works";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

function AppShell() {
  const { logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-(--color-bg) text-(--color-text)">
        <header className="relative top-0 z-20 border-b border-(--color-border) bg-(--color-bg)/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 ">
            <Link to="/" className="font-semibold text-(--color-text)">
              Dashboard
            </Link>
            <nav className="flex flex-wrap items-center gap-2" aria-label="Navegação principal">
              <Link to="/" className="rounded-xl px-4 py-2 text-sm transition hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]">
                Dashboard
              </Link>
              <Link to="/resume" className="rounded-xl px-4 py-2 text-sm transition hover:bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]">
                Currículo PDF
              </Link>
              {optionsTheme && (<ThemeMenu items={Object.values(optionsTheme).map(({ icon: _, ...rest }) => rest)} type="inline" />)}
              <Button.outline type="button" onClick={() => void logout()}>
                Sair
              </Button.outline>
            </nav>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/techs" element={<TechsPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="/differentials" element={<DifferentialsPage />} />
          <Route path="/resume" element={<ResumeEditorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-(--color-bg) text-(--color-text)">
        Carregando sessão...
      </main>
    );
  }

  return user ? <AppShell /> : <LoginPage />;
}

export default App;
