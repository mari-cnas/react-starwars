import { memo } from 'react';

import { Link } from 'react-router-dom';

import { VehicleType } from 'types/VehicleType';

import {
  CardBg,
  Manufacturer,
  Name,
  VehicleLink,
  VehicleTable,
} from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
  vehicle: VehicleType;
}

const VehicleCard: React.FC<IBaseComponentProps> = ({ vehicle }) => {
  return (
    <VehicleLink
      to={`/checkout/${vehicle.id}`}
      className="d-flex w-100"
      disabled={vehicle.cost_in_credits}
    >
      <CardBg className=" px-3 py-3 my-2">
        <Manufacturer>{vehicle.manufacturer}</Manufacturer>
        <p>{vehicle.model}</p>

        <Name>{vehicle.name}</Name>

        <VehicleTable borderless>
          <tbody>
            <tr>
              <th>Largura</th>
              <td>{vehicle.length}</td>
            </tr>
            <tr>
              <th>Velocidade</th>
              <td>{vehicle.max_atmosphering_speed}</td>
            </tr>
            <tr>
              <th>Equipe</th>
              <td>{vehicle.crew}</td>
            </tr>
            <tr>
              <th>Passageiros</th>
              <td>{vehicle.passengers}</td>
            </tr>
            <tr>
              <th>Capacidade de carga</th>
              {vehicle.cargo_capacity !== 'unknown' && (
                <td>{vehicle.cargo_capacity}</td>
              )}
            </tr>
          </tbody>
        </VehicleTable>
        {vehicle.cost_in_credits !== 'unknown' && (
          <Name>€ {vehicle.cost_in_credits}</Name>
        )}
      </CardBg>
    </VehicleLink>
  );
};

export default memo(VehicleCard);
