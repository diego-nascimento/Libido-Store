import Layout from '../Components/Layout/Layout'
import React from 'react'
import { WrapperSucesso, Container, ContainerInformation, Produtos, ProdutoInfo, ProdutoContainer, ImageContainerSucesso, ContainerBaixo, ContainerFrete, ContainerPagamento } from '../styles/PageStyles/checkout.style'
import Head from 'next/head'
import { ICategoria } from '../typing/Interfaces/ICategoria'
import { GetFactory } from '../Factory/http/GetFactory'
import Title from '../Components/Title'
import { usePagamento } from '../contexts/pagamentoContexts'
import { useStep } from '../contexts/cartStep'
import { TypeFretes, useFrete } from '../contexts/freteContexts'
import { IProduto } from '../typing/Interfaces/IProduto'
import { FaTruck } from 'react-icons/fa'
import { ImBarcode, ImCreditCard } from 'react-icons/im'
import { GrDeliver } from 'react-icons/gr'
import { connect } from 'react-redux'
import * as CartActions from '../store/modules/cart/actions'

interface ISucesso {
  categorias: Array<ICategoria>
  dispatch: any
}

type InfoType = {
  nome: string
  cpf: string,
  estado: string,
  cidade: string,
  bairro: string,
  complemento: string,
  rua: string,
  numero: string,
  cep: string,
  whatsapp: string,
  email: string
  cardInfo?: {
    CardNumber: string,
    CardExpire: string,
    CardName: string,
    CardCVC: string
    parcelas: number
  }
}

type Data = {
  FreteSelected: TypeFretes,
  produtos: Array<IProduto>
  total:number
  Info: InfoType,

}

const Sucesso: React.FC<ISucesso> = ({ categorias, dispatch }:ISucesso) => {
  const [data, setData] = React.useState<Data | null>(null)
  const { PedidoInfo, resetContext, setLoading, getSelectedMethod, parcelas } = usePagamento()
  const { resetContext: resetContextStep } = useStep()
  const [method, setMethod] = React.useState<null | string>(null)
  const [parcelasCompra, setParcelas] = React.useState<null | number>()
  const { resetContext: resetFreteContext } = useFrete()
  React.useEffect(() => {
    setLoading(false)
    setMethod(getSelectedMethod())
    PedidoInfo && setData(PedidoInfo.body)
    setParcelas(parcelas)
    resetContext()
    resetContextStep()
    resetFreteContext()
    dispatch(CartActions.LimparCarrinho())
  }, [])

  const MethodPayment = () => {
    switch (method) {
    case 'Boleto':
      return (
        <>
          <ImBarcode />
          <span>{method}</span>
        </>
      )
    case 'Pagamento na entrega':
      return (
        <>
          <GrDeliver />
          <span>{method}</span>
        </>
      )
    default:
      return (
        <>
          <ImCreditCard />
          <span>{method}</span>
          <span>{parcelasCompra}x</span>
        </>
      )
    }
  }

  return (
    <Layout categorias={categorias}>
      <Head>
        <title>Libido LoveShop - Sucesso</title>
      </Head>
      <WrapperSucesso>
        <Container className="Container">
          <Title text="Seu Pedido foi registrado com sucesso!"/>
          <h2 className='Subtitulo'>Todas as informações são enviadas para o email cadastrado a cada nova atualização!</h2>
          <ContainerInformation>
            <p className='titulo'>Produtos</p>
            <Produtos>
              {data?.produtos.map(produto => {
                return (
                  <ProdutoInfo key={produto._id}>
                    <ProdutoContainer>
                      <ImageContainerSucesso>
                        <img src={produto.imagens[0].url} alt="" />
                      </ImageContainerSucesso>
                      <h2>{produto.Nome.toLowerCase()}</h2>
                    </ProdutoContainer>
                    <span>{produto.quantidade} x {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(produto.saleprice)}</span>
                    <span>{Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(produto.subtotal || 0)}</span>
                  </ProdutoInfo>
                )
              })}
            </Produtos>
            <ContainerBaixo>
              <ContainerFrete>
                <p className='titulo'>Forma de entrega</p>
                <div className="FreteInfo">
                  <div className="top">
                    <FaTruck />
                    <span>{data?.FreteSelected.servico}</span>
                  </div>
                  <div className="bottom">
                    <span>Receba em até {data?.FreteSelected.prazo} dias</span>
                    <span>{ data?.FreteSelected.FreteValor === 0
                      ? 'Gratis'
                      : Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(data?.FreteSelected.FreteValor || 0)}</span>
                  </div>

                </div>
              </ContainerFrete>
              <ContainerPagamento>
                <p className='titulo'>Informações do cliente</p>
                <div className="ContainerInformacoes">
                  <div className="Pagamento">
                    {MethodPayment()}
                  </div>
                  <div className="Informacoes">
                    <p>{data?.Info.nome}</p>
                    <p>{data?.Info.email} - {data?.Info.whatsapp}</p>
                    <p>{data?.Info.rua}, {data?.Info.numero}</p>
                    <p>{data?.Info.cidade} - {data?.Info.estado}</p>
                    <p>{data?.Info.cep}</p>
                  </div>
                </div>
              </ContainerPagamento>
            </ContainerBaixo>
          </ContainerInformation>
        </Container>
      </WrapperSucesso>
    </Layout>
  )
}

export default connect()(Sucesso)

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
