import React, { ReactNode } from 'react'
import { DeepMap, FieldError, FieldValues, useForm, UseFormRegister } from 'react-hook-form'
import { IFrete, TypeFretes, useFrete } from './freteContexts'
import { Parcelas } from '../Util/Parcelas'
import { IFreteInfo } from '../typing/Interfaces/IFreteInfo'
import { IProduto } from '../typing/Interfaces/IProduto'
import { IBoletoInfo } from '../pages/api/pagamento/boleto'
import { PostFactory } from '../Factory/http/PostFactory'
import { normalize } from '../Util/Normalize'

type PagamentoProviderTypes ={
  method: number,
  setMethod: React.Dispatch<React.SetStateAction<number>>
  AvailableMethods: Array<string>
  getSelectedMethod: () => string
  errors: DeepMap<FieldValues, FieldError>
  register: UseFormRegister<FieldValues>
  setParcelas: React.Dispatch<React.SetStateAction<number>>
  getPercentageJuros: () => number
  Methods: Array<string>
  setavailableMethods: React.Dispatch<React.SetStateAction<string[]>>
  handleFinalizar: (data: IFrete, FreteSelected: TypeFretes, produtos: Array<IProduto>, total: number)=> void
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
  const {
    register, formState: { errors }, getValues: getValuesPagamento
  } = useForm()

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

  const handleFinalizar = async (data: IFrete, FreteSelected: TypeFretes, produtos: Array<IProduto>, total: number) => {
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
        const response = await post.handle({
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
        break
      case 'Pagamento na entrega':

        break
    }

    console.log('Finalizar pedido carai')
  }

  return (
    <PagamentoContext.Provider value={{ AvailableMethods, method, setMethod, getSelectedMethod, errors, register, getPercentageJuros, setParcelas, Methods, setavailableMethods, handleFinalizar }}>
      {children}
    </PagamentoContext.Provider>
  )
}

const usePagamento = () => {
  const context = React.useContext(PagamentoContext)
  return context
}

export { usePagamento, PagamentoProvider }
