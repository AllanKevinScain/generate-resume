"use client";

import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FeaturesSection,
  FooterSection,
  HeaderSection,
  ProjectsSection,
  ServicesSection,
} from "./components";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components";
import { generatePortfolioPDF } from "@/utils";
import { useTheme } from "@/hooks";
import { FormPortifolioContext } from "@/providers/form/context";
import { type ActionButtonsProps } from "./components/action-buttons";
import { useSession } from "next-auth/react";

const sections = [
  { id: 0, title: "Cabeçalho" },
  { id: 1, title: "Diferenciais" },
  { id: 2, title: "Projetos" },
  { id: 3, title: "Serviços" },
  { id: 4, title: "Rodapé" },
];

export function Form() {
  const { getAllValues, formsState } = useContext(FormPortifolioContext);

  const { theme } = useTheme();
  const { data: user } = useSession();
  console.log("🚀 ~ Form ~ user:", user);

  const [step, setStep] = useState(0);

  function disableByInteraction() {
    const isDirtyFooter = formsState["footer"]?.formState.isDirty;
    const isDirtyDifferentials =
      formsState["differentials_section"]?.formState.isDirty;
    const isDirtyProfile = formsState["profile"]?.formState.isDirty;
    const isDirtyProjects = formsState["projects_section"]?.formState.isDirty;
    const isDirtyServices = formsState["services_section"]?.formState.isDirty;

    if (
      isDirtyProfile &&
      isDirtyDifferentials &&
      isDirtyProjects &&
      isDirtyServices &&
      isDirtyFooter
    )
      return [0, 1, 2, 3, 4, 5];
    if (
      isDirtyProfile &&
      isDirtyDifferentials &&
      isDirtyProjects &&
      isDirtyServices
    )
      return [0, 1, 2, 3, 4];
    if (isDirtyProfile && isDirtyDifferentials && isDirtyProjects)
      return [0, 1, 2, 3];
    if (isDirtyProfile && isDirtyDifferentials) return [0, 1, 2];
    if (isDirtyProfile) return [0, 1];

    return [0];
  }

  const actionButtons: ActionButtonsProps = {
    step,
    lengthSections: sections.length,
    nextStep: async () => {
      if (step < sections.length - 1) {
        setStep(step + 1);
      } else {
        const allValues = getAllValues();
        if (allValues) {
          await generatePortfolioPDF({
            infoForPortifolio: allValues,
            // imageUrl: user?.imageUrl,
            imageUrl: "",
            theme,
          });
        }
      }
    },
    prevStep: () => {
      if (step > 0) {
        setStep(step - 1);
      }
    },
  };

  if (!user) return null;

  return (
    <div
      className={twMerge(
        "min-h-screen transition-colors duration-300",
        "p-6 pt-24",
        "flex flex-col items-center",
        "bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-text)_10%,transparent)_1px,transparent_1px)]",
        "bg-size-[28px_28px]",
      )}
    >
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {sections.map((section, index) => {
          return (
            <Button.ghost
              key={section.id}
              disabled={!disableByInteraction().includes(index)}
              onClick={() => setStep(index)}
              className={twMerge(
                "border border-[color-mix(in_srgb,var(--color-text)_15%,transparent)]",
                index === step &&
                  "bg-[color-mix(in_srgb,var(--color-primary)_20%,transparent)]",
                index === step &&
                  "border-[color-mix(in_srgb,var(--color-primary)_40%,transparent)]",
              )}
            >
              {section.title}
            </Button.ghost>
          );
        })}
      </div>

      <div
        className={twMerge(
          "w-full max-w-2xl p-8 rounded-2xl backdrop-blur-md transition-all",
          "bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)]",
          "border border-[color-mix(in_srgb,var(--color-primary)_30%,transparent)]",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <HeaderSection
                // fullName={user.fullName?.replace("_", " ")}
                fullName={"Allan"}
                actionButtons={actionButtons}
              />
            )}
            {step === 1 && <FeaturesSection actionButtons={actionButtons} />}
            {step === 2 && <ProjectsSection actionButtons={actionButtons} />}
            {step === 3 && <ServicesSection actionButtons={actionButtons} />}
            {step === 4 && (
              <FooterSection
                // email={user.emailAddresses[0].emailAddress || ""}
                // phone={
                //   user.phoneNumbers.length > 0
                //     ? user.phoneNumbers[0].phoneNumber
                //     : ""
                // }
                actionButtons={actionButtons}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
