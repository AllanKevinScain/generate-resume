import { getServerSession } from "next-auth";
import { Form } from "./form";
import { FormPortifolioProvider } from "@/providers/form";
import { authOptions } from "@/auth-config";

export default async function MultiStepPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return;

  return (
    <FormPortifolioProvider>
      <Form session={session} />
    </FormPortifolioProvider>
  );
}
