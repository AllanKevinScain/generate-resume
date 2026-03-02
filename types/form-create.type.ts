import type {
  DifferentialsSchemaType,
  HeaderSchemaType,
  ProjectsSchemaType,
  ServicesSchemaType,
} from "@/schemas";
import type { FooterSchemaType } from "@/schemas/footer.schema";

export type InfoForPortifolioType = {
  profile: HeaderSchemaType;
  projects_section: ProjectsSchemaType;
  differentials_section: DifferentialsSchemaType;
  services_section: ServicesSchemaType;
  footer: FooterSchemaType;
};

export type KeyInfoForPortifolioType = keyof InfoForPortifolioType;
