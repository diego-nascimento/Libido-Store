import { createGlobalStyle} from 'styled-components';
import {styles} from './styles'
import {ImageShowUp, PBottomTop} from '../styles/Keyframes'

export const GlobalStyles = createGlobalStyle`
  *{
    padding: 0px;
    outline: 0px;
    margin: 0px;
    box-sizing: border-box;
    list-style: none;
  }

#__next {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

html{
  font-size: 100%;
}

  
  body{
    background-image: linear-gradient(to bottom,  #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6, #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6,#eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6);
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
      font-size: 2rem;
    }

    h2{
      font-size: 1.3rem;
    }

    p, a, span, li, b{
      font-size: 1rem;
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

    p{
      animation: ${PBottomTop} .5s forwards;
    }

    @media  (max-width: 800px){
      section{
        padding: 20px 0px;
      }

      h1{
        font-size: 1.7rem;
      }

      h2{
       font-size: 1.4rem;
      }

      p, a, span, li, b{
        font-size: 1.2rem;
      }
      
    }

    @media(max-width: 650px){
      h1{
        font-size: 1.3rem;
        margin-bottom: 20px;
      }

      h2{
       font-size: .8rem;
      }

      p, a, span, li, b{
        font-size: .6rem;
      }
    }
  }

  .Container{
    width: 100%;
    max-width: 1300px;
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
    animation: ${ImageShowUp({opacity: 1})} .5s forwards;
  }

  .PageContainer{
    animation: ${ImageShowUp({opacity: 1})} .5s forwards;
  }
`;

