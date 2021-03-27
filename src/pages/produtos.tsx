import Layout from '../Components/Layout/Layout'
import { ICategoria } from '../Interfaces/ICategoria'
import { IProduto } from '../Interfaces/IProduto'
import {Container, Card, ProdutosContainer} from '../PageStyles/Produtos.style'
import { api } from '../service/api'

interface IAllProdutos{
  produtos: Array<IProduto>
  categorias: Array<ICategoria>
}

const Produtos: React.FC<IAllProdutos> = ({produtos, categorias}) => {
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
              <h2>Nome do Produto</h2>
              <p>Loren Ipsum do loren ipsun</p>
            </div>
          </Card>
            )
          })}
        </Container>
      </ProdutosContainer>
    </Layout>
  )
}

export default Produtos


export async function getStaticProps() {
  const responseProdutos = await api.get('/produtos')
  const responseCategorias = await api.get('/categorias')
  return {
    props: {
      categorias: responseCategorias.data,
      produtos: responseProdutos.data
    },
    revalidate: 5000
  }
}