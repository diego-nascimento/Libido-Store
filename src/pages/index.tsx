import {Banner, Card,CardInfo,  Header, Produtos, Container} from '../PageStyles/index.style'
import Layout from '../Components/Layout/Layout'

import React from 'react'

const Home: React.FC = () => {
  return (
    <Layout>
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
      
    </Layout>
  );
}

export default Home

