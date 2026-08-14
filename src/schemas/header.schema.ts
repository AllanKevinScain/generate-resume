import * as yup from 'yup';

export const headerSchema = yup.object({
  name: yup.string().required('Campo obrigatório.'),
  role: yup.string().required('Campo obrigatório.'),
  status: yup.string().required('Campo obrigatório.'),
  headline: yup.string().required('Campo obrigatório.'),
  title: yup.string().required('Campo obrigatório.'),
});

export const headerDefaultValues = {
  name: '',
  role: '',
  status: '',
  headline: '',
  title: '',
  // name: "Allan Kevin Scain",
  // role: "Desenvolvedor Front-End",
  // status: "Disponível para novos projetos",
  // headline:
  //   "Crio interfaces modernas, performáticas e escaláveis com foco em experiência do usuário e arquitetura sólida.",
  // title: "Seja bem vindo!",
};

export type HeaderSchemaType = yup.InferType<typeof headerSchema>;
