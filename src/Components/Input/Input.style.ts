import styled from 'styled-components'
import { styles } from '../../styles/styles'


interface IContainer{
  borderColor?: string | null
}

export const Container = styled.div<IContainer>`
  display: flex;
  flex-direction: column;

  p{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #a00;
    font-size: .7rem; 
  }

  input{
    width: 100%;
    height: 40px;
    padding: 10px;
    border-radius: 15px;
    background-color: ${styles.componentsDest};
    border: 1px solid ${props => props.borderColor !== null? styles.fontColorInDark: 'none'};
    font-size: .9rem;
    margin: 5px 0px;
    color: ${styles.fontColorInDark};

    ::placeholder{
      color: ${styles.fontColorInDark};
    }
  }
`;
 
