import styled from 'styled-components'
import { styles } from '../styles'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 10px;

  h1{
    font-size: 1.8rem;
    margin-bottom: 20px;
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
  margin-top: 30px;
  
  .AsideTotal{
    background: ${styles.componentsColor};
    color: ${styles.componentsDest};
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

interface IFormulario{
  show: boolean
}

export const Formulario = styled.form<IFormulario>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0px;
  padding: 0px;
  
  .Endereco{
    display: grid;
    grid-template-columns: ${props => props.show ? '1fr 150px' : '1fr'};
    grid-gap: 10px;
  }

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

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;

  p{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #a00;
    font-size: .1.2rem; 
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
`

export const ContainerInfoCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`

export const SelectEstado = styled.select<ISelectEstado>`
  margin: 10px 0px;
  width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ddd;
  border: none;
  font-weight: 500;
  font-size: .9rem;
  color: ${styles.componentsDest};
  display: ${props => props.show === true ? 'flex' : 'none'};

`

export const ContainerCep = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 100px;
  align-items: center;
  grid-gap: 20px;
  
  button{
    height: 40px;
    border-radius: 5px;
    background-color: #ddd;
    border: none;
    font-weight: 500;
    font-size: .9rem;
    color: ${styles.componentsDest};
  }
`

export const ProdutosWrapper = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 15px;
`

export const ProdutosContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Produto = styled.li`
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  img{
    width: 100%;
  }
`

export const ProdutoInfoContainer = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  p{
    font-size: .7rem;
    line-height: 1.1rem;
    text-transform: capitalize;
  }
  
`
