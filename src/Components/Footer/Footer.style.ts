import styled from 'styled-components'
import { styles } from '../../styles/styles'

export const FooterWrapper = styled.footer`
  width: 100vw;
  background-color: ${styles.componentsDest};
  display: flex;
  align-items: center;
  color: #ccc;
  flex-direction: column;

`

export const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas:"aside FooterMain Infos" "aside FooterMain Infos" ;
  padding: 30px 0px;

  @media(max-width: 1300px){
    margin: 0px 20px;
  }

  @media(max-width: 800px){
    display: flex;
    flex-direction: column;
    padding: 30px 20px;

    p{
      font-size: .7rem;
    }
  }
`

export const FooterAside = styled.aside`
  grid-area: aside;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  h2{
    font-size: 1rem;
    letter-spacing: 1px;;
    text-transform: uppercase;
  }

  @media(max-width: 800px){
    margin-bottom: 20px;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 20px;
`

export const Info = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h2{
    font-size: .9rem;
    margin: 0px;
  }

  p{
    font-size: .8rem;
    opacity: .7;
    padding: 0px;
    margin: 0px;
  }
`

export const RedesSociais = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;

  a{
    margin-left: 10px;
    :first-child{
      margin-left: 0px;
    }
  }
`

export const SVGContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  padding: 5px;
  background-color: #ccc;
 
  border-radius: 50%;
  svg{
    font-size: 25px;
    color: ${styles.componentsDest};  
  }
`

export const FooterMain = styled.main`
  grid-area: FooterMain;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  h2{
    font-size: 1rem;
    letter-spacing: 1px;;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  
  a{
    color: #fff; 
    margin: 0px;
    padding: 0px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 5px 0px;
  }

  p{
    opacity: .7;
    padding: 0px;
    margin: 0px;
  }

  @media(max-width: 800px){
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    align-items: flex-start;
    border-top: 1px solid #ccc;
  }
`

export const ContainerFooterMain = styled.div`

`
export const FooterRightSide = styled.aside`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;


  @media(max-width: 800px){
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    align-items: flex-start;
    border-top: 1px solid #ccc;
  }
`

export const ContainerPagarme = styled.div`
  background-color: white;
  padding: 10px;
  position: relative;
  margin-bottom: 10px;

  p{
    color: #111;
    font-size: .55rem;
    position: absolute;
    top: 5px;
  }
  img{
    width: 130px;
  }
`

export const FooterBottom = styled.div`
  height: 60px;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: ${styles.componentsDest};
`

export const ContainerFooterBoottom = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px 20px;
`

export const ContainerBandeiras = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 5px;
  
  img{
    width: 140px;
    border: 3px solid white;
  }
`
