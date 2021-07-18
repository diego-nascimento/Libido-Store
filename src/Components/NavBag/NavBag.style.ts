import styled from 'styled-components'
import { styles } from '../../styles/styles'

export const Wrapper = styled.div`
  width: 100vw;
  background: ${styles.componentsColor};
  display: flex;
  justify-content: center;

  @media(max-width: 1400px){
    padding: 0px 20px;
  }
`

export const ContainerNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  cursor: pointer;
  min-height: 60px;
  padding: 10px 0px;
  cursor: default;
  

  @media(max-width: 800px){
    flex-direction: column;
    
  }
`
