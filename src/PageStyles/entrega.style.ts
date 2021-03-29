import styled from 'styled-components'
import { styles } from '../styles/styles';
import {ImageShowUp} from '../styles/Keyframes'


export const SobreContainer = styled.section`
  width: 100vw;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${styles.componentsColor};
  align-items: center;
  background-image: linear-gradient(to bottom,  #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6, #eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6,#eba5a6, #e4a0a1, #de9b9c, #d79697, #d19192, #d19192, #d19192, #d19192, #d79697, #de9b9c, #e4a0a1, #eba5a6);

  h1{
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor};
    text-shadow: 0px 14px 19px #e4a0a1;
  }

  
  @media only screen and  (max-width: 800px){
    padding: 50px 10px;

    h1{
      font-size: 1.6rem;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  img{
    width: 400px;
    animation: ${ImageShowUp({opacity: .7})} .5s forwards;
  }

  
`;

export const InfoContainer = styled.section`
  width: 100%;
  text-align: left;

  p{
    font-size: 2.2rem;
    letter-spacing: 1px;
    line-height: 3rem;
    color: ${styles.fontColorDest};
  }

  
  @media only screen and  (max-width: 800px){


    p{
    font-size: 1.6rem;
    letter-spacing: 1px;
    line-height: 3rem;
    
  }
  }
`;