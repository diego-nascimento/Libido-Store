import Layout from '../Components/Layout/Layout'
import React from 'react'
import {Wrapper, Container} from '../PageStyles/checkout.style'
import Head from 'next/head'
import Router from 'next/router'
interface ISucesso{
  dispatch: any
}

const Login: React.FC<ISucesso> = () => {
  
  React.useEffect(() => {
    setTimeout(() =>{
      Router.push('/')
    }, 10000)
  }, [])


  return (
    <Layout>
      <Head>
         <title>Libido LoveShop - Login</title>
      </Head>
      <Wrapper>
        <Container className="Container">
          <h1>Seu Pedido Foi enviado para Nossos atendentes!</h1>
          <h2>Entraremos em contato para Finalizarmos a Compra!</h2>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Login