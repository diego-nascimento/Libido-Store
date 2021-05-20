import styled from 'styled-components'
import { styles } from '../../styles/styles'


<<<<<<< HEAD
export const InputComponent = styled.input`
   width: 100%;
  height: 40px;
  padding: 10px;
  border-radius: 15px;
  background-color: #ddd;
  border: none;
  font-size: .9rem;
  font-weight: 500;
  margin: 5px 0px;
  color: ${styles.componentsDest};

  ::placeholder{
    color: ${styles.componentsDest};
  }
`

export const Container = styled.div`
  display: flex;
=======
interface IContainer{
  borderColor?: string | null
  show?: boolean
  readOnly?: boolean
}

export const Container = styled.div<IContainer>`
  display: ${props => props.show === true ? 'flex' : 'none'};
>>>>>>> pagamentos
  flex-direction: column;
  width: 100%;
   

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
    background-color: ${props => props.readOnly === true ? styles.componentsDest: '#ddd' };
    border: none;
    font-weight: 500;
    font-size: .9rem;
    margin: 5px 0px;
    color: ${props => props.readOnly === true ? styles.fontColorInDark : styles.componentsDest};
    cursor: ${props => props.readOnly === true ? 'default' : 'text'};

    ::placeholder{
      color: ${styles.componentsDest};
    }
  }
`;
 
