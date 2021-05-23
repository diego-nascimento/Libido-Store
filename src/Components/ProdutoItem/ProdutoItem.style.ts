import styled from 'styled-components'
import { styles } from '../../styles/styles';

interface ICard{
  Visible: boolean
  Loaded: boolean
}

interface ICard{
  width?: string
}

export const Card = styled.div<ICard>`
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  width: ${props => props.width? props.width: '100%'};
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  height: 100%;
  margin: 0 auto;

  .info{
    background: transparent;
    width: 100%;
    padding: 10px 10px;
    height: 100%;
    color: ${styles.componentsDest};
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img{
    width: 100%;
    transition: .1s;
  }

  h2{
    letter-spacing: 1px;
    text-align: left;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 1rem;
  }

  b{
    font-size: 1.1rem;
  }

  :hover{
    border: 1px solid #eee;
    border-bottom: 1px solid #aaa; 
    
    
    img{
      transform: scale(1.1);
    }
  }

@media(max-width: 800px){
  h2{
    
    font-size: .9rem;
  }

  b{
    font-size: 1rem;
  }

  img{
    height: auto;
  }
}
`;

export const ImagemContainer = styled.div`

`;
