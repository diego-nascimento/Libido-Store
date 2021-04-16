import styled from 'styled-components'
import { styles } from '../../styles/styles';

interface ICard{
  Visible: boolean
}

export const Card = styled.div<ICard>`
width: 100%;
display: flex;
position: relative;
justify-content: center;
flex-direction: column;
align-items: center;
border-radius: 15px;
overflow: hidden;
height: 100%;
transform: ${props => props.Visible ? 'scale(.95) translateY(-40px)' : 'scale(.95) translateY(0px)' };
opacity: ${props => props.Visible ? '1' : '0'};
transition: .5s;

.info{
  background: ${styles.componentsColor};
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