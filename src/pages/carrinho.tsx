import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Wrapper, Container, CheckoutContainer, ProdutosWrapper, ProdutosContainer, Produto, ProdutoInfoContainer, ImageContainer, BotaoFinalizar } from '../styles/PageStyles/checkout.style'
import { connect } from 'react-redux'
import Bag from '../Components/Carrinho'
import Link from 'next/link'
import Head from 'next/head'
import { IProduto } from '../typing/Interfaces/IProduto'
import Formulario from '../Components/FormularioCheckout'
import { useFrete } from '../contexts/freteContexts'
import { useStep } from '../contexts/cartStep'

import Pagamento from '../Components/PagamentoCheckout'
import { IFreteInfo } from '../typing/Interfaces/IFreteInfo'
import { Carousel } from 'react-bootstrap'

interface CarrinhoProps{
  tamanho_carrinho: number
  produtos: Array<IProduto>
  total: number
  dispatch: any
  quantidadeProdutos: number
}

const Carrinho: React.FC<CarrinhoProps> = ({
  tamanho_carrinho,
  total,
  produtos,
  quantidadeProdutos
}) => {
  const { step, setStep } = useStep()
  const { returnFreteSelected, cepValido, loading, handleSubmit } = useFrete()

  React.useEffect(() => {
    setStep(0)
  }, [])

  const handleContinue = (data: IFreteInfo) => {
    setStep(step + 1)
  }

  const StepsCheckout = ['Sacola', 'Metodo de Entrega', 'Pagamento']

  return (
    <Layout carrinho={true}>
      <Head>
        <title>Libido LoveShop - Carrinho </title>
      </Head>
       <Wrapper >
         <Container className="Container">
          {tamanho_carrinho <= 0 ? <h1>Seu Carrinho de Compras esta Vazio.</h1> : <h1>{StepsCheckout[step]}</h1>}
            {tamanho_carrinho <= 0
              ? <p>
              Seu carrinho de compras está aqui para servir a você. Dê um propósito a ele!<br/>
              Continue Suas Compras: <Link href="/"><a>Produtos</a></Link>
            </p>
              : <CheckoutContainer>
                  {step === 0 && <Bag />}
                  {step === 1 && <Formulario />}
                  {step === 2 && <Pagamento />}

          <div className="AsideTotal">
            <h2>Resumo do Pedido</h2>
              {produtos && step > 0 &&
                <ProdutosWrapper>
                  <ProdutosContainer>
                    {produtos.map(produto => {
                      return (
                        <Produto key={produto._id}>
                          <ImageContainer smallSize={true}>
                            <Carousel
                              controls={false}
                              touch={true}
                              indicators={false}
                              fade={true}
                              slide={true}
                            >
                              {produto.imagens
                                ? produto.imagens.map(imagem => {
                                  return (
                                    <Carousel.Item key={imagem._id} interval={Math.floor(Math.random() * (2500 - 1800 + 1)) + 1800}>
                                      <img src={imagem.url} alt={produto.Nome} />
                                    </Carousel.Item>
                                  )
                                })
                                : <Carousel.Item key={'1'} >
                                    <img src="https://www.toptal.com/designers/subtlepatterns/patterns/repeated-square-dark.png" alt="No Image" />
                                  </Carousel.Item>
                              }
                            </Carousel>
                          </ImageContainer>
                          <ProdutoInfoContainer>
                              <p>{produto.quantidade}x {produto.Nome.toLowerCase()}</p>
                              <b style={{ textAlign: 'right' }}> {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              }).format(produto.saleprice)}</b>
                          </ProdutoInfoContainer>
                        </Produto>
                      )
                    })}
                  </ProdutosContainer>
                </ProdutosWrapper>
              }
              {cepValido && <h2>Frete:  { returnFreteSelected().FreteValor === 0
                ? 'Gratis'
                : Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(returnFreteSelected().FreteValor)
                } - em até {returnFreteSelected().prazo} dias</h2>}
              <h2>({quantidadeProdutos} produtos): {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(total)} </h2>
                <h2>Total: {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(total + returnFreteSelected().FreteValor)}</h2>
                <BotaoFinalizar disabled={loading} onClick={handleSubmit(handleContinue)}>{loading ? 'Carregando' : step === 2 ? 'Finalizar Pedido' : 'Continuar'}</BotaoFinalizar>
          </div>
        </CheckoutContainer>
            }
         </Container>
       </Wrapper>
    </Layout>

  )
}

const mapStateToProps = (state: any) => ({
  produtos: state.cart.map((produto: IProduto) => ({
    ...produto,
    subtotal: produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  })),
  tamanho_carrinho: state.cart.length,
  quantidadeProdutos: state.cart.reduce((acumulador: number, produto: IProduto) => {
    return acumulador + (produto.quantidade ? produto.quantidade : 0)
  }, 0),
  total: state.cart.reduce((total: number, produto: IProduto) => {
    return total + produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  }, 0)
})

export default connect(mapStateToProps)(Carrinho)
