import {Banner, Card,CardInfo,  Header,Lista, Navegacao, ContainerNav, Produtos, Container, RedesSociais, Footer, Logo, Rights} from '../PageStyles/index.style'
import { FaInstagram, FaWhatsapp} from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import React from 'react'

const Home: React.FC = () => {
  const [MenuState, setMenuState] = React.useState(false)
  const [MenuBackGround, setMenuBackground] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
    window.pageYOffset < 200? setMenuBackground(false): setMenuBackground(true)
  })
  })

  
  
  return (
    <div>
      <Navegacao MenuBackground={MenuBackGround}>
        <ContainerNav className="Container">
          <FiMenu  onClick={()=>setMenuState(!MenuState)} className="BotaoMenu"/>
        <Lista  MenuState={MenuState}> 
          <li>
            Sobre Nós
          </li>
          <li>
            Produtos
          </li>
        </Lista>
        <RedesSociais>
          <li>
            <FaInstagram />
          </li>
          <li><FaWhatsapp /></li>
        </RedesSociais>
        </ContainerNav>
      </Navegacao>
      <Header>
      </Header>
      <Banner >
        <div className="Container">
          <h2>Bem Vindo a um Mundo de *******</h2>
          <p>The past few years have been an amazing journey: from thrilling projects to meeting exciting individuals. We have won 81 international design awards and we now export to 43 countries worldwide. And all of this has been made possible through a magic mix of believers, hard work and a burning passion for beauty, materials and people. By being DARK, I hope to inspire you to be creative in your future projects. I hope our paths will cross soon. Over a drink and some big or small talk. VIVA DESIGN!</p>
        </div>
      </Banner>
      <Produtos>
        <h1>Nossos Produtos</h1>
        <Container>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <CardInfo>
              <h2>Nome do Produto</h2>
              <button>Veja Mais</button>
            </CardInfo>
          </Card>
        </Container>
      </Produtos>
      <Footer>
        <div className="Container Footer-Container">
          <Logo></Logo>
           <div className="Grid-Container">
            <p>Onde Estamos?</p>
            <ul>
              <li>
                Rua Nilo Correa Condé, 108
              </li>
              <li>
                Piraúba - MG, Sossego
              </li>
            </ul>
          </div>
          <div className="Grid-Container">
            <p>Entre em Contato</p>
            <ul>
              <li><FaWhatsapp />: (32) 98728-9828</li>
              <li><FaInstagram />:</li>
            </ul>
          </div>
          <div>
            <p>Links Uteis</p>
            <ul>
              <li>Sobre nós</li>
              <li>Produtos</li>
            </ul>
          </div>
        </div>
        <Rights className="Container">
          <section className="Rights-Container">
            <span>© 2021 Libido, Todos os Direitos Reservados.</span>
            <RedesSociais className="Redes-Sociais-Footer">
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaWhatsapp />
              </li>
        </RedesSociais>
          </section>
        </Rights>
      </Footer>
    </div>
  );
}

export default Home

