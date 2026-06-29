import { useContext } from "react";
import { ThemeContext } from "../../providers/theme/context";

export function useTheme() {
  return useContext(ThemeContext);
}
