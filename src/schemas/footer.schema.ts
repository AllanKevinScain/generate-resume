import * as yup from "yup";

const socialMediaSchema = yup.object({
  linkedin: yup.string().url(),
  github: yup.string().url(),
  instagram: yup.string().url(),
  google: yup.string().url(),
});

const contactSchema = yup.object({
  email: yup.string().email().required("Campo obrigatório."),
  phone: yup.string().required("Campo obrigatório."),
  social_media: socialMediaSchema,
});

export const footerSchema = yup.object({
  cta_title: yup.string().required("Campo obrigatório."),
  cta_description: yup.string().required("Campo obrigatório."),
  tech_stack_footer: yup.string().required("Campo obrigatório."),
  contact: contactSchema,
});

export const footerDefaultValues = {
  cta_title: "",
  cta_description: "",
  tech_stack_footer: "",
  contact: {
    email: "",
    phone: "",
    social_media: {
      linkedin: "",
      github: "",
      instagram: "",
      google: "",
    },
  },
  // cta_title: "Vamos conversar?",
  // cta_description:
  //   "Me chame para falarmos sobre seu projeto, produto ou ideia. Posso ajudar a transformar isso em uma experiência sólida.",
  // tech_stack_footer: "Construído com React, Vite, TypeScript e Tailwind.",
  // contact: {
  //   email: "meuemail@email.com",
  //   phone: "9999999999999",
  //   social_media: {
  //     linkedin: "http://asasass.linkeding.com.br",
  //     github: "http://asasaas.github.com.br",
  //     instagram: "http://asasas.instagram.br",
  //     google: "http://asasas.google.br",
  //   },
  // },
};

export type FooterSchemaType = yup.InferType<typeof footerSchema>;
