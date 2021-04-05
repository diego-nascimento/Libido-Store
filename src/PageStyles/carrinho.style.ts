import styled from 'styled-components'
import { styles } from '../styles/styles';

export const Wrapper  = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 10px;

  h1{
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
`;

export const Container  = styled.div`
  width: 100%;
  height: 100%;
`;

export const ProdutosContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  
  .AsideTotal{
    background: ${styles.componentsDest};
    color: ${styles.fontColorInDark};
    padding: 20px;
    border-radius: 15px;
    justify-self: center;
    width: 100%;
    align-self: flex-start;

    h2{
      font-size: 1.3rem;
    }

    @media(max-width: 800px){
      width: 100%;
    }
  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${styles.componentsDest};
  border-bottom: 1px solid ${styles.componentsDest};
  user-select: none; 
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;

  img{
    width: 100%;
  }
`;

export const InfoContainer = styled.div`
  padding-left: 20px; 
  display: grid;
  grid-template-columns: 4fr 1fr;
  width: 100%;

  .Left{
    width: 100%;
    

  }

  .Right{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    .Quantidade{
      display: flex;
      flex-direction: column;
      align-items: center;

      b{
        padding: 5px 10px;
        background: ${styles.fontColorInDark};
        color: ${styles.fontColorDest};   
        user-select: none; 
      }

      svg{
        margin: 10px;
        cursor: pointer;
        width: 15px;
        height: 15px;
      }
    }
  }

  .Pronta{
    font-size: .9rem;
  }

  h2{
    margin: 10px 0px;
  }
`;

export const BotaoFinalizar = styled.button`
  width: 100%;
  padding: 15px 50px;
  text-transform: uppercase;
  background: ${styles.componentsColor};
  border: none;
  color: ${styles.fontColorDest};
  font-weight: 700;
  margin: 20px 0px;
  letter-spacing: 1px;
  border-radius: 15px;
`;

