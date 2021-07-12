import React, { ReactNode } from 'react'
import { PostFactory } from '../Factory/http/PostFactory'

type FreteContextType = {
  getFreteValues: (cep: string) => void
  cepValido: boolean
  loading: boolean
  resetFreteValues: () => void
  setFrete: React.Dispatch<React.SetStateAction<number>>
  setcepValido: React.Dispatch<React.SetStateAction<boolean>>
  returnFreteSelected: () => {FreteValor :number, prazo: number}
  error: string | null,
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

type AuthProviderProps = {
  children: ReactNode;
};

const FreteContext = React.createContext({} as FreteContextType)

const FreteProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cepValido, setcepValido] = React.useState<boolean>(false) // estado que define se um cep valido foi inserido ou nao
  const [FreteSelected, setFrete] = React.useState<number>(0) // Qual frete foi selecionado, 0 para boleto, 1 para cartao
  const [fretes, setFretes] = React.useState<Array<{FreteValor :number, prazo: number}>>([ // estado onde sao salvos as informações sobre os serviços de frete
    {
      FreteValor: 0,
      prazo: 0
    }, {
      FreteValor: 0,
      prazo: 0
    }
  ])
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState<boolean>(false)

  const resetFreteValues = () => {
    setFretes([ // reseta valores de frete
      {
        FreteValor: 0,
        prazo: 2
      },
      {
        FreteValor: 0,
        prazo: 2
      }
    ])
  }

  const getFreteValues = async (cep: string) => { // função que conslta no correio os valores e serviços de frete
    setLoading(true)
    if (cep === '36170000' || !cepValido) { // se o cep é de pirauba, prazo é de 2 dias e o valor é 0
      setLoading(false)
      return setFretes([
        {
          FreteValor: 0,
          prazo: 2
        },
        {
          FreteValor: 0,
          prazo: 2
        }
      ])
    }
    const postApi = PostFactory()
    const response = await postApi.handle({
      url: 'api/correios',
      body: {
        cep: cep,
        servico: '04510'
      }
    })
    console.log(response)
    setLoading(false)
  }

  const returnFreteSelected = () => {
    return fretes[FreteSelected]
  }

  return (<FreteContext.Provider value={{ getFreteValues, cepValido, loading, resetFreteValues, setFrete, setcepValido, returnFreteSelected, error, setError }}>{children}</FreteContext.Provider>)
}

const useFrete = () => {
  const context = React.useContext(FreteContext)
  return context
}

export { FreteProvider, useFrete }
