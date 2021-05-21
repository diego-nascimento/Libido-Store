import styled from 'styled-components'
import { styles } from '../../styles/styles';


export const Wrapper = styled.section`
  padding: 20px 20px;
  width: calc(100% - 20px);

  h1{
    text-transform: uppercase;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor};
    padding-bottom: 10px;
  }


  @media(max-width:800px){
    width: 100%;
    padding: 100px 10px;
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
    grid-gap: 10px;
  }
`



export const SideBar = styled.aside`
  width: 100%;
  height: 100%;
  border: 1px solid ${styles.dest2Components};
  padding: 10px 10px;

  .block{  
    h2{
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    ul{
      padding: 10px 0px;
      width: 100%;
      height: 100%;
      li{
        width: 100%;
        padding: 10px 0px;
        list-style: square;
        transition: .5s;
        border-bottom: 1px solid ${styles.componentsDest};
        list-style: none;

        :hover{
          opacity: .7;
        }
      }
    }

  }

`;

