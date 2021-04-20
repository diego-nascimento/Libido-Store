import styled from 'styled-components'
import { styles } from '../styles/styles';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Formulario = styled.form`
  width: 100%;
  max-width: 400px;

  p{
    color: ${styles.componentsDest};
    padding: 0px;
    margin: 10px 0px;
    font-weight: bold;
  }

  input{
    align-self: stretch;
    background: white;
    color: ${styles.componentsDest};
    
    ::placeholder{
     color: ${styles.componentsDest};
    }
  }
`;

export const Botao = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 15px;
  margin-top: 20px;
  background: ${styles.componentsDest};
  color: ${styles.fontColorInDark};
  font-size: 1.2rem;

  svg{
    font-size: 1.2rem;
  }
`;

export const ContainerLinks = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-around;

`;