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

export const PagamentoContainer = styled.div``
