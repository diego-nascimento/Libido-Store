import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Wrapper, Container, ProdutosContainer, BotaoFinalizar } from '../styles/PageStyles/checkout.style'
import { connect } from 'react-redux'
import Bag from '../Components/Carrinho'
import Link from 'next/link'
import Head from 'next/head'
import { IProduto } from '../typing/Interfaces/IProduto'
import Formulario from '../Components/FormularioCheckout'
import { FreteProvider } from '../contexts/freteContexts'
import { useStep } from '../contexts/cartStep'

interface CarrinhoProps{
  tamanho_carrinho: number
  total: number
  dispatch: any
}

const Carrinho: React.FC<CarrinhoProps> = ({
  tamanho_carrinho,
  total
}) => {
  const { step, setStep } = useStep()

  return (
    <Layout carrinho={true}>
      <Head>
        <title>Libido LoveShop - Carrinho </title>
      </Head>
       <Wrapper >
         <FreteProvider>
         <Container className="Container">
          {tamanho_carrinho <= 0 ? <h1>Seu Carrinho de Compras esta Vazio.</h1> : <h1>Meu Carrinho</h1>}
            {tamanho_carrinho <= 0
              ? <p>
              Seu carrinho de compras está aqui para servir a você. Dê um propósito a ele!<br/>
              Continue Suas Compras: <Link href="/"><a>Produtos</a></Link>
            </p>
              : <ProdutosContainer>
                  {step === 0 && <Bag />}
                  {step === 1 && <Formulario />}

               <div className="AsideTotal">
                  <h2>subTotal ({tamanho_carrinho} itens): {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)} </h2>
                  <BotaoFinalizar onClick={() => setStep(step + 1)}>Continuar</BotaoFinalizar>
                </div>
              </ProdutosContainer>
            }
         </Container>
         </FreteProvider>
       </Wrapper>
    </Layout>

  )
}

const mapStateToProps = (state: any) => ({

  tamanho_carrinho: state.cart.length,

  total: state.cart.reduce((total: number, produto: IProduto) => {
    return total + produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  }, 0)
})

export default connect(mapStateToProps)(Carrinho)
