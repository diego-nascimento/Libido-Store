import styled from 'styled-components'
import { styles } from '../../styles/styles'
type ContainerType = {
  open: boolean
}

export const Container = styled.div<ContainerType>`
  width: 100vw;
  padding: 5% 5%;
  display: ${({ open }) => open ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 999;
  background-color: ${styles.fontColor};
  flex-direction: column;
`

export const Text = styled.h2`
  color: ${styles.fontColorInDark};
  text-align: center;
`

export const Botao = styled.button`
  background-color: ${styles.fontColorInDark};
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: bold;

`
