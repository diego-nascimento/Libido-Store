import Head from 'next/head'
import React from 'react'
import Layout from '../Components/Layout/Layout'
import { GetFactory } from '../Factory/http/GetFactory'
import { SobreContainer, Container, InfoContainer } from '../styles/PageStyles/entrega.style'
import { ICategoria } from '../typing/Interfaces/ICategoria'

interface IEntrega{
  categorias: Array<ICategoria>
}

const Entrega: React.FC<IEntrega> = ({ categorias }) => (
  <Layout categorias={categorias}>
    <Head>
      <title>Libido LoveShop- Entregas</title>
    </Head>
    <SobreContainer>
      <Container className="Container">
        <InfoContainer>
          <h1>Entregas: </h1>
        </InfoContainer>
        <img src="/delivery-sexshop-pirauba.png" alt="delivery-sexshop-pirauba" />
        <InfoContainer>
          <p>
            Nossos clientes merecem todo o conforto e comodidade possível, e
            é baseado nisso que ofertamos FRETE GRÁTIS para todos os pedidos
            com entrega em Piraúba.
          </p>
        </InfoContainer>
      </Container>
      <Container className="Container">
        <InfoContainer>
          <h1>Locais que atendemos: </h1>
        </InfoContainer>
        <img src="/localizacao-sexshop-pirauba.png" alt="localizacao-sexshop-pirauba" />
        <InfoContainer>
          <p>
            Fazemos entrega imediata ( em até 24hrs do pedido concluído) por
            toda cidade de Piraúba mas também atendemos e entregamos
            pedidos de cidades próximas como Tocantins, Campestre, Guaraní e
            Astolfo Dutra com dia e horário combinados no horário da compra.
            Na cidade de Ubá realizamos entrega uma vez a cada mês!
          </p>
        </InfoContainer>
      </Container>
      <Container className="Container">
        <InfoContainer>
          <h1>Retiradas: </h1>
        </InfoContainer>
        <img src="/retirada-sexshop-pirauba.png" alt="Retiradas-sexshop-pirauba" />
        <InfoContainer>
          <p>
            Se por algum motivo for mais conveniente para você buscar sua
            encomenda com a gente, te recebemos respeitando todo o
            protocolo sanitário de prevenção ao COVID-19. Você escolhe tudo
            de casa e pega tudo já separado aqui no bairro Sossego!
          </p>
        </InfoContainer>
      </Container>
    </SobreContainer>
  </Layout>

)

export default Entrega

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
