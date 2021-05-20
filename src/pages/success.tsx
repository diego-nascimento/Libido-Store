import Layout from '../Components/Layout/Layout'
import React from 'react'
import {Wrapper, Container} from '../styles/PageStyles/checkout.style'
import Head from 'next/head'
import Router from 'next/router'



const Sucesso: React.FC = (props: any) => {
  
  React.useEffect(() => {
    setTimeout(() =>{
      Router.push('/')
    }, 100000)
  }, [])

 

  return (
    <Layout>
      <Head>
         <title>Libido LoveShop - Sucesso</title>
      </Head>
      <Wrapper>
        <Container className="Container">
          <h1>Sua compra foi finalizada!</h1>
          <h2>Todas as informações são enviadas para o email cadastrado a cada nova atualização!</h2>
        </Container>
      </Wrapper>
    </Layout>
  )
}

export default Sucesso