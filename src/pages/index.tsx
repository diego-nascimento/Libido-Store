import {Banner, Card,CardInfo,  Header, Produtos, Container} from '../PageStyles/index.style'
import Layout from '../Components/Layout/Layout'
import React from 'react'
import {api} from '../service/api'
import {ICategoria} from '../Interfaces/ICategoria'
import Link from 'next/link'

interface IHome{
  categorias?: Array<ICategoria>
  error?: any
}

const Home: React.FC <IHome> = ({categorias}) => {
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
          {categorias && categorias.map(categoria => {
            return (
              <Card key={categoria._id}>
              {categoria.Imagem? <img src={categoria.Imagem.url} alt={categoria.Nome} />: <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />}
                <CardInfo>
                  <h2>{categoria.Nome}</h2>
                  <Link href={`/produtos/${categoria._id}`}>
                    <a ><button>Veja Mais</button></a>
                  </Link>
                  </CardInfo>
              </Card>
            )
          })}

        </Container>
      </Produtos>
      
    </Layout>
  );
}

export default Home

export async function getStaticProps() {
    const response = await api.get('/categorias')
    return {
      props: {
        categorias: response.data
      },
      revalidate: 5000
    }
}