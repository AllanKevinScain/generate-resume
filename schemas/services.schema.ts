import * as yup from "yup";

const serviceSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  starting_price: yup.string(),
});

export const servicesSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  services: yup.array().of(serviceSchema),
});

export type ServicesSchemaType = yup.InferType<typeof servicesSchema>;
