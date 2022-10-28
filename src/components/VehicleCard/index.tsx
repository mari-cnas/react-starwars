import { memo } from 'react';

import { Link } from 'react-router-dom';

import { VehicleType } from 'types/VehicleType';

import { CardBg, Manufacturer, Name, VehicleTable } from './styled';

interface IBaseComponentProps {
  children?: React.ReactNode;
  vehicle: VehicleType;
}
// `/vehicles/${charId}`
// const id = results.data.name.indexOf(vehicle.name);
const VehicleCard: React.FC<IBaseComponentProps> = ({ vehicle }) => {
  return (
    <CardBg className="d-flex flex-column justify-content-center px-3 py-3 my-2">
      <Manufacturer>{vehicle.manufacturer}</Manufacturer>
      <p>{vehicle.model}</p>
      <Link to={`/checkout/${vehicle.id}`}>
        <Name>{vehicle.name}</Name>
      </Link>
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
            <td>{vehicle.cargo_capacity}</td>
          </tr>
        </tbody>
      </VehicleTable>

      <Name>€ {vehicle.cost_in_credits}</Name>
    </CardBg>
  );
};

export default memo(VehicleCard);
