import {Banner, TextContainer, Card, Header, Categorias, Container} from '../styles/PageStyles/index.style'
import Layout from '../Components/Layout/Layout'
import React from 'react'
import {api} from '../service/api'
import {ICategoria} from '../typing/Interfaces/ICategoria'
import Link from 'next/link'
import Head from 'next/head'

interface IHome{
  categorias?: Array<ICategoria>
  error?: any
}

const Home: React.FC <IHome> = ({categorias}) => {
  return (
    <Layout>
      <Head>
        <title>Libido LoveShop - Inicio</title>
        <meta name="description" content={' A LIBIDO é uma loja especializada em produtos de love shop de bom gosto e  qualidade. Nosso principal alvo é o prazer feminino!'} />
      </Head>
      <Header>
        <h1 style={{visibility: 'hidden'}}>Libido Love Store</h1>
      </Header>
      <Banner >
        <div className="Container">
          <h2>Bem Vindo ao nosso espaço!</h2>
          <TextContainer>
            <p>
              A LIBIDO é uma loja especializada em produtos de love shop de bom gosto e  qualidade. Nosso principal alvo é o prazer feminino! <br/>
              Atuamos com vendas de produtos sensuais desde de 2019. <br/>
              Nosso atendimento é ágil e especializado. Estamos preparados para o suporte pré venda e pós compra. Não tenha vergonha de esclarecer suas dúvidas nem de nos mandar uma mensagem!<br/>
              A discrição para a gente é a base de tudo. Não divulgamos a identidade de nossos cliente. <br/><br/>
              Se ame, se toque e sinta prazer estando só ou acompanhada(o).
            </p>
          </TextContainer>
        </div>
      </Banner>
      <Categorias>
        <Container className="Container">
          {categorias && categorias !== undefined && categorias.map(categoria => {
            return (
              <Link href={`/categoria/${categoria._id}`} key={categoria._id} >
                <a>
                <Card >
                  {categoria.Imagem? <img src={categoria.Imagem.url} alt={categoria.Nome} />: <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt={categoria.Nome} />}
                </Card>
                </a>
              </Link>
            )
          })}
        </Container>
      </Categorias>
    </Layout>
  );
}

export default Home



export async function getStaticProps() {
  const response = await api.get('/categorias')
  const revalidateTime: string | undefined = process.env.REVALIDATETIME 
    return {
      props: {
        categorias: response.data
      },
    }
}