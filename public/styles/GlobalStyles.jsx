import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
        font-family: 'Questrial', sans-serif;
    }
    
    body {
        margin: 0;
        background-color: black;
        /* overflow: hidden; */
    }

    * {
        box-sizing: border-box;
    }

    input {
        border: none;
        background: none;
        outline: none;
        font-size: 24px;
        color: white;
        box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;
        width: 100%;

        @media (min-width: 992px) {
            font-size: 30px;
        }


        :focus {
            box-shadow: rgb(255, 255, 255) 0px 2px;
        }
    }
`;

function GlobalStyles() {
  return <GlobalStyle />;
}

export default GlobalStyles;
