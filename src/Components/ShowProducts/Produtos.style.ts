import styled from 'styled-components'
import { styles } from '../../styles/styles';


export const Wrapper = styled.section`
  padding: 100px 20px;
  width: calc(100% - 20px);

  h1{
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor}
  }
`;

export const ProdutosContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 20px;

  @media(max-width: 1100px){
grid-template-columns: 1fr;
  }
`;


export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  
  align-items: center;

  @media only screen and (max-width: 1200px){
    grid-template-columns: repeat(2, 1fr);
  }
`

export const Card = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  overflow: hidden;
  color: ${styles.fontColorInDark};
  height: 100%;

  .info{
    background: ${styles.componentsDest};
    width: 100%;
    padding: 20px 10px;
    color: ${styles.fontColorInDark};
  }

  img{
    width: 100%;
    flex: 1;
  }

  h2, p, b{
    padding: 5px 0px;  
  }

  h2{
    letter-spacing: 1px;
    text-align: center;
  }  
`;


export const SideBar = styled.aside`
  width: 100%;
  height: 100%;
  border: 1px solid ${styles.dest2Components};

  .block{
    border-bottom: 1px solid rgba(0,0,0, .5);

    h3{
      text-decoration: underline;
    }

    ul{
      padding: 10px 20px;
      li{
        padding: 10px 0px;
        list-style: square;
        transition: .5s;

        :hover{
          opacity: .7;
        }
      }
    }
  }

`;

