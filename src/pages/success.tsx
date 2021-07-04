import Layout from '../Components/Layout/Layout'
import React from 'react'
import { Wrapper, Container } from '../styles/PageStyles/checkout.style'
import Head from 'next/head'
import Router from 'next/router'
import { ICategoria } from '../typing/Interfaces/ICategoria'
import { GetFactory } from '../Factory/http/GetFactory'

interface ISucesso {
  categorias: Array<ICategoria>
}

const Sucesso: React.FC<ISucesso> = ({ categorias }) => {
  React.useEffect(() => {
    setTimeout(() => {
      Router.push('/')
    }, 100000)
  }, [])

  return (
    <Layout categorias={categorias}>
      <Head>
         <title>Libido LoveShop - Sucesso</title>
      </Head>
      <Wrapper>
        <Container className="Container">
          <h1>Sua compra foi finalizada!</h1>
          <h2>Todas as informações são enviadas para o email cadastrado a cada nova atualização!</h2>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Sucesso

export async function getStaticProps ({ params }: any) {
  const api = GetFactory()

  const responseCategorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })

  return {
    props: {
      categorias: responseCategorias.body
    }
  }
}
