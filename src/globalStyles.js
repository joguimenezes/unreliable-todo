import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  * {
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
  }

  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;