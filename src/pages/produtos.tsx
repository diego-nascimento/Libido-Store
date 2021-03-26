import Layout from '../Components/Layout/Layout'
import {Container, Card, ProdutosContainer} from '../PageStyles/Produtos.style'

const Produtos: React.FC = () => {
  return (
    <Layout>
      <ProdutosContainer>
        <h1>Nossos Produtos</h1>
        <Container>
          <Card>
            <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="" />
            <div className="info">
              <h2>Nome do Produto</h2>
              <p>Loren Ipsum do loren ipsun</p>
            </div>
          </Card>
        </Container>
      </ProdutosContainer>
    </Layout>
  )
}

export default Produtos