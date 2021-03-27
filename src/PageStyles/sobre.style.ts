import styled from 'styled-components'


import { styles } from '../styles/styles';


export const SobreContainer = styled.section`
  width: 100vw;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${styles.componentsColor};

  h1{
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor}
  }

`;