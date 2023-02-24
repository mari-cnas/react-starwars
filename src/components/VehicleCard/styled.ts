import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IVehicleProps {
  disabled: string;
}

export const CardBg = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  border-radius: 5px;
`;

export const Name = styled.h3`
  background-color: black;
  color: #f4e426;
`;

export const Manufacturer = styled.h3`
  background-color: black;
  color: #707070;
  font-size: 14px;
`;

export const VehicleTable = styled(Table)`
  color: white;
  font-size: 14px;
`;

export const VehicleLink = styled(Link)<IVehicleProps>`
  pointer-events: ${({ disabled }) => disabled === 'unknown' && 'none'};
`;
