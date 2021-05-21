import styled from 'styled-components'
import { styles } from '../styles';


export const Wrapper = styled.section`
  padding: 10px 10px;
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1{
    text-transform: capitalize;
    letter-spacing: 1px;
    color: ${styles.fontColor};
    margin: 0px;
  }

  .voltar{
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    cursor: pointer;
  }
`;

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;


  .imageContainer{
    width: 100%;


    img{
      width: 100%;
    }
  }

  .info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    .preco{
      margin-top: 20px;
      h2{
        font-size: 1.3rem;
      }
    }

    .descricao{
      margin-top: 20px;
    }

    .prontaEntrega{
      color: ${styles.componentsDest};
      font-size: 1.6rem;
      width: 100%;
    }

  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

export const DescricaoContainer = styled.section`
  color: ${styles.fontColorInDark};


  .ContainerEspec{
    border-top: 1px solid ${styles.componentsDest};
    padding-top: 10px;
    

    img{
      
      width: 300px;
    }
  }
`;
