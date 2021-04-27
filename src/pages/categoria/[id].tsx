import Head from "next/head"
import Layout from "../../Components/Layout/Layout"
import ShowProdutos from "../../Components/ShowProducts/ShowProdutos"
import { ICategoria } from "../../Interfaces/ICategoria"
import { IProduto } from "../../Interfaces/IProduto"
import { getCategoriaParams } from "../../service/getCategoriaParams"
import {api} from '../../service/api'


interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
  categoria: ICategoria
}

const ProdutoCategoria: React.FC<IAllProdutos> = ({produtos, categorias, categoria}) => {
  return (
    <Layout>
      <Head>
        <title>Libido LoveShop - {categoria && categoria.Nome}</title>
        <meta name="keywords" content={`${categoria && categoria.Nome}`}></meta>
      </Head>
      {categoria && <ShowProdutos produtos={produtos} title={categoria.Nome} categorias={categorias}/>}
    </Layout>
  )
}

export default ProdutoCategoria

export async function getStaticPaths() {
  
  return {
    paths: await getCategoriaParams(),
    fallback: true,
  };
}


export async function getStaticProps({params}:any) {
  const responseProdutos = await api.get( `/produtos?categorias._id=${params.id}`)
  const responseCategorias = await api.get('/categorias')
  const responseCategoriaAtual = await api.get(`/categorias/${params.id}`)
   const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      categorias: responseCategorias.data,
      produtos: responseProdutos.data,
      categoria: responseCategoriaAtual.data
    },
  }
}