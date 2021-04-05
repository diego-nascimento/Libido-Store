import styled from 'styled-components'
import { styles } from '../../styles/styles'


export const InputComponent = styled.input`
   width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 15px;
  background-color: ${styles.componentsDest};
  border: none;
  font-size: .9rem;
  margin: 5px 0px;
  color: ${styles.fontColorInDark};

  ::placeholder{
    color: ${styles.fontColorInDark};
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  p{
    color: ${styles.componentsDest};
    font-size: .9rem;
  }
`;
 
