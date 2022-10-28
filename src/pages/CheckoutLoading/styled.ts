import styled from 'styled-components';

interface IButtonProps {
  btnColor: boolean;
}

export const Bg = styled.div`
  background-color: #282a36;

  /* unvisited link */
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

  & > p {
    color: grey;
  }

  & > div > p {
    color: grey;
  }

  & > input {
    background-color: #333333;
    border: none;
    color: white;
  }

  & > div > input {
    background-color: #333333;
    border: none;
    color: white;
  }

  & > div > div > input {
    background-color: #333333;
    border: none;
    color: white;
  }

  & > div > div > div > input {
    background-color: #333333;
    border: none;
    color: white;
  }
`;

export const Manufacturer = styled.h3`
  background-color: black;
  color: #707070;
  font-size: 14px;
`;

export const BtnBg = styled.button`
 background-color: {btnColor} ?   #cccccc : #f4e426;
  font-size: 14px;
  border-radius: 4px;
  font-weight: bold;

  
`;

// ${({ coverImage }) => `url(${coverImage})`};
