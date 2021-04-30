import styled from 'styled-components'
import { styles } from '../styles';
import {ImageShowUp} from '../Keyframes'


export const SobreContainer = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 100px 20px;
  align-items: center;
  background-image: linear-gradient(to bottom,  #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6, #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6,#eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6);

  h1{
    text-transform: uppercase;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor};
    text-shadow: 0px 4px 5px rgba(0,0,0, .6);
    font-size: 2rem;
  }

`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  img{
    width: 30%;
    animation: ${ImageShowUp({opacity: .9})} .5s forwards;
  }  
`;

export const InfoContainer = styled.section`
  width: 100%;
  text-align: left;

  p{
    letter-spacing: 1px;
    line-height: 1.8rem;
    color: ${styles.fontColorDest};
    font-size: 1.5rem;
  }

  
  @media (max-width: 800px){
    h1{
      font-size: 1.2rem;
      line-height: 1.6rem;
    }
    p{
      letter-spacing: 1px;
      font-size: .8rem;
      line-height: 1.2rem;
    }
  }
`;