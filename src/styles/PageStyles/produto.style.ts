import styled from 'styled-components'
import { styles } from '../styles'

export const Wrapper = styled.section`
  padding: 30px 10px;
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
`

export const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
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
    position: relative;

    h1{
      font-weight: bold;
      font-size: 1.8rem;
      line-height: 2.2rem;
    }

    .preco{

      b{
        color: #444;
        font-size: 1.3rem;
      }

      h2{
        font-size: 2rem;
        margin-top: 5px;
      }
    }

    .descricao{
      margin-top: 20px;
      
      p{
        line-height: 1.6rem;
      }
    }

    .prontaEntrega{
      color: ${styles.componentsDest};
      font-size: 1.6rem;
      width: 100%;
    }
  }
  @media(max-width: 1000px){
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`

export const Tag = styled.h2`
  padding: 5px 10px;
  border: 1px solid #111;
  font-size: 1rem;
  border-radius: 1px;
  user-select: none;
  position: absolute;
  top: -45px;
  right: 0px;

  @media(max-width: 1000px){
    position: static;
  }
`

export const ContainerPreco = styled.div`
  width: 100%;
  border: 1px solid #555;
  padding: 10px 20px;
  justify-self: flex-end;
  margin-top: 30px;

  .BotoesContainer{
    display: flex;
    flex-direction: column;
    margin-top: 10px;
  
    button{
      margin-top: 30px;
      padding: 15px 10px;
      margin: 10px 0px;
      font-size: .8rem;
      font-weight: 500;
    }
  }
`

export const DescricaoContainer = styled.section`
  color: #555;
  text-align: center;

  p{
    margin: 0px;
  }
  h2{
    font-size: 1.5rem;
    text-align: left;
    color: #111;
  }

  .ContainerEspec{
    border-top: 1px solid ${styles.componentsDest};
    padding-top: 10px;
    img{
      width: 300px;
    }
  }
`
