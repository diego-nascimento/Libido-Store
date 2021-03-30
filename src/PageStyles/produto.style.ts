import styled from 'styled-components'
import { styles } from '../styles/styles';


export const Wrapper = styled.section`
  padding-top: 80px;
  width: calc(100% - 20px);
  display: flex;
  justify-content: center;
  flex-direction: column;

  h1{
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${styles.fontColor}
    margin: 0px;
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

    span, p, a{
      font-size: .8rem;
    }

    .preco{
      margin-top: 20px;
    }


  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`;

export const DescricaoContainer = styled.section`
  color: ${styles.fontColorInDark}
`;
