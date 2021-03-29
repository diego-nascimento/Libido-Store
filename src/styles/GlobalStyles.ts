import { createGlobalStyle} from 'styled-components';
import {styles} from './styles'
import { keyframes } from 'styled-components';

const ImageShowUp = keyframes`
  from{
    opacity: 0
  }to{
    opacity: 1;
  }
`;

export const GlobalStyles = createGlobalStyle`
  *{
    padding: 0px;
    outline: 0px;
    margin: 0px;
    box-sizing: border-box;
    list-style: none;
  }

html{
  width: 100%;
}

#__next {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

  
  body{
    background: ${styles.bgColor};
    overflow: hidden;
    overflow-y: scroll;
    height: 100%;
    color: ${styles.fontColor};

    h1, h2{
      font-family: 'Khula', sans-serif;
    }

    p, li, a, span{
      font-family: 'Khula', sans-serif;
    }
  
    p, h1, h2, a{
      color :${styles.fontColorDest};
    }

    h1{
      font-size: 3em;
    }

    h2{
      font-size: 2em;
    }

    p, a, span, li{
      font-size: 1.3rem;
    }

    button{
      cursor: pointer;
    }

    svg{
      font-size: 1.5em;
    }

    section{
      padding: 50px 0px;
    }

    @media only screen and  (max-width: 800px){
      h1{
        font-size: 1.9em;
      }

      h2{
       font-size: 1em;
      }

      p, a, span, li{
        font-size: .8em;
      }
      
    }
  }

  .Container{
    width: 100%;
    max-width: 1200px;
  }

  a{
    cursor: pointer;
    text-decoration: none;
    color: initial;
    
    :hover{
      text-decoration: none;
      color: initial;
    }
  }

  img{
    animation: ${ImageShowUp} .5s forwards;
  }

`;
