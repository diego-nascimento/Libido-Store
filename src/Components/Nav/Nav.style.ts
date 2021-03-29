import styled from 'styled-components';
import { styles } from '../../styles/styles';


interface INavegacao{
  MenuBackground: boolean
}

export const Navegacao = styled.nav<INavegacao>`
  background-color: ${({MenuBackground}) => MenuBackground ? `${styles.componentsColor}`: 'none' };
  height: 70px;
  width: 100vw;
  position: fixed;
  top: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: .4s;
  z-index: 99;
  padding: 20px;

  svg{
    color: ${styles.fontColor};
  }

  .BotaoMenu{
    display: none;
    z-index: 99;
  }

  @media  (max-width: 800px){
    .BotaoMenu{
      display: block;
    }
  }
`;

export const ContainerNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

interface ILista{
  MenuState: boolean,
}


export const Lista = styled.ul<ILista>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  opacity: 1;
  transition: .5s;
  font-weight: bold;

  li{
    padding: 20px 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    letter-spacing: 1px;
    transition: .5;
    color: ${styles.fontColor};
    
    a{
      color: ${styles.fontColor};
      transition: .5s;
    }
    
    :hover{
      color: ${styles.fontColorInDark};

      a{
        color: ${styles.fontColorInDark};
      }
    }
  }

  @media  (max-width: 800px){
    opacity: ${props => props.MenuState ? '1' : '0'};
    transform: ${props => props.MenuState ? 'translateY(0px)' : 'translateY(-20px)'};
    position: fixed;
    background: ${styles.componentsColor};
    color: ${styles.fontColor};
    top: 55px;
    left: 30px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0px;
    border-radius: 7px;
    height: 150px;
  }
`;


export const RedesSociais = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  flex-direction: row;
  color: ${styles.fontColor};
  

  svg{
    transition: .5s;
  }

  li{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    letter-spacing: 1px;
    

    :hover{
      color: ${styles.fontColor};

      svg{
        color: ${styles.fontColorInDark}
      }
    }
  }
`;
