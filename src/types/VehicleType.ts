import { PathString } from 'react-hook-form';

export type VehicleType = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: PathString;
  length: number;
  max_atmosphering_speed: number;
  crew: number;
  passengers: number;
  cargo_capacity: string;
  id: string;
  url: string;
};
