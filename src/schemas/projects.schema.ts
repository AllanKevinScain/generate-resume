import * as yup from 'yup';

const projectSchema = yup.object({
  title: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  link: yup.string().url(),
  repository: yup.string().url(),
});

export const projectsSchema = yup.object({
  title: yup.string().required('Campo obrigatório.'),
  description: yup.string().required('Campo obrigatório.'),
  principal_tecnologies: yup.string().required('Campo obrigatório.'),
  projects: yup.array().of(projectSchema).required('Campo obrigatório.'),
});

export type ProjectsSchemaType = yup.InferType<typeof projectsSchema>;

export const projectsDefaultValues: ProjectsSchemaType = {
  title: '',
  description: '',
  projects: [{ title: '', description: '', link: '', repository: '' }],
  principal_tecnologies: '',
  // title: "Projetos em destaque",
  // description:
  //   "Alguns trabalhos e experimentos que demonstram minha experiência com front-end moderno e arquitetura de aplicações.",
  // projects: [
  //   {
  //     title: "Dashboard de Vendas",
  //     description:
  //       "Dashboard responsivo com gráficos e filtros em tempo real, focado em KPIs de e-commerce.",
  //     link: "https://dashboard-vendas.vercel.app/",
  //     repository: "https://github.com/allankevin/dashboard-vendas",
  //   },
  // ],
  // principal_tecnologies: "",
};
