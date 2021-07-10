import styled from 'styled-components'
import { styles } from '../styles'

export const Header = styled.header`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  letter-spacing: 1px;
  background-size: center;
  overflow-y: hidden;
  background-image: url('MainPanel.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: ${styles.bgColor};
  position: relative;
`

export const Banner = styled.section`
  width: 100vw;
  background: #330c0f;
  padding: 30px 0px;
  margin-bottom: 30px;
`

export const TextContainer = styled.div`
  width: 100%;
`

export const Categorias = styled.section`
  width: 100vw;
  padding:  50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Container = styled.div`
  display: grid; 
  grid-template-columns: 1fr 2fr 1fr; 
  grid-template-rows: 1fr 1fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "left-top meio right-top"
    "left-bottom meio right-bottom"; 
  grid-gap: 20px;
  width: calc(100% - 20px);

  a{
    display: flex;
    justify-content: center;

    :nth-child(1){
      grid-area: meio;
      height: 100%;
    }

    :nth-child(2){
      grid-area: left-top;
    }

    :nth-child(3){
      grid-area: left-bottom;
    }

    :nth-child(4){
      grid-area: right-bottom;
    }

    :nth-child(5){
      grid-area: right-top;
    }
  }

@media  (max-width: 800px){
    width:90%;
  }
`

export const Card = styled.div`
  width: 100%;
  background: white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  color: ${styles.fontColorInDark};
  flex-direction: column;
  background-color: ${styles.fontColor};


  img{
    width: 100%;
    flex: 1;
    height: 100%;
  }

  h2{
    padding: 10px 0px;
  }

  @media  (max-width: 800px){
    width:100%;
  }

`

export const CardInfo = styled.div`
  width: 100%;
  height: 100%;
  transition: .3s;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button{
    width: 200px;
    height: 50px;
    background: ${styles.componentsColor};
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    margin-top: 10px;
  }
`
