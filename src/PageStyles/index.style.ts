import styled from 'styled-components'
import { styles } from '../styles/styles'


export const Header = styled.header`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  background-size: center;
  height: 100vh;
  overflow-y: hidden;
  background-image: url('MainPanel.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center bottom;
  
  @media(max-width: 800px){
    height: 500px;
  }
`;


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

.BotaoMenu{
  display: none;
  z-index: 99;
}

@media(max-width: 800px){
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
  height: 70px;
  flex-direction: row;
  color: ${styles.fontColor};
  opacity: 1;
  transition: .5s;

  li{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    letter-spacing: 1px;
    transition: .3s;

    svg{
      color: ${styles.dest2Components};
    }

    :hover{
      color: ${styles.fontColorDest};
    }
  }

  @media(max-width: 800px){
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
  }
`;


export const RedesSociais = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  flex-direction: row;
  color: ${styles.fontColor};

  li{
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    letter-spacing: 1px;

    svg{
      color: ${styles.dest2Components};
    }

    :hover{
      color: ${styles.fontColor};
    }
  }
`;

export const Banner = styled.section`
width: 100vw;
background: white;
display: flex;
justify-content: center;
color: ${styles.componentsColor};

p{
    text-align: left;
    line-height: 2rem;
    letter-spacing: 1px;
    color: #ccc;
}

.Container{
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;

  

  h2, p{
    display: flex;
    align-items: center;
    padding: 0px 20px;
    color: #111;
  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;

    h2, p{
    padding: 0px 10px;
  }
  }
}
`;

export const Produtos = styled.section`
  width: calc(100vw);
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${styles.componentsColor};

  h1{
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.componentsColor}
  }

`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: calc(100% - 20px);
  grid-gap: 20px;
  justify-content: center;
  

@media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  width: 100%;
  background: white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;

  img{
    width: 100%;
    flex: 1;
    border-radius: 15px;
  }

  :hover{
    div{
      opacity: 1;
      background: rgba(0,0,0, .7);
    }
  }
`;

export const CardInfo = styled.div`
  width: 100%;
  height: 100%;
  transition: .3s;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button{
    width: 200px;
    height: 50px;
    background: ${styles.dest2Components};
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    margin-top: 10px;
  }
  
`;

export const Footer = styled.footer`
  background: ${styles.bgColor};
  width: calc(100vw - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  

  .Footer-Container{
    display: grid;
    flex-direction: row;
    grid-template-columns: repeat(4, 1fr);
    padding: 50px 0px;
    grid-gap: 20px;
    width: 100%;

    @media(max-width: 800px){
      grid-template-columns: 1fr;
      padding: 0px 10px;
    }
    
  }
  
  p{
    margin: 20px 0px;
    color: ${styles.fontColorDest}
  }

  ul{
    li{
      color: ${styles.fontColor};
      padding: 5px 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
`;

export const Logo = styled.div`
  width: 100%;
  background-color: white;
  height: 150px;
`;

export const Rights = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;

  .Rights-Container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    @media(max-width: 800px){
      flex-direction: column;
    }

    .Redes-Sociais-Footer{
      width: 100px;
    }
  }
`;

