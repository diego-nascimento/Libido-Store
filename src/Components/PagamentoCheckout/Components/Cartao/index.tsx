import React, { ChangeEvent } from 'react'
import { PaymentHeader, ButtonContainer, Button, CardInfoContainer, FormularioContainer } from '../../Pagamento.style'
import { Container, Content } from '../../methods.style'
import { IFrete, useFrete } from '../../../../contexts/freteContexts'
import { usePagamento } from '../../../../contexts/pagamentoContexts'
import { connect } from 'react-redux'
import { IProduto } from '../../../../typing/Interfaces/IProduto'
import Cards, { Focused } from 'react-credit-cards'
import InputMask from 'react-input-mask'
import { createStyles, FormControl, InputLabel, makeStyles, Select, Theme } from '@material-ui/core'
import { Parcelas } from '../../../../Util/Parcelas'
import { useRouter } from 'next/router'

interface ICartaoCredito {
  total: number
  produtos: Array<IProduto>
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
      minWidth: 120,
      marginTop: '10px',
      background: 'white'
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
)

const CartaoCredito: React.FC<ICartaoCredito> = ({ total, produtos }) => {
  const { returnFreteSelected, handleSubmit, loading: LoadingFrete } = useFrete()
  const { handleFinalizar, cardName, cardNumber, cvc, expiresIn, setCardName, setCardNumber, setCvc, setExpiresIn, focus, setFocus, setParcelas, parcelas, loading: LoadingPagamento, setLoading } = usePagamento()
  const classes = useStyles()
  const Router = useRouter()

  const handleSubmitDelivery = async (data:IFrete) => {
    const response = await handleFinalizar(data, returnFreteSelected(), produtos, total)
    if (response) {
      Router.push('/sucesso')
    }
    setLoading(false)
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
          // @ts-ignore
          focused={focus}
        />
        <FormularioContainer>
          <input type="text" placeholder='Nome do titular do cartão' name='name'onChange={(e) => setCardName(e.target.value)} onFocus={() => {
            const name: Focused = 'name'
            setFocus(name)
          }}/>
          <InputMask mask='9999 9999 9999 9999' placeholder='Numero do cartão' type="text" name='number' onChange={(e) => setCardNumber(e.target.value)} onFocus={(e) => {
            const name: Focused = 'number'
            setFocus(name)
          }}/>
          <InputMask mask='99/99' type="text" placeholder='Validade' name ='expiry'onChange={(e) => setExpiresIn(e.target.value)} onFocus={(e) => setFocus('expiry')}/>
          <InputMask mask='999' placeholder='CVC' type="tel" name='cvc'onChange={(e) => setCvc(e.target.value)} onFocus={(e) => {
            const name: Focused = 'cvc'
            setFocus(name)
          }}/>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="selectParcelas">Selecione o número de parcelas</InputLabel>
            <Select
              native
              value={parcelas}
              // @ts-ignore
              onChange={(e:React.ChangeEvent<{ name?: string; value: unknown }>) => setParcelas(e.target.value)}
              inputProps={{
                name: 'Parcelas',
                id: 'selectParcelas'
              }}
            >
              {Parcelas.map(parcela => {
                return (
                  <option value={parcela.numero} key={parcela.numero}>
                    {parcela.numero}x de {Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format((total + returnFreteSelected().FreteValor) / parcela.numero)}
                    {parcela.acrescimo > 0 ? ' com juros' : ' sem juros'}
                  </option>
                )
              })}
            </Select>
          </FormControl>
        </FormularioContainer>
      </CardInfoContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit(handleSubmitDelivery)} disabled={LoadingFrete || LoadingPagamento}>
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

export default connect(mapStateToProps)(CartaoCredito)
