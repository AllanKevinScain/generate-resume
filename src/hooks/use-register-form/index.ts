import { FormPortifolioContext } from "@/providers/form/context";
import { useContext, useEffect } from "react";

export function useRegisterForm(formName: string, methods: unknown) {
  const { registerForm } = useContext(FormPortifolioContext);

  useEffect(() => {
    registerForm(formName, methods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formName, methods]);
}
