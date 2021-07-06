import styled from 'styled-components'
import { styles } from '../styles'
import { ImageShowUp } from '../Keyframes'

export const SobreContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  align-items: center;
  justify-content: flex-start;

  h1{
    text-transform: uppercase;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor};
    text-shadow: 0px 4px 5px rgba(0,0,0, .6);
    font-size: 2rem;
  }

`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  :nth-child(even){
    direction: rtl;
  }

  @media(max-width: 500px){
    grid-template-columns: 1fr;
  }
`

export const InfoContainer = styled.section`
  width: 100%;
  text-align: left;
  direction: ltr;

  p{
    margin-top: 20px;
    letter-spacing: 1px;
    line-height: 2rem;
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
`

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img{
      width: 80%;
      animation: ${ImageShowUp({ opacity: 0.9 })} .5s forwards;
  }  

  @media(max-width: 500px){
    img{
      width: 50%;
    }
  }
`
