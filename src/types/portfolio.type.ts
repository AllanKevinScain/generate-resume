import type { FooterSchemaType, HeaderSchemaType } from '@/schemas';

type PortfolioItem = {
  title: string;
  description: string;
};

type PortfolioProject = PortfolioItem & {
  link: string;
  repository: string;
};

export type PortfolioInfoType = {
  profile: HeaderSchemaType;
  footer: FooterSchemaType;
  projects_section: {
    title: string;
    description: string;
    principal_tecnologies: string;
    projects: PortfolioProject[];
  };
  differentials_section: {
    title: string;
    description: string;
    principal_tecnologies: string;
    differentials: PortfolioItem[];
  };
  services_section: {
    title: string;
    description: string;
    services: (PortfolioItem & { starting_price?: string })[];
  };
};
