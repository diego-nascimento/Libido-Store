import React, { ReactNode } from 'react'
import { DeepMap, FieldError, FieldValues, useForm, UseFormGetValues, UseFormHandleSubmit, UseFormRegister, UseFormSetValue, UseFormUnregister, Control } from 'react-hook-form'
import { PostFactory } from '../Factory/http/PostFactory'
import { IFreteInfo } from '../typing/Interfaces/IFreteInfo'
import { IValues } from '../typing/types/ICheckoutValues'
import { requiredFields } from '../Util/EnderecoRequiredFields'
import { normalize } from '../Util/Normalize'

export type IFrete = {
  Bairro: string,
  Cep: string,
  Cidade: string,
  Complemento: string,
  Cpf: string,
  Endereco: string,
  Estado: string,
  Nome: string,
  Numero: string,
  Whatsapp: string,
  email: string
}

type FreteContextType = {
  getFreteValues: (cep: string) => void
  cepValido: boolean
  loading: boolean
  resetFreteValues: () => void
  setFrete: React.Dispatch<React.SetStateAction<number>>
  setcepValido: React.Dispatch<React.SetStateAction<boolean>>
  returnFreteSelected: () => {servico: string, FreteValor :number, prazo: number}
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>
  register: UseFormRegister<FieldValues>
  handleSubmit: UseFormHandleSubmit<FieldValues>
  unregister: UseFormUnregister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  getValues: UseFormGetValues<FieldValues>
  errors: DeepMap<FieldValues, FieldError>
  getFormularioInformations: () => IFrete
  showAddress: boolean
  setShowAddress: React.Dispatch<React.SetStateAction<boolean>>
  addressEditable: TypesAddressInfo
  setAddressEditable: React.Dispatch<React.SetStateAction<TypesAddressInfo>>
  FreteSelected: number
  control: Control<FieldValues>
  resetContext: () => void
}

type TypesAddressInfo = {
  Cidade: boolean
  Estado: boolean
  Bairro: boolean
  Endereco: boolean
}

type AuthProviderProps = {
  children: ReactNode;
};

export type TypeFretes ={
  servico: string,
  FreteValor: number,
  prazo: number
}

const FreteContext = React.createContext({} as FreteContextType)

const FreteProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cepValido, setcepValido] = React.useState<boolean>(false) // estado que define se um cep valido foi inserido ou nao
  const [showAddress, setShowAddress] = React.useState<boolean>(false) // State se deve ou não mostrar os campos de endereço
  const [addressEditable, setAddressEditable] = React.useState<TypesAddressInfo>({ // State se campos estão editaveis ou não
    Cidade: true,
    Estado: true,
    Bairro: true,
    Endereco: true
  })
  const [FreteSelected, setFrete] = React.useState<number>(0) // Qual frete foi selecionado, 0 para boleto, 1 para cartao
  const [fretes, setFretes] = React.useState<Array<TypeFretes>>([ // estado onde sao salvos as informações sobre os serviços de frete
    {
      FreteValor: 0,
      prazo: 0,
      servico: ''
    }, {
      FreteValor: 0,
      prazo: 0,
      servico: ''
    }
  ])
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const {
    register, handleSubmit, formState: { errors }, unregister, setValue, getValues, control, reset
  } = useForm()

  const resetContext = () => {
    resetFreteValues()
    setcepValido(false)
    setShowAddress(false)
    setAddressEditable({ // State se campos estão editaveis ou não
      Cidade: true,
      Estado: true,
      Bairro: true,
      Endereco: true
    })
    setFrete(0)
    setError(null)
    setLoading(false)
    reset()
  }

  const resetFreteValues = () => {
    setFretes([ // reseta valores de frete
      {
        FreteValor: 0,
        prazo: 0,
        servico: ''
      }, {
        FreteValor: 0,
        prazo: 0,
        servico: ''
      }
    ])
  }

  React.useEffect(() => { // atualiza os campos de endereço se o estado de cep valido alterar
    if (!cepValido) {
      unregister('Cidade') // faz com q o react hook form nao registre os valores de endereço
      unregister('Estado')
      unregister('Bairro')
      unregister('Numero')
      unregister('Endereco')
      unregister('Complemento')
      requiredFields.forEach((field) => { // Limpa os campos de Endereço quando um Cep valido nao esta inserido
        setValue(field.field as keyof IValues, '')
      })
      setValue('Cep', '')
      setShowAddress(false)
      resetFreteValues()
    } else {
      getFreteValues(normalize(getValues().Cep))
      register('Cidade')
      register('Estado')
      register('Bairro')
      register('Numero')
      register('Endereco')
      register('Complemento')
    }
  }, [cepValido])

  const getFreteValues = async (cep: string) => { // função que conslta no correio os valores e serviços de frete
    setLoading(true)
    if (cep === '36170000' || !cepValido) { // se o cep é de pirauba, prazo é de 2 dias e o valor é 0
      setLoading(false)
      return setFretes([
        {
          servico: 'PAC',
          FreteValor: 0,
          prazo: 2
        },
        {
          servico: 'Sedex',
          FreteValor: 0,
          prazo: 2
        }
      ])
    }
    const postApi = PostFactory()
    const responsePAC = await postApi.handle({
      url: 'api/correios',
      body: {
        cep: cep,
        servico: '04510'
      }
    })

    let ValorStr: string = responsePAC.body.Servicos.cServico.Valor._text // a informação vem em xml e como texto
    if (Number.parseFloat(ValorStr.replace(',', '.')) === 0) { // se o valor do serviço retornado, quer dizer que algo esta errado nas informações do correio
      setLoading(false) // finaliza o esado de carregamento
      return setcepValido(false) // com isso o cep fica invalido
    }

    const PAC: IFreteInfo = { // organiza as informações do PAC
      servico: 'PAC',
      prazo: Number.parseInt(responsePAC.body.Servicos.cServico.PrazoEntrega._text),
      FreteValor: Number.parseFloat(ValorStr.replace(',', '.'))
    }
    const responseSEDEX = await postApi.handle({
      url: 'api/correios',
      body: {
        cep: cep,
        servico: '04014'
      }
    })
    ValorStr = responseSEDEX.body.Servicos.cServico.Valor._text // xml em texto
    const SEDEX: IFreteInfo = {
      servico: 'Sedex',
      prazo: Number.parseInt(responseSEDEX.body.Servicos.cServico.PrazoEntrega._text),
      FreteValor: Number.parseFloat(ValorStr.replace(',', '.'))
    }
    setFretes([ // seta o estado com os novos valores dos serviços de frete
      {
        servico: 'PAC',
        FreteValor: PAC.FreteValor,
        prazo: PAC.prazo
      },
      {
        servico: 'Sedex',
        FreteValor: SEDEX.FreteValor,
        prazo: SEDEX.prazo
      }
    ])
    setLoading(false)
  }

  const returnFreteSelected = (): TypeFretes => {
    if (getValues().Cep === '36170-000') {
      return {
        FreteValor: 0,
        prazo: 2,
        servico: 'Entregamos na sua casa'
      }
    } else {
      return fretes[FreteSelected]
    }
  }

  const getFormularioInformations = ():IFrete => {
    return {
      Cep: getValues().Cep,
      Bairro: getValues().Bairro,
      Cidade: getValues().Cidade,
      Complemento: getValues().Complemento,
      Endereco: getValues().Endereco,
      Estado: getValues().Estado,
      Numero: getValues().Numero,
      Cpf: getValues().Cpf,
      Nome: getValues().Nome,
      Whatsapp: getValues().Whatsapp,
      email: getValues().email
    }
  }

  return (<FreteContext.Provider value={{ getFreteValues, cepValido, loading, resetFreteValues, setFrete, setcepValido, returnFreteSelected, error, setError, register, handleSubmit, setValue, getValues, errors, unregister, getFormularioInformations, showAddress, setShowAddress, addressEditable, setAddressEditable, FreteSelected, control, resetContext }}>{children}</FreteContext.Provider>)
}

const useFrete = () => {
  const context = React.useContext(FreteContext)
  return context
}

export { FreteProvider, useFrete }
