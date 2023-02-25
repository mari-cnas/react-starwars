import styled from 'styled-components';

interface IButtonCreditCard {
  active: string;
}
interface IButtonTicket {
  active: string;
}

export const Load = styled.h3`
  color: white;
`;

export const Form = styled.form`
  color: white;
`;

export const Name = styled.h4`
  color: #f4e426;
`;

export const FormBox = styled.div`
  background-color: black;
  color: white;
  width: 100%;
  border-radius: 5px;

  input:nth-child(n) {
    background-color: #333333;
    border: none;
    color: white;
  }

  input:invalid {
    border: 2px dashed red;
  }
`;

export const Manufacturer = styled.h3`
  background-color: black;
  color: #707070;
  font-size: 14px;
`;

export const ErrorMsg = styled.p`
  color: red;
  font-size: 0.8rem;
`;

export const BtnBg = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: #f4e426;
  border-radius: 5px;
  opacity: 1;
  color: #000;
  border: none;

  /* unvisited link */
  a:link {
    color: black;
    text-decoration: none;
  }

  /* visited link */
  a:visited {
    color: black;
  }

  /* mouse over link */
  a:hover {
    color: grey;
  }
`;

export const ButtonCreditCard = styled.button<IButtonCreditCard>`
  width: 100%;
  height: 40px;
  background: ${({ active }) =>
      active === 'creditCard' ? '#F4E426' : '#cccccc'}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;

export const ButtonTicket = styled.button<IButtonTicket>`
  width: 100%;
  height: 40px;
  background: ${({ active }) => (active === 'ticket' ? '#F4E426' : '#cccccc')}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;
