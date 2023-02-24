import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
 
}
html,body,#root{
    min-height: 100vh;
}
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
    color: grey;
  }
`;
