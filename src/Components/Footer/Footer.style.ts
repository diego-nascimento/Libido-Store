import styled from 'styled-components'
import { styles } from '../../styles/styles';


export const FooterContainer = styled.footer`
  background: ${styles.componentsDest};
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  

  .Footer-Container{
    display: flex;
    justify-content: space-around;
    width: 100%;
    display: flex;
    justify-content: center;
    
    .Grid-Container{
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      a{
        color: ${styles.fontColorInDark};

        :hover{
          color: ${styles.componentsColor};
        }
      }
    }

    @media  (max-width: 800px){
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

    @media  (max-width: 800px){
      flex-direction: column;
    }

    .Redes-Sociais-Footer{
      width: 100px;

      svg{
        color: ${styles.fontColorInDark};

        :hover{
          color: ${styles.componentsColor};
        }
      }
    }
  }
`;