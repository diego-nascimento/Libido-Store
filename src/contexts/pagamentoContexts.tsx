import React, { ReactNode } from 'react'
import { IFrete, TypeFretes } from './freteContexts'
import { Parcelas } from '../Util/Parcelas'
import { IProduto } from '../typing/Interfaces/IProduto'
import { IBoletoInfo } from '../pages/api/pagamento/boleto'
import { ICardPaymentInfo } from '../typing/Interfaces/ICardInfo'
import { PostFactory } from '../Factory/http/PostFactory'
import { normalize } from '../Util/Normalize'
import { Focused } from 'react-credit-cards'

type PagamentoProviderTypes ={
  method: number,
  setMethod: React.Dispatch<React.SetStateAction<number>>
  AvailableMethods: Array<string>
  getSelectedMethod: () => string
  parcelas: number
  setParcelas: React.Dispatch<React.SetStateAction<number>>
  getPercentageJuros: () => number
  Methods: Array<string>
  setavailableMethods: React.Dispatch<React.SetStateAction<string[]>>
  handleFinalizar: (data: IFrete, FreteSelected: TypeFretes, produtos: Array<IProduto>, total: number)=> void
  cardName: string
  cardNumber: string
  expiresIn: string
  cvc: string
  setCardName:React.Dispatch<React.SetStateAction<string>>
  setCardNumber: React.Dispatch<React.SetStateAction<string>>
  setExpiresIn: React.Dispatch<React.SetStateAction<string>>
  setCvc:React.Dispatch<React.SetStateAction<string>>
  focus: string | undefined
  setFocus: React.Dispatch<React.SetStateAction<Focused | undefined>>
  loading: boolean
  error: null | string
}

type PagamentoProviderProps = {
  children: ReactNode
}

const Methods = ['Boleto', 'Cartão', 'Pagamento na entrega']

const PagamentoContext = React.createContext({} as PagamentoProviderTypes)

const PagamentoProvider: React.FC<PagamentoProviderProps> = ({ children }) => {
  const [method, setMethod] = React.useState<number>(0)
  const [AvailableMethods, setavailableMethods] = React.useState<Array<string>>(Methods)
  const [parcelas, setParcelas] = React.useState<number>(1)
  const [cardName, setCardName] = React.useState<string>('')
  const [cardNumber, setCardNumber] = React.useState<string>('')
  const [expiresIn, setExpiresIn] = React.useState<string>('')
  const [cvc, setCvc] = React.useState<string>('')
  const [focus, setFocus] = React.useState<Focused | undefined>(() => {
    const name: Focused = 'name'
    return name
  })
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState <boolean>(false)

  const getSelectedMethod = (): string => {
    return Methods[method]
  }

  React.useEffect(() => {
    setParcelas(1)
    setError(null)
  }, [method])

  const getCardPaymentInformation = () => {
    if (cardName.length === 0) {
      throw new Error()
    }
    if (cvc.length < 3) {
      throw new Error()
    }
    if (normalize(expiresIn).length < 4) {
      throw new Error()
    }
    if (normalize(cardNumber).length < 16 || normalize(cardNumber).length < 16) {
      throw new Error()
    }
    return {
      name: cardName,
      number: cardNumber,
      expiresin: expiresIn,
      cvc: cvc
    }
  }

  const getPercentageJuros = ():number => {
    return Parcelas[parcelas].acrescimo
  }

  const handleFinalizar = async (data: IFrete, FreteSelected: TypeFretes, produtos: Array<IProduto>, total: number) => {
    setLoading(true)
    setError(null)
    try {
      const method = getSelectedMethod()
      const post = PostFactory()
      const Info: IBoletoInfo = {
        nome: data.Nome,
        bairro: data.Bairro,
        cep: normalize(data.Cep),
        cidade: data.Cidade,
        complemento: data.Complemento,
        cpf: normalize(data.Cpf),
        email: data.email,
        estado: data.Estado,
        numero: data.Numero,
        rua: data.Endereco,
        whatsapp: normalize(data.Whatsapp)
      }
      switch (method) {
        case 'Boleto':
          const responseBoleto = await post.handle({
            url: '/api/pagamento/boleto',
            body: {
              data: {
                info: Info,
                total: total,
                Produtos: produtos,
                FreteInfo: FreteSelected
              }
            }
          })
          if (responseBoleto.StatusCode !== 200) {
            throw new Error()
          }
          break
        case 'Pagamento na entrega':
          const responseEntrega = await post.handle({
            url: '/api/pagamento/entrega',
            body: {
              data: {
                info: Info,
                total: total,
                Produtos: produtos,
                FreteInfo: FreteSelected
              }
            }
          })
          if (responseEntrega.StatusCode !== 200) {
            throw new Error()
          }
          break
        default:
          const cardData = getCardPaymentInformation()
          const CardMethodInfo: ICardPaymentInfo = {
            Nome: data.Nome,
            Bairro: data.Bairro,
            Cep: normalize(data.Cep),
            Cidade: data.Cidade,
            Cpf: normalize(data.Cpf),
            Estado: data.Estado,
            Numero: data.Numero,
            Endereco: data.Endereco,
            Whatsapp: normalize(data.Whatsapp),
            complemento: data.Complemento,
            email: data.email,
            cardInfo: {
              CardCVC: cardData.cvc,
              CardExpire: normalize(cardData.expiresin),
              CardName: cardData.name,
              CardNumber: cardData.number,
              parcelas: parcelas
            }
          }
          const responseCard = await post.handle({
            url: '/api/pagamento/cartao',
            body: {
              data: {
                info: CardMethodInfo,
                total: ((total + FreteSelected.FreteValor) + (total + FreteSelected.FreteValor) * ((Parcelas[parcelas - 1].acrescimo) / 100)).toFixed(2),
                Produtos: produtos,
                FreteInfo: FreteSelected
              }
            }
          })
          if (responseCard.StatusCode !== 200) {
            throw new Error()
          }
          break
      }
    } catch (error) {
      if (getSelectedMethod() === 'Boleto' || getSelectedMethod() === 'Pagamento na entrega') {
        setError('Algo deu errado! Tente novamente mais tarde ou entre em contato para podermos ajudar!')
      } else {
        setError('Algo deu errado! Verifique as informações e tente novamente!')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PagamentoContext.Provider value={{ AvailableMethods, method, setMethod, getSelectedMethod, getPercentageJuros, setParcelas, Methods, setavailableMethods, handleFinalizar, cardName, setCardName, cardNumber, setCardNumber, expiresIn, setExpiresIn, cvc, setCvc, focus, setFocus, parcelas, loading, error }}>
      {children}
    </PagamentoContext.Provider>
  )
}

const usePagamento = () => {
  const context = React.useContext(PagamentoContext)
  return context
}

export { usePagamento, PagamentoProvider }
