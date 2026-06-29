export type Field = {
  name: string;
  label: string;
  kind?: "text" | "url" | "textarea" | "select";
  optional?: boolean;
  options?: string[];
};

export type Resource = {
  table: "project" | "tech" | "work" | "differential";
  label: string;
  description: string;
  fields: Field[];
};

export type ResourceFormValues = Record<string, string>;
