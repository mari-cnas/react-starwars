import { FormType, NormalizedFormType } from 'types/FormType';
import { VehicleType } from 'types/VehicleType';

export const normalizeFormData = (data: FormType): NormalizedFormType => ({
  ...data,
  phone: Number(data.phone),
  cpf: Number(data.cpf),
  cnpj: Number(data.cnpj),
  cep: Number(data.cep),
  number: Number(data.number),
  card_number: data?.card_number?.length ? Number(data.card_number) : undefined,
  card_validity: data?.card_validity?.length
    ? Number(data.card_validity)
    : undefined,
  card_password: data?.card_password?.length
    ? Number(data.card_password)
    : undefined,
});

export const urlToId = (url: string): string => url.split('/')[5];

export const normalizeVehicleData = (vehicles: VehicleType[]): VehicleType[] =>
  vehicles.map((vehicle) => ({ ...vehicle, id: urlToId(vehicle.url) }));

export const sanitizedCep = (cepValue: string): string =>
  cepValue?.replaceAll(/\D/g, '');
