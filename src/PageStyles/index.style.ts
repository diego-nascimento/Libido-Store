import styled from 'styled-components'
import { styles } from '../styles/styles'


export const Header = styled.header`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  background-size: center;
  height: 100vh;
  overflow-y: hidden;
  background-image: url('MainPanel.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  
  @media  (max-width: 800px){
    height: 500px;
  }
`;


export const Banner = styled.section`
width: 100vw;
background: #311F2B;
display: flex;
justify-content: center;
padding: 50px 0px;


p{
    text-align: left;
    line-height: 2rem;
    letter-spacing: 1px;
}

.Container{
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;

  h2{
    font-size: 1.5rem;
    text-transform: capitalize;
  }

  h2, p{
    display: flex;
    align-items: center;
    color: ${styles.fontColorInDark};
  }

  @media  (max-width: 800px){
    grid-template-columns: 1fr;
    padding: 30px 20px;

    h2{
      font-size: 1.2rem;
    }
    p{
      font-size: .6rem;
      line-height: 1.2rem;
    }
  }
}
`;

export const TextContainer = styled.div`
  width: 100%;
`;

export const Categorias = styled.section`
  width: 100vw;
  padding:  50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  width: calc(100% - 20px);

  a{
    display: flex;
    justify-content: center;
  }

@media  (max-width: 800px){
    width:90%;
  }
`;

export const Card = styled.div`
  width: 80%;
  background: white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
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

`;

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
`;


