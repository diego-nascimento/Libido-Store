import Head from 'next/head'
import Layout from '../Components/Layout/Layout'
import React from 'react'
import ShowProdutos from '../Components/ShowProducts/ShowProdutos'
import { ICategoria } from '../typing/Interfaces/ICategoria'
import { IProduto } from '../typing/Interfaces/IProduto'
import { GetFactory } from '../Factory/http/GetFactory'

interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
}

const Produtos: React.FC<IAllProdutos> = ({ produtos, categorias }:IAllProdutos) => {
  return (
    <Layout categorias={categorias}>
      <Head>
        <title>Libido LoveShop - Produtos</title>
      </Head>
      <ShowProdutos produtos={produtos} title={'Produtos Disponiveis'} categorias={categorias}/>
    </Layout>
  )
}

export default Produtos

export async function getStaticProps () {
  const api = GetFactory()
  const responseProdutos = await api.handle(
    {
      url: `${process.env.APIURL}/produtos`,
      body: null
    })
  const responseCategorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })

  return {
    props: {
      categorias: responseCategorias.body,
      produtos: responseProdutos.body
    }
  }
}
