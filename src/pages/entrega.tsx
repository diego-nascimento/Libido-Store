import Head from 'next/head'
import React from 'react'
import Layout from '../Components/Layout/Layout'
import {SobreContainer, Container, InfoContainer} from '../PageStyles/entrega.style'


const Entrega: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Libido LoveShop- Entregas</title>
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-00GF13YP96`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-00GF13YP96', {
                  page_path: window.location.pathname,
                });
          `,
            }}
          />
      </Head>
      <SobreContainer>
        <Container className="Container">
          <InfoContainer>
            <h1>Entregas: </h1>
          </InfoContainer>
          <img src="/delivery-sexshop-pirauba.png" alt="delivery-sexshop-pirauba"/>
          <InfoContainer>
            <p>Nossos clientes merecem todo o conforto e comodidade possível, e
              é baseado nisso que ofertamos FRETE GRÁTIS para todos os pedidos
              com entrega em Piraúba.
            </p>
          </InfoContainer>
        </Container>
        <Container className="Container">
          <InfoContainer>
            <h1>Locais que atendemos: </h1>
          </InfoContainer>
          <img src="/localizacao-sexshop-pirauba.png" alt="localizacao-sexshop-pirauba"/>
          <InfoContainer>
            <p>Fazemos entrega imediata ( em até 24hrs do pedido concluído) por
                toda cidade de Piraúba mas também atendemos e entregamos
                pedidos de cidades próximas como Tocantins, Campestre, Guaraní e
                Astolfo Dutra com dia e horário combinados no horário da compra.
                Na cidade de Ubá realizamos entrega uma vez a cada mês!
            </p>
          </InfoContainer>
        </Container><Container className="Container">
          <InfoContainer>
            <h1>Retiradas: </h1>
          </InfoContainer>
          <img src="/retirada-sexshop-pirauba.png" alt="Retiradas-sexshop-pirauba"/>
          <InfoContainer>
            <p>Se por algum motivo for mais conveniente para você buscar sua
              encomenda com a gente, te recebemos respeitando todo o
              protocolo sanitário de prevenção ao COVID-19. Você escolhe tudo
              de casa e pega tudo já separado aqui no bairro Sossego!
            </p>
          </InfoContainer>
        </Container>

      </SobreContainer>
    </Layout>
    
  )
}

export default Entrega