import React from 'react'
import Layout from '../Components/Layout/Layout'
import { GetFactory } from '../Factory/http/GetFactory'
import { Container } from '../styles/PageStyles/404.style'
import { ICategoria } from '../typing/Interfaces/ICategoria'

interface I404{
  categorias: Array<ICategoria>
}

const Page404: React.FC<I404> = ({ categorias }: I404) => {
  return (
    <Layout categorias={categorias}>
      <Container>
        <h1>Pagina Não Encontrada</h1>
      </Container>
    </Layout>
  )
}

export default Page404

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
