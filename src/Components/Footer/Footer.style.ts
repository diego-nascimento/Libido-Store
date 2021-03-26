import styled from 'styled-components'
import { styles } from '../../styles/styles';


export const FooterContainer = styled.footer`
  background: ${styles.componentsDest};
  width: calc(100vw - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  

  .Footer-Container{
    display: grid;
    flex-direction: row;
    grid-template-columns: repeat(4, 1fr);
    padding: 50px 0px;
    grid-gap: 20px;
    width: 100%;

    @media(max-width: 800px){
      grid-template-columns: 1fr;
      padding: 0px 10px;
    }
    
  }
  
  p{
    margin: 20px 0px;
    color: ${styles.fontColorInDark}
  }

  ul{
    li{
      color: ${styles.fontColorInDark};
      padding: 5px 0px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
`;

export const Logo = styled.div`
  width: 100%;
  background-color: white;
  height: 150px;
`;

export const Rights = styled.section`
  width: 100vw;
  display: flex;
  justify-content: center;
  color: ${styles.fontColorInDark};

  .Rights-Container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;

    @media(max-width: 800px){
      flex-direction: column;
    }

    .Redes-Sociais-Footer{
      width: 100px;
    }
  }
`;