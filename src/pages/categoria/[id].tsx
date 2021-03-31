import Head from "next/head"
import Layout from "../../Components/Layout/Layout"
import ShowProdutos from "../../Components/ShowProducts/ShowProdutos"
import { ICategoria } from "../../Interfaces/ICategoria"
import { IProduto } from "../../Interfaces/IProduto"
import { api } from "../../service/api"

interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
  categoria: ICategoria
}

const ProdutoCategoria: React.FC<IAllProdutos> = ({produtos, categorias, categoria}) => {
  return (
    <Layout>
      <Head>
        <title>Libido Store - {categoria && categoria.Nome}</title>
      </Head>
      {categoria && <ShowProdutos produtos={produtos} title={categoria.Nome} categorias={categorias}/>}
    </Layout>
  )
}

export default ProdutoCategoria

export async function getStaticPaths() {
  const response = await api.get('/categorias')

  const params: { params: { id: string } }[] = []
  response.data.forEach((element:ICategoria) => {
    params.push({
      params: {
        id: element._id,
      },
    });
  });
  return {
    paths: params,
    fallback: true,
  };
}


export async function getStaticProps({params}:any) {
  const responseProdutos = await api.get( `/produtos?categorias._id=${params.id}`)
  const responseCategorias = await api.get('/categorias')
  const responseCategoriaAtual = await api.get(`/categorias/${params.id}`)
  return {
    props: {
      categorias: responseCategorias.data,
      produtos: responseProdutos.data,
      categoria: responseCategoriaAtual.data
    },
    revalidate: process.env.REVALIDATETIME
  }
}