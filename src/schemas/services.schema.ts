import * as yup from 'yup';

const serviceSchema = yup.object({
  title: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  starting_price: yup.string(),
});

export const servicesSchema = yup.object({
  title: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  services: yup.array().of(serviceSchema).required('Campo obrigatório.'),
});

export type ServicesSchemaType = yup.InferType<typeof servicesSchema>;

export const servicesDefaultValues: ServicesSchemaType = {
  title: '',
  description: '',
  services: [{ title: '', description: '', starting_price: '' }],
  // title: "Serviços",
  // description:
  //   "Soluções focadas em resultado, performance e escalabilidade — do site institucional ao front-end de aplicações complexas.",
  // services: [
  //   {
  //     title: "Landing Page / Site Institucional",
  //     description: "Páginas otimizadas para conversão, SEO e alta performance.",
  //     starting_price: "2000",
  //   },
  // ],
};
