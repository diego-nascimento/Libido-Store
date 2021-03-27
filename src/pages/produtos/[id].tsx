import Layout from "../../Components/Layout/Layout"
import { ICategoria } from "../../Interfaces/ICategoria"
import { IProduto } from "../../Interfaces/IProduto"
import { api } from "../../service/api"
import {Card, Container, ProdutosContainer} from '../../PageStyles/Produtos.style'

interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
}

const ProdutoCategoria: React.FC<IAllProdutos> = ({produtos, categorias}) => {
  return (
    <Layout>
      <ProdutosContainer>
        <h1>Nossos Produtos</h1>
        <Container>
          {produtos && produtos.map(produto =>{
            return (
              <Card key={produto._id}>
                {produto.imagem? <img src={produto.imagem.url} alt={produto.Nome} />:<img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />}
                <div className="info">
              <h2>{produto.Nome}</h2>
            </div>
          </Card>
            )
          })}
        </Container>
      </ProdutosContainer>
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
    fallback: false,
  };
}


export async function getStaticProps({params}:any) {

  const responseProdutos = await api.get( `/produtos?categoria._id=${params.id}`)
  const responseCategorias = await api.get('/categorias')
  return {
    props: {
      categorias: responseCategorias.data,
      produtos: responseProdutos.data
    },
    revalidate: 5000
  }
}