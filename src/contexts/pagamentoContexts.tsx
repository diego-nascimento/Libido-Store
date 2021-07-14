import React, { ReactNode } from 'react'
import { DeepMap, FieldError, FieldValues, useForm, UseFormRegister } from 'react-hook-form'
import { useFrete } from './freteContexts'
import { Parcelas } from '../Util/Parcelas'

type PagamentoProviderTypes ={
  method: number,
  setMethod: React.Dispatch<React.SetStateAction<number>>
  AvailableMethods: Array<string>
  getSelectedMethod: () => string
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
  setParcelas: React.Dispatch<React.SetStateAction<number>>
  getPercentageJuros: () => number
}

type PagamentoProviderProps = {
  children: ReactNode
}

const Methods = ['Boleto', 'Cartao', 'Pagamento na entrega']

const PagamentoContext = React.createContext({} as PagamentoProviderTypes)

const PagamentoProvider: React.FC<PagamentoProviderProps> = ({ children }) => {
  const [method, setMethod] = React.useState<number>(0)
  const [AvailableMethods, setavailableMethods] = React.useState<Array<string>>(Methods)
  const [parcelas, setParcelas] = React.useState<number>(0)
  const { getValues } = useFrete()
  const {
    register, formState: { errors }, getValues: getValuesPagamento
  } = useForm()

  React.useEffect(() => {
    getValues && getValues().Cep === '36170-000'
      ? setavailableMethods(Methods)
      : setavailableMethods([Methods[0], Methods[1]])
  }, [])

  const getSelectedMethod = (): string => {
    return Methods[method]
  }

  const getCardPaymentInformation = () => {
    return {
      name: getValuesPagamento().name,
      number: getValuesPagamento().number,
      expiresin: getValuesPagamento().expiresin,
      cvc: getValuesPagamento().expiresin
    }
  }

  const getPercentageJuros = ():number => {
    return Parcelas[parcelas].acrescimo
  }

  return (
    <PagamentoContext.Provider value={{ AvailableMethods, method, setMethod, getSelectedMethod, errors, register, getPercentageJuros, setParcelas }}>
      {children}
    </PagamentoContext.Provider>
  )
}

const usePagamento = () => {
  const context = React.useContext(PagamentoContext)
  return context
}

export { usePagamento, PagamentoProvider }
