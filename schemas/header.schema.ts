import * as yup from "yup";

export const headerSchema = yup.object({
  name: yup.string().required("Campo obrigatório."),
  role: yup.string().required("Campo obrigatório."),
  status: yup.string().required("Campo obrigatório."),
  headline: yup.string().required("Campo obrigatório."),
  title: yup.string().required("Campo obrigatório."),
});

export type HeaderSchemaType = yup.InferType<typeof headerSchema>;
