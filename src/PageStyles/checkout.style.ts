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

export const Formulario = styled.form`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  
  .Endereco{
    display: grid;
    grid-template-columns: 1fr 150px;
    grid-gap: 10px;
  }

  select{
    height: 40px;
    padding: 10px;
    border-radius: 15px;
    background-color: #ddd;
    border: none;
    font-weight: 500;
    font-size: .9rem;
    margin: 5px 0px;
    color: ${styles.componentsDest};
  }
`;


export const PaymentMethods = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 30px 0px;

`;


export const ListMethods = styled.ul`
  display: flex;
  flex-direction: row;
`;



interface IMethods{
  option: number
}

export const Methods = styled.li<IMethods>`
  width: 100%;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: 1px solid ${styles.componentsDest};
  background: ${styles.componentsDest};
  color: ${styles.fontColorInDark};
  margin: 0px 5px;
  transition: .4s;
  cursor: pointer;

  :nth-child(${props => props.option + 1}){
    opacity: .8;
  }
`


export const CardInformations = styled.div`
  
`;

export const FormularioCard = styled.div`
  
`
export const CardData = styled.div`
  margin: 0px 0px 10px;
  background: ${styles.componentsDest};
  color: ${styles.fontColorInDark};
  padding: 10px;
  border-radius: 15px;
`;

export const Aside = styled.div`
  align-self: flex-start;
`;


export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;

  p{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #a00;
    font-size: .1.2rem; 
  }
`;
