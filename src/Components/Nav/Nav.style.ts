import styled from 'styled-components';
import { styles } from '../../styles/styles';



interface INavegacao{
  MenuBackground: boolean
}

export const Wrapper = styled.div`
  width: 100vw;
`;

export const ContainerHeader = styled.header<INavegacao>`
  height: 50px;
  background: ${styles.componentsDest};
  transform: ${({MenuBackground}) => MenuBackground ? `translateY(-50px)`: 'translateY(0px)' };
  display: flex;
  justify-content: center;
  width: 100%;
  transition: .4s;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 20px;

  svg{
    color: ${styles.fontColorInDark};
  }
`;


export const RedesSociais = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;


  li{
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    height: 50px;
    transition: .3s;

    a{
      padding: 20px;
    }
    
    :hover{
      opacity: .8;

      svg{
        color: ${styles.fontColorInDark}
      }
    }
  }
`;


export const Navegacao = styled.nav<INavegacao>`
  background-color: ${({MenuBackground}) => MenuBackground ? `${styles.componentsColor}`: 'none' };
  height: 70px;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: .4s;
  z-index: 99;
  top: 50px;
  transform: ${({MenuBackground}) => MenuBackground ? `translateY(-50px)`: 'translateY(0px)' };
  padding: 0px 20px;


  svg{
    color: ${styles.fontColor};
    width: 35px;
    height: 35px;
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
  width: 100%;
  cursor: pointer;
  
  .CarrinhoButton{
      position: relative;
      p{
        position: absolute;
        bottom: -5px;
        right: -10px;
        color: white;
        padding: 2px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: ${styles.fontColorInDark};
        color: ${styles.componentsDest};
        border-radius: 50%;
      }
  }

  .Cart{
    transition: .4s;
    width: 35px;
    height: 35px;

    :hover{
      color: ${styles.fontColorInDark};
      

      a{
        color: ${styles.fontColorInDark};
      }
    }
  }
  
`;

interface ILista{
  MenuState: boolean,
}


export const Lista = styled.ul<ILista>`
  display: flex;
  align-items: center;
  flex-direction: row;
  opacity: 1;
  transition: .5s;
  font-weight: bold;

  li{
    padding: 20px 50px;
    display: flex;
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
    display: ${props => props.MenuState ? 'flex' : 'none'};
    position: fixed;
    background: ${styles.componentsColor};
    color: ${styles.fontColor};
    top: 55px;
    left: 30px;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 0px;
    border-radius: 7px;
  }
`;

