import React from 'react'
import { PaymentHeader, ButtonContainer, Button, CardInfoContainer, FormularioContainer } from '../../Pagamento.style'
import { Container, Content } from '../../methods.style'
import { IFrete, useFrete } from '../../../../contexts/freteContexts'
import { usePagamento } from '../../../../contexts/pagamentoContexts'
import { connect } from 'react-redux'
import { IProduto } from '../../../../typing/Interfaces/IProduto'
import Cards from 'react-credit-cards'
import InputMask from 'react-input-mask'

interface ICartaoCredito {
  total: number
  produtos: Array<IProduto>
}

const CartaoCredito: React.FC<ICartaoCredito> = ({ total, produtos }) => {
  const { returnFreteSelected, handleSubmit } = useFrete()
  const { handleFinalizar, cardName, cardNumber, cvc, expiresIn, setCardName, setCardNumber, setCvc, setExpiresIn, focus, setFocus } = usePagamento()

  const handleSubmitDelivery = (data:IFrete) => {
    handleFinalizar(data, returnFreteSelected(), produtos, total)
  }

  return (
    <Container>
      <PaymentHeader>
        <h2>Pagamento com Cartão de Credito</h2>
      </PaymentHeader>
      <Content>
        <span>Valor a ser pago</span>: <span>{Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(total + returnFreteSelected().FreteValor) }</span>
      </Content>
      <CardInfoContainer>
        <Cards
          name={cardName}
          cvc={cvc}
          expiry={expiresIn}
          number={cardNumber}
          focused={focus}
        />
        <FormularioContainer>
          <input type="text" placeholder='Nome do titular do cartão' name='name'onChange={(e) => setCardName(e.target.value)} onFocus={(e) => setFocus('name')}/>
          <InputMask mask='9999 9999 9999 9999' placeholder='Numero do cartão' type="text" name='number' onChange={(e) => setCardNumber(e.target.value)} onFocus={(e) => setFocus('number')}/>
          <InputMask mask='99/99' type="text" placeholder='Validade' name ='expiry'onChange={(e) => setExpiresIn(e.target.value)} onFocus={(e) => setFocus('expiry')}/>
          <InputMask mask='999' placeholder='CVC' type="tel" name='cvc'onChange={(e) => setCvc(e.target.value)} onFocus={(e) => setFocus('cvc')}/>
        </FormularioContainer>
      </CardInfoContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit(handleSubmitDelivery)}>Finalizar Pedido</Button>
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

export default connect(mapStateToProps)(CartaoCredito)
