import * as yup from "yup";

const differentialSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
});

export const differentialsSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  principal_tecnologies: yup.string().required("Campo obrigatório."),
  differentials: yup.array().of(differentialSchema),
});

export type DifferentialsSchemaType = yup.InferType<typeof differentialsSchema>;
