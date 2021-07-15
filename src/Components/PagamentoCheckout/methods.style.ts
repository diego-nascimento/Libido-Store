import styled from 'styled-components'
import { styles } from '../../styles/styles'

export const Container = styled.div`
  width: 100%;
`

export const Content = styled.div`
  padding: 15px 0px;
  border-bottom: 1px solid #ccc;

  span{
    font-size: 1.1rem; 
    :first-child{
      color: ${styles.componentsDest};
    }
    :last-child{
      color: #555;
    }
  }
`

export const Warning = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
  justify-content: center;
  padding: 25px 0px;
  border-bottom: 1px solid #ccc;


  svg{
    height: 80px;
    width: 80px;
    margin: 0px;
    padding: 0px;
  }
`

export const TextContainer = styled.div`
  margin-left: 10px;

  h2{
    font-size: 1.5rem;
    text-transform: uppercase;
  }

  li{
    list-style: circle;
    font-size: .9rem;
    padding: 0px;
    margin: 0px;
  }
`
