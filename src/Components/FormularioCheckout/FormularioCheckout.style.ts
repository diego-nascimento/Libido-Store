import styled from 'styled-components'
import { styles } from '../../styles/styles'

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

  input{
    border: 1px solid ${styles.componentsColor};
    background-color: ${styles.fontColorDest};
  }

`

type ISelectEstado = {
  show: boolean
}

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
    border: 1px solid ${styles.dest2Components};
    font-weight: 500;
    font-size: .9rem;
    color: ${styles.fontColorDest};

  }
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
