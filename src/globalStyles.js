import { createGlobalStyle } from 'styled-components';
import Montserrat from './assets/fonts/Montserrat-Regular.ttf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Montserrat;
    src: url(${Montserrat});
  }

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