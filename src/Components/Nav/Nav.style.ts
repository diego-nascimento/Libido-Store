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
  display: ${({MenuBackground}) => MenuBackground ? `none`: 'flex' };
  justify-content: center;
  width: 100%;
`;

export const Message = styled.div`
  color: ${styles.fontColorInDark};
  span{
    font-weight: bold;
    font-size: .7rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
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
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  height: 100%;
  transform: translateY(10px);  

  li{
    letter-spacing: 1px;
    transition: .3s;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0px 20px;
    

    a{
      display: flex;
      align-items: center;
      justify-content: center;
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
  background-color: ${styles.componentsColor};
  width: 100vw;
  position:  ${({MenuBackground}) => MenuBackground ? `fixed`: 'relative' };
  display: flex;
  top: 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: .4s;
  z-index: 99;

  
  svg{
    color: ${styles.fontColor};
    width: 35px;
    height: 35px;
  }

  .BotaoMenu{
    display: none;
    z-index: 2;
  }

  @media  (max-width: 800px){
    flex-direction: row;
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
  max-height: 60px;
  padding: 10px 20px;
  
  .CarrinhoButton{
      position: relative;

      .Cart{
        transition: .4s;
        width: 35px;
        height: 35px;
      }
      
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
        transition: .4s;
      }

      

      :hover{
        .Cart{
          color: ${styles.fontColorInDark};
        }

        p{
          background: ${styles.componentsDest};
          color: ${styles.fontColorInDark};
        }
      }
  }

  .Cart{
    
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
    align-items: center;
    justify-content: center;
    height: 70px;
    letter-spacing: 1px;
    transition: .5;
    color: ${styles.fontColor};
    position: relative;
    top: 8px;
   
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
    display: none;
  }
`;

export const Categorias = styled.section`
  height: 50px;
  width: 100vw;
  margin: 0px auto;
  padding: 0px;
  display: flex;
  background-color: #ddd;
  justify-content: center;

  @media(max-width: 800px){
    display: none;
  }
`;

export const ListaCategorias = styled.ul`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  height: 50px;
`;

export const CategoriaItem = styled.li`
  height: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
  flex-direction: column;
  top: 8px;
  letter-spacing: px;
  transition: .5;
  color: ${styles.fontColor};
  position: relative;
  font-weight: bold;

  p{
    font-size: .8rem;
  }

  a{
      color: ${styles.fontColor};
      transition: .5s;
  }

  :hover{
    p{
      text-decoration: underline;
    }
  }
`;

