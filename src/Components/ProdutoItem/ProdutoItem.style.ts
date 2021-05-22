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
border-radius: 15px;
overflow: hidden;
height: 100%;
transition: .5s;
margin: 0 auto;
border: 1px solid #aaa;

.info{
  background: #eee;
  width: 100%;
  padding: 20px 10px;
  height: 100%;
  color: ${styles.componentsDest};
  display: flex;
  flex-direction: column;
}

img{
  width: 100%;
}

h2, p, b{
  padding: 5px 0px;  
}

h2{
  letter-spacing: 1px;
  text-align: left;
  text-transform: capitalize;
  font-weight: 400;
}

@media(max-width: 800px){
  img{
    height: auto;
  }
}
`;

export const ImagemContainer = styled.div`

`;