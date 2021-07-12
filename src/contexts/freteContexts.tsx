import React, { ReactNode } from 'react'
import { PostFactory } from '../Factory/http/PostFactory'
import { IFreteInfo } from '../typing/Interfaces/IFreteInfo'

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
      FreteServico: 'PAC',
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
      FreteServico: 'Sedex',
      prazo: Number.parseInt(responseSEDEX.body.Servicos.cServico.PrazoEntrega._text),
      FreteValor: Number.parseFloat(ValorStr.replace(',', '.'))
    }
    setFretes([ // seta o estado com os novos valores dos serviços de frete
      {
        FreteValor: PAC.FreteValor,
        prazo: PAC.prazo
      },
      {
        FreteValor: SEDEX.FreteValor,
        prazo: SEDEX.prazo
      }
    ])
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
