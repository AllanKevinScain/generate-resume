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

export type FooterSchemaType = yup.InferType<typeof footerSchema>;
