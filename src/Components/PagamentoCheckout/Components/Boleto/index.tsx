import React from 'react'
import { PaymentHeader, ButtonContainer, Button } from '../../Pagamento.style'
import { Container, Content, Warning, TextContainer } from '../../methods.style'
import { IFrete, useFrete } from '../../../../contexts/freteContexts'
import { usePagamento } from '../../../../contexts/pagamentoContexts'
import { connect } from 'react-redux'
import { IProduto } from '../../../../typing/Interfaces/IProduto'
import { MdWarning } from 'react-icons/md'
import { useRouter } from 'next/router'

interface IBoleto {
  total: number
  produtos: Array<IProduto>
}

const Boleto: React.FC<IBoleto> = ({ total, produtos }) => {
  const { returnFreteSelected, handleSubmit, loading: LoadingFrete } = useFrete()
  const { handleFinalizar, loading: LoadingPagamento, setLoading } = usePagamento()
  const Router = useRouter()

  const handleSubmitBoleto = async (data:IFrete) => {
    const response = await handleFinalizar(data, returnFreteSelected(), produtos, total)
    if (response) {
      Router.push('/sucesso')
    }
    setLoading(false)
  }

  return (
    <Container>
      <PaymentHeader>
        <h2>Pague com Boleto Bancário</h2>
      </PaymentHeader>
      <Content>
        <span>Valor do Boleto</span>: <span>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(total + returnFreteSelected().FreteValor) }</span>
      </Content>
      <Warning>
        <MdWarning />
        <TextContainer>
          <h2>importante</h2>
          <li>O prazo para pagamento do seu boleto é de 3 dias, e o prazo de entrega do produto começa a ser contado a partir da confirmação de pagamento pela instituição bancária.</li>
        </TextContainer>
      </Warning>
      <ButtonContainer>
        <Button onClick={handleSubmit(handleSubmitBoleto)} disabled={LoadingFrete || LoadingPagamento}>
          {LoadingFrete || LoadingPagamento ? 'Carregando' : 'Finalizar Pedido'}
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

export default connect(mapStateToProps)(Boleto)
