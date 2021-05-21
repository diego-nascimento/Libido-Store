import Head from "next/head"
import Layout from "../../Components/Layout/Layout"
import ShowProdutos from "../../Components/ShowProducts/ShowProdutos"
import { GetFactory } from "../../Factory/http/GetFactory"
import { ICategoria } from "../../typing/Interfaces/ICategoria"
import { IProduto } from "../../typing/Interfaces/IProduto"



interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
  categoria: ICategoria
}

const ProdutoCategoria: React.FC<IAllProdutos> = ({produtos, categorias, categoria}) => {
  return (
    <Layout categorias={categorias}>
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
  const api = GetFactory()

  const response = await api.handle({
    url: `${process.env.APIURL}/categorias`,
    body: null
  })

  const params: { params: { id: string } }[] = []
  response.body.forEach((element:IProduto) => {
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


export async function getStaticProps({ params }: any) {
  const api = GetFactory()
  const responseProdutos = await api.handle({
    body: null,
    url: `${process.env.APIURL}/produtos?categorias._id=${params.id}`
  })
  const responseCategorias = await api.handle({
    body: null,
    url: `${process.env.APIURL}/categorias`
  })
  const responseCategoriaAtual = await api.handle({
    url: `${process.env.APIURL}/categorias/${params.id}`,
    body: null
  })
   const revalidateTime: string | undefined = process.env.REVALIDATETIME 
  return {
    props: {
      categorias: responseCategorias.body,
      produtos: responseProdutos.body,
      categoria: responseCategoriaAtual.body
    },
  }
}