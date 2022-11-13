export type FormType = {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  cnpj: string;
  cep: string;
  logradouro: string;
  number: string;
  complement: string;
  bairro: string;
  localidade: string;
  uf: string;
  card_name?: string;
  card_number?: string;
  card_validity?: string;
  card_password?: string;
};

export type NormalizedFormType = {
  name: string;
  email: string;
  phone: number;
  cpf: number;
  cnpj: number;
  cep: number;
  logradouro: string;
  number: number;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  card_name?: string;
  card_number?: number;
  card_validity?: number;
  card_password?: number;
};
