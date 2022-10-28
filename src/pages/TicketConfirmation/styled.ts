import styled from 'styled-components';

export const Bg = styled.div`
  background-color: #282a36;

  a:link {
    color: white;
    text-decoration: none;
  }

  /* visited link */
  a:visited {
    color: white;
  }

  /* mouse over link */
  a:hover {
    color: grey;
  }

  /* selected link */
  a:active {
    color: #0000ff;
  }
`;

export const Load = styled.h3`
  color: white;
`;

export const Name = styled.h4`
  color: #f4e426;
`;

export const FormBox = styled.div`
  background-color: black;
  color: white;

  border-radius: 5px;
`;

export const Manufacturer = styled.h3`
  background-color: black;
  color: #707070;
  font-size: 14px;
`;

export const BtnBg = styled.button`
  background-color: #cccccc;
  font-size: 14px;
  border-radius: 4px;
  font-weight: bold;
`;
