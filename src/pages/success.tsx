import Layout from '../Components/Layout/Layout'
import React from 'react'
import {Wrapper, Container} from '../PageStyles/checkout.style'

const Sucesso: React.FC = () => {
  return (
    <Layout>
      <Wrapper>
        <Container className="Container">
          <h1>Seu Pedido Foi enviado para Nossos atendentes!</h1>
          <h2>Entraremos em contato para Finalizarmos a Compra!</h2>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Sucesso