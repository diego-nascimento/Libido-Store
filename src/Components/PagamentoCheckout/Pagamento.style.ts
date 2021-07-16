import styled from 'styled-components'
import { styles } from '../../styles/styles'

export const Container = styled.div`
  width: 100%;
`

export const EnderecoContainer = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  padding: 10px 10px;
  border-radius: 5px;
  margin-top: 50px;

  .Editar{
    color: ${styles.componentsDest};
    cursor: pointer;
    height: 30px;
    padding: 5px;

    :hover{
      text-decoration: underline;
    }
  }

  h4{
    font-size: 1.1rem;
    color: ${styles.componentsDest};
  }

  p{
    padding: 0px;
    margin: 0px;
    font-size: .7rem;
    line-height: 1.1rem;
  }
`

export const EntregaInformation = styled.div`
  border-top: 1px solid #ccc;
  padding: 10px 0px;
  width: 100%;
`
export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`
export const Endereco = styled.div``
export const ClientInformation = styled.div``

export const PagamentoWrapper = styled.div`
  margin-top: 20px;
`

export const PagamentoContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 3fr;

  @media(max-width: 1000px){
    grid-template-columns: 1fr;
  }
`

export const MethodsContainer = styled.ul`
`

interface IMethod {
  selected: boolean
}

export const Method = styled.li<IMethod>`
  width: 100%;
  border: 1px solid #000;
  border-right: none;
  padding: 15px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
  background: ${props => props.selected ? '#ddd' : 'white'};
  transition: .3s;
  cursor: pointer;

  :first-child{
    margin-top: 0px;
  }

  span{
    margin-left: 10px
  }

  @media(max-width: 1000px){
    grid-template-columns: 1fr;
    border-right: 1px solid #000;
  }
`

export const WrapperPayment = styled.div`
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
`

export const PaymentHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #ccc;
  

  h2{
    font-size: 1.3rem;
    font-weight: bold;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styled.button`
  width: 200px;
  font-size: 1.2rem;
  padding: 10px 20px;
  background-color: ${styles.componentsDest};
  border-radius: 15px;;
  border: none;
  color:white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:15px;
  cursor: pointer;
`

export const CardInfoContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;

  @media(max-width: 1200px){
    flex-direction: column;
  }
`

export const FormularioContainer = styled.div`
  width: 100%;
  margin-left: 15px;

  @media(max-width: 1200px){
    margin-left: 0px;
    margin-top: 15px;
  }

  input{
    width: 100%;
    margin-top: 10px;
    padding: 5px 5px;
    border-radius: 5px;
    border: 1px solid #aaa;
    font-size: .9rem;
    color: ${styles.componentsDest};

    :first-child{
      margin-top: 0px;
    }
  }
`
