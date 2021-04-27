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
    background-color: #ddd;
    border: none;
    font-weight: 500;
    font-size: .9rem;
    margin: 5px 0px;
    color: ${styles.componentsDest};

    ::placeholder{
      color: ${styles.componentsDest};
    }
  }
`;
 
