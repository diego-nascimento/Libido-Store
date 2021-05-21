import styled from 'styled-components'

interface IContainer{
  MenuState: boolean
}

export const Container = styled.nav<IContainer>`
  width: 70%;
  max-width: 350px;
  min-height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  background: white;
  display: none;
  z-index: 99;
  cursor: default;
  transform: ${props => props.MenuState? 'translateX(0px)': 'translateX(-350px)'};
  transition: .3s;

  .ContainerLabel{
    width: 100%;
    display: flex;
    align-items: center;
    cursor: default;
    justify-content: flex-end;
    padding: 10px 5px;


    p{
      margin: 0px;
      padding: 0px;
    }
  }

  @media(max-width: 800px){
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .BotaoFechar{
      cursor: pointer;
      padding: 10px;
      margin: 0px;

      :hover{
        text-decoration: underline;
      }
    }
  }
`;

export const Lista = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;  

export const Item = styled.li`
  width: 100%;
  border-top: 1px solid #111;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: flex-end;

  padding: 10px 5px;

  p{
    margin: 0px;
    padding: 0px;
  }

  :last-child{
    border-bottom: 1px solid #111;
  }

  :hover{
    background: #eee;

    p{
      text-decoration: underline;
    }
  }
`;