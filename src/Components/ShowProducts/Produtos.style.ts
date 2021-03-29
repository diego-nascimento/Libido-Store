import styled from 'styled-components'
import { styles } from '../../styles/styles';


export const ProdutosContainer = styled.section`
  width: 100vw;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1{
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 1px;
    align-self: center;
    color: ${styles.fontColor}
  }

`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  width: calc(100% - 20px);
  align-items: center;

@media  (max-width: 800px){
    grid-template-columns: 1fr;
    width:100%;
  }
`;

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

  .info{
    background: ${styles.componentsColor};
    width: 100%;
    padding: 20px 10px;
    color: ${styles.componentsDest};
    border: 1px solid ${styles.componentsDest};
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  img{
    width: 100%;
    flex: 1;
  }

  h2, p, b{
    padding: 5px 0px;  
  }

  h2{
    font-size: 1.4rem;
    letter-spacing: 1px;
    text-align: center;
  }

  p{
    font-size: 1rem;
    line-height: 1.5rem;
  }

  b{
    font-size: 1.2rem;
  }
`;