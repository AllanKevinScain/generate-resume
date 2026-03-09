import { Button } from "@/components";
import { twMerge } from "tailwind-merge";

export interface ActionButtonsProps {
  nextStep: () => void;
  prevStep: () => void;
  step: number;
  lengthSections: number;
  disabled?: boolean;
}

interface ContainerFormProps {
  title: string;
  description: string;

  isDirty: boolean;
  actionButtons: ActionButtonsProps;
  onSubmit: () => void;
  children: React.ReactNode;

  formClassName?: string;
}

export function ContainerForm(props: ContainerFormProps) {
  const {
    actionButtons,
    description,
    title,
    isDirty,
    children,
    onSubmit,
    formClassName,
  } = props;
  return (
    <>
      <h2 className="text-(--color-text) text-2xl font-bold">{title}</h2>
      <p className="text-(--color-text) opacity-70 mb-4">{description}</p>

      <form
        onSubmit={onSubmit}
        className={twMerge("flex flex-col gap-2", formClassName)}
        noValidate
      >
        {children}
        <div className="flex justify-between mt-8">
          <Button.ghost
            onClick={actionButtons.prevStep}
            disabled={actionButtons.step === 0}
          >
            Voltar
          </Button.ghost>

          <Button.ghost disabled={isDirty} type="submit">
            {actionButtons.step === actionButtons.lengthSections - 1
              ? "Finalizar"
              : "Continuar"}
          </Button.ghost>
        </div>
      </form>
    </>
  );
}
