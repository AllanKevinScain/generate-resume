import { Form } from "./form";
import { FormPortifolioProvider } from "@/providers/form";

export default function MultiStepPage() {
  return (
    <FormPortifolioProvider>
      <Form />
    </FormPortifolioProvider>
  );
}
