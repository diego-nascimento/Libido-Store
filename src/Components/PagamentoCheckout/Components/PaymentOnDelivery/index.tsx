import React from 'react'
import { PaymentHeader, ButtonContainer, Button } from '../../Pagamento.style'
import { Container, Content, Warning, TextContainer } from '../../methods.style'
import { IFrete, useFrete } from '../../../../contexts/freteContexts'
import { usePagamento } from '../../../../contexts/pagamentoContexts'
import { connect } from 'react-redux'
import { IProduto } from '../../../../typing/Interfaces/IProduto'
import { MdWarning } from 'react-icons/md'

interface IDelivery {
  total: number
  produtos: Array<IProduto>
}

const Delivery: React.FC<IDelivery> = ({ total, produtos }) => {
  const { returnFreteSelected, handleSubmit, loading: LoadingFrete } = useFrete()
  const { handleFinalizar, loading: LoadingPayment } = usePagamento()

  const handleSubmitDelivery = (data:IFrete) => {
    handleFinalizar(data, returnFreteSelected(), produtos, total)
  }

  return (
    <Container>
      <PaymentHeader>
        <h2>Pagamento na Entrega</h2>
      </PaymentHeader>
      <Content>
        <span>Valor a ser pago</span>: <span>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(total + returnFreteSelected().FreteValor) }</span>
      </Content>
      <Warning>
        <MdWarning />
        <TextContainer>
          <h2>importante</h2>
          <li>
              Nessa forma, fazemos a entrega pessoalmente. Aceitamos varias formas de pagamento, em dinheiro, cartão de credito, cartão de debito e PIX.
          </li>
          <li>
            Entre contato no nosso Whatsapp ou Instagram para combinarmos além do pagamento, o horario.
          </li>
        </TextContainer>
      </Warning>
      <ButtonContainer>
      <Button onClick={handleSubmit(handleSubmitDelivery)} disabled={LoadingFrete || LoadingPayment}>
          {LoadingFrete || LoadingPayment ? 'Carregando' : 'Finalizar Pedido'}
        </Button>
      </ButtonContainer>
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  produtos: state.cart.map((produto: IProduto) => ({
    ...produto,
    subtotal: produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  })),
  total: state.cart.reduce((total: number, produto: IProduto) => {
    return total + produto.saleprice * (produto.quantidade ? produto.quantidade : 0)
  }, 0)
})

export default connect(mapStateToProps)(Delivery)
