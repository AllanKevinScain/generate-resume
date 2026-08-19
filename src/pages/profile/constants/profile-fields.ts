import type { ProfileField } from '../page.type';

export const PERSONAL_FIELDS: ProfileField[] = [
  { name: 'fullName', label: 'Nome completo', required: true, autoComplete: 'name' },
  {
    name: 'contactEmail',
    label: 'E-mail de contato',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  { name: 'phone', label: 'Celular', type: 'tel', autoComplete: 'tel' },
  { name: 'birthDate', label: 'Data de nascimento', type: 'date', autoComplete: 'bday' },
];

export const ADDRESS_FIELDS: ProfileField[] = [
  { name: 'addressLine', label: 'Endereço', autoComplete: 'street-address' },
  { name: 'city', label: 'Cidade', autoComplete: 'address-level2' },
  { name: 'state', label: 'Estado', autoComplete: 'address-level1' },
  { name: 'postalCode', label: 'CEP', autoComplete: 'postal-code' },
  { name: 'country', label: 'País', autoComplete: 'country-name' },
];

export const SOCIAL_FIELDS: ProfileField[] = [
  { name: 'linkedinUrl', label: 'LinkedIn', type: 'url' },
  { name: 'githubUrl', label: 'GitHub', type: 'url' },
];
