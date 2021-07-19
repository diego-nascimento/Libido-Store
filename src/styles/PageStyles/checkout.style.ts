import styled from 'styled-components'
import { styles } from '../styles'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 10px;

  @media(max-width: 800px){
    width: calc(100% - 20px);
  }
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
`

export const CheckoutContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-gap: 20px;
  justify-content: center;
  
  .AsideTotal{
    background: #ddd;
    color: ${styles.componentsDest};
    padding: 20px;
    border-radius: 15px;
    justify-self: center;
    width: 100%;
    align-self: flex-start;

    .TitleResume{
      font-size: 1.4rem;
      border-bottom: 1px solid #aaa;
      padding-bottom: 10px;
      font-weight: bold;
    }

    @media(max-width: 800px){
      width: 100%;
    }
  }

  @media(max-width: 800px){
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  width: 100%;
  display: flex;
  border-top: 1px solid ${styles.componentsDest};
  border-bottom: 1px solid ${styles.componentsDest};
  user-select: none; 
  align-items: center;
`
interface IImageContainer {
  smallSize: boolean
}

export const ImageContainer = styled.div<IImageContainer>`
  width: ${props => props.smallSize ? '60px' : '120px'};
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;

  img{
    width: 100%;
  }
`

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
`

export const BotaoFinalizar = styled.button`
  width: 100%;
  padding: 15px 50px;
  text-transform: uppercase;
  background: ${styles.componentsDest};
  border: none;
  color: #eee;
  font-weight: 700;
  margin: 20px 0px;
  letter-spacing: 1px;
  border-radius: 15px;
`

export const CardData = styled.div`
  margin: 0px 0px 10px;
  background: ${styles.componentsDest};
  color: ${styles.fontColorInDark};
  padding: 10px;
  border-radius: 15px;
`

export const Aside = styled.div`
  align-self: flex-start;
`

export const ContainerInfoCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

export const ProdutosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ProdutosContainer = styled.ul`
  width: 100%;
`

export const Produto = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-top: 1px solid #aaa;
  padding: 10px 0px;
  margin: 0px;

  :first-child{
    border-top: none;
    padding-top: 0px;
  }

  :last-child{
    border-bottom: 1px solid #aaa;
  }
`

export const ProdutoInfoContainer = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0px 0px 0px 10px;
  margin: 0px;

  p{
    font-size: .7rem;
    line-height: 1.1rem;
    text-transform: capitalize;
    margin: 0px;
    padding: 0px;
  }
`

export const ContainerResume = styled.div`

  h1{
    font-size: 1.2rem;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
  }

  h2{
    font-size: 1rem;
  }
`

export const ContainerInformation = styled.div`
  margin-top: 20px;
  .titulo{
    margin: 0px;
    padding: 0px;
  }
`

export const Produtos = styled.ul`
  display: flex;
  flex-direction: column;
`

export const ProdutoInfo = styled.li`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  border: 1px solid #ccc;
  padding: 10px 5px;
  text-transform: capitalize;
  align-items: center;

  span{
    :nth-child(2){
      margin-left: 20px;
    }
    :last-child{
      display: flex;
      justify-content: flex-end;
      padding: 0 10px;
      border-left: 1px solid #ccc;
    }
  }
`

export const ProdutoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  h2{
    margin-left: 10px;
  }
`

export const ImageContainerSucesso = styled.div`
  width: 40px;

img{
  width: 100%;
}
`

export const ContainerBaixo = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
  margin-top: 30px;

  @media(max-width: 800px){
    grid-template-columns: 1fr;
    margin-top: 0px;
  }
`

export const ContainerFrete = styled.div`
  .FreteInfo{
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    padding: 10px 10px;

    .top{
      display: flex;
      flex-direction: column;
      align-items: center;

      svg{
        height: 50px;
        width: 50px;
        color: ${styles.bgColor}
      }

      span{
        margin: 10px 0px;
      }
    }

    .bottom{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 10px 0px;
      border-top: 1px solid #ccc;

      span{
        margin: 0px;
        padding: 0px;
      }
    }
  }
`

export const ContainerPagamento = styled.div`

  .ContainerInformacoes{
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }

  .Pagamento{
    display: flex;
    flex-direction: column;
    padding: 15px 10px;
    align-items: center;
    justify-content: center;
    width: 100%;

    svg{
      height: 80px;
      width: 80px;
    }

    span{
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .Informacoes{
    padding: 15px 10px;
    border-left: 1px solid #ccc;

    p{
      margin: 0px;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`

export const WrapperSucesso = styled.div`
  margin: 50px 0px;
  

  h1{
    :first-child{
      margin-bottom: 30px;
    }
  }

  .Subtitulo{
    margin-bottom: 50px;
    font-size: 1.3rem;
    font-weight: 500;
  }

  @media(max-width: 800px){
    padding: 0px 20px;

    h1{
      :first-child{
        margin-bottom: 15px;
        font-size: 1.4rem;
      } 
    }
    .Subtitulo{
    margin-bottom: 15px;
    font-size: 1.1rem;
    font-weight: 500;
    }
  }
`
