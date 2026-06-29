import * as yup from "yup";

const differentialSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
});

export const differentialsSchema = yup.object({
  title: yup.string().required("Campo obrigatório."),
  description: yup.string().required("Campo obrigatório."),
  principal_tecnologies: yup.string().required("Campo obrigatório."),
  differentials: yup.array().of(differentialSchema).required("Campo obrigatório."),
});

export type DifferentialsSchemaType = yup.InferType<typeof differentialsSchema>;

export const differentialsDefaultValues: DifferentialsSchemaType = {
  title: "",
  description: "",
  principal_tecnologies: "",
  differentials: [{ title: "", description: "" }],
  // title: "Diferenciais",
  // description:
  //   "Práticas e mentalidade que guiam minhas decisões técnicas e de produto.",
  // principal_tecnologies: "React,TypeScript,Tailwind CSS,Vite",
  // differentials: [
  //   {
  //     title: "Performance e Acessibilidade",
  //     description:
  //       "Páginas leves, rápidas e inclusivas (Lighthouse e boas práticas WCAG).",
  //   },
  // ],
};
