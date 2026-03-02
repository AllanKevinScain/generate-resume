import * as yup from "yup";

const projectSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  link: yup.string().url(),
  repository: yup.string().url(),
});

export const projectsSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  principal_tecnologies: yup.string().required("Campo obrigatório."),
  projects: yup.array().of(projectSchema),
});

export type ProjectsSchemaType = yup.InferType<typeof projectsSchema>;
