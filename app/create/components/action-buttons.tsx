"use client";

import { Button } from "@/components";

export interface ActionButtonsProps {
  nextStep: () => void;
  prevStep: () => void;
  step: number;
  lengthSections: number;
  disabled?: boolean;
}

export function ActionButtons(props: ActionButtonsProps) {
  const { step, nextStep, prevStep, lengthSections, disabled = true } = props;

  return (
    <div className="flex justify-between mt-8">
      <Button.ghost onClick={prevStep} disabled={step === 0}>
        Voltar
      </Button.ghost>

      <Button.ghost onClick={nextStep} disabled={disabled}>
        {step === lengthSections - 1 ? "Finalizar" : "Continuar"}
      </Button.ghost>
    </div>
  );
}
