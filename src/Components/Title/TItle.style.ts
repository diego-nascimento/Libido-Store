import styled from 'styled-components'
import { styles } from '../../styles/styles'

export const Container = styled.div`
  padding: 10px 0px;
`
export const TitleText = styled.h1`
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.7rem;
  letter-spacing: 1px;
  color: ${styles.componentsDest};

  ::first-letter{
    font-size: 2rem;
    color: ${styles.componentsColor};

  }

  @media(max-width: 800px){
    font-size: 2rem;

    ::first-letter{
      font-size: 1.7rem;
    }
  }

  @media(max-width: 500px){
    font-size: 1.3rem;
  }
`
