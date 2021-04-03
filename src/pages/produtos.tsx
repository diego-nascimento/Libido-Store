import Head from 'next/head'
import Layout from '../Components/Layout/Layout'
import ShowProdutos from '../Components/ShowProducts/ShowProdutos'
import { ICategoria } from '../Interfaces/ICategoria'
import { IProduto } from '../Interfaces/IProduto'
import { api } from '../service/api'

interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
}

const Produtos: React.FC<IAllProdutos> = ({ produtos, categorias }) => {

  return (
    <Layout>
      <Head>
        <title>Libido - Produtos</title>
      </Head>
      <ShowProdutos produtos={produtos} title={"Produtos Disponiveis"} categorias={categorias}/>
    </Layout>
  )
}

export default Produtos

export async function getStaticProps() {
  const responseProdutos = await api.get('/produtos')
  const responseCategorias = await api.get('/categorias')
  
  const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      categorias: responseCategorias.data,
      produtos: responseProdutos.data
    },
    
    revalidate: revalidateTime && parseInt(revalidateTime)
  }
}