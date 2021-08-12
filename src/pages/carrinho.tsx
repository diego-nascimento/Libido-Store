import React from 'react'
import Layout from '../Components/Layout/Layout'
import { Wrapper, Container, CheckoutContainer, ProdutosWrapper, ProdutosContainer, Produto, ProdutoInfoContainer, ImageContainer, ContainerResume, BotaoFinalizar } from '../styles/PageStyles/checkout.style'
import { connect } from 'react-redux'
import Bag from '../Components/Carrinho'
import Head from 'next/head'
import { IProduto } from '../typing/Interfaces/IProduto'
import Formulario from '../Components/FormularioCheckout'
import { IFrete, useFrete } from '../contexts/freteContexts'
import { usePagamento } from '../contexts/pagamentoContexts'
import { useStep } from '../contexts/cartStep'
import { Parcelas } from '../Util/Parcelas'
import Pagamento from '../Components/PagamentoCheckout'
import { Carousel } from 'react-bootstrap'
import Title from '../Components/Title'
import { useRouter } from 'next/router'
import EmptyCart from '../Components/EmptyCart'

interface CarrinhoProps{
  tamanhoCarrinho: number
  produtos: Array<IProduto>
  total: number
  dispatch: any
  quantidadeProdutos: number
}

const Carrinho: React.FC<CarrinhoProps> = ({
  tamanhoCarrinho,
  total,
  produtos,
  quantidadeProdutos
}:CarrinhoProps) => {
  const { step, setStep } = useStep()
  const { returnFreteSelected, cepValido, loading: LoadingFrete, handleSubmit } = useFrete()
  const { handleFinalizar, parcelas, method, loading: LoadingPayment, setLoading } = usePagamento()
  React.useEffect(() => {
    setStep(0)
  }, [])

  const Router = useRouter()

  const handleContinue = async (data: IFrete) => {
    if (step === 2) {
      const response = await handleFinalizar(data, returnFreteSelected(), produtos, total)
      if (response) {
        Router.push('/sucesso')
      }
      setLoading(false)
    } else {
      setStep(step + 1)
    }
  }

  const StepsCheckout = ['Sacola', 'Metodo de Entrega', 'Pagamento']

  return (
    <Layout carrinho={true}>
      <Head>
        <title>Libido LoveShop - Carrinho </title>
      </Head>
      <Wrapper >
        <Container className="Container">
          <Title text={StepsCheckout[step]}></Title>
          {tamanhoCarrinho <= 0

            ? <EmptyCart />
            : <CheckoutContainer>
              {step === 0 && <Bag />}
              {step === 1 && <Formulario />}
              {step === 2 && <Pagamento />}
              <div className="AsideTotal">
                <h2 className='TitleResume'>Resumo do Pedido</h2>
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
                            <b> {Intl.NumberFormat('pt-BR', {
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
                <ContainerResume>
                  <h2>{quantidadeProdutos} produtos: {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(total)} </h2>
                  {cepValido && <h2>Frete:  { returnFreteSelected().FreteValor === 0
                    ? 'Gratis'
                    : Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(returnFreteSelected().FreteValor)
                  } - em até {returnFreteSelected().prazo} dias</h2>}
                  {method === 1 && Parcelas[parcelas - 1].acrescimo > 0 && <h2>Juros: {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format((total + returnFreteSelected().FreteValor) * (Parcelas[parcelas - 1].acrescimo / 100))}</h2>}
                  <h1>Total: {Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format((total + returnFreteSelected().FreteValor) + (total + returnFreteSelected().FreteValor) * (Parcelas[parcelas - 1].acrescimo / 100)) }</h1>
                  <BotaoFinalizar disabled={LoadingFrete || LoadingPayment} onClick={handleSubmit(handleContinue)}>{LoadingFrete || LoadingPayment ? 'Carregando' : step === 2 ? 'Finalizar Pedido' : 'Continuar'}</BotaoFinalizar>
                </ContainerResume>
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
  tamanhoCarrinho: state.cart.length,
  quantidadeProdutos: state.cart.reduce((acumulador: number, produto: IProduto) => {
    return acumulador + (produto.quantidade ? produto.quantidade : 0)
  }, 0),
  total: state.cart.reduce((total: number, produto: IProduto) => {
    return total + produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  }, 0)
})

export default connect(mapStateToProps)(Carrinho)
