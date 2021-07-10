import { Banner, Card, Header, Categorias, Container } from '../styles/PageStyles/index.style'
import Layout from '../Components/Layout/Layout'
import React from 'react'
import { ICategoria } from '../typing/Interfaces/ICategoria'
import Link from 'next/link'
import Head from 'next/head'
import { GetFactory } from '../Factory/http/GetFactory'
import BannerIndex from '../Components/Banner/Banner'
import ListingProductH from '../Components/ListingProductH/ListingProductH'
import { IProduto } from '../typing/Interfaces/IProduto'
import Title from '../Components/Title'

interface IHome{
  categorias: Array<ICategoria>
  produtos: Array<IProduto>
  error?: any
  destaques: Array<IProduto>
  novidades: Array<IProduto>
}

const Home: React.FC <IHome> = ({ categorias, destaques, novidades }) => {
  return (
    <Layout categorias={categorias}>
      <Head>
        <title>Libido LoveShop - Inicio</title>
        <meta name="description" content={' A LIBIDO é uma loja especializada em produtos de love shop de bom gosto e  qualidade. Nosso principal alvo é o prazer feminino!'} />
      </Head>
      <Header style={{ background: 'none' }}>
        <BannerIndex />
      </Header>
      <Banner >
      </Banner>
        <ListingProductH produtos={destaques} title={'Destaques'} />
        <ListingProductH produtos={novidades} title={'Novidades'}/>
      <Categorias>
        <Title text={'Categorias'}/>
        <Container className="Container">
          {categorias && categorias !== undefined && categorias.map((categoria, index) => {
            if (index > 4) {
              return null
            }
            return (
              <Link href={`/categoria/${categoria._id}?categoria=${categoria.Nome}`} key={categoria._id} >
                <a>
                <Card >
                  {categoria.Imagem ? <img src={categoria.Imagem.url} alt={categoria.Nome} /> : <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt={categoria.Nome} />}
                </Card>
                </a>
              </Link>
            )
          })}
        </Container>
      </Categorias>
    </Layout>
  )
}

export default Home

export async function getStaticProps () {
  const api = GetFactory()
  const categorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })

  const destaques = await api.handle({
    body: null,
    url: `${process.env.APIURL}/produtos?destaque=true`
  })
  const novidades = await api.handle({
    body: null,
    url: `${process.env.APIURL}/produtos?_limit=10`
  })

  return {
    props: {
      categorias: categorias.body,
      destaques: destaques.body,
      novidades: novidades.body
    }
  }
}
