import { PostFactory } from '../../Factory/http/PostFactory'
import { ICardPaymentInfo } from '../../typing/Interfaces/ICardInfo'
import { IFreteInfo } from '../../typing/Interfaces/IFreteInfo'
import { IProduto } from '../../typing/Interfaces/IProduto'
import { IDataForm } from '../../typing/Interfaces/IReactHookDataForm'
import { normalize } from '../Normalize'

interface IPagamentoCard{
  data: IDataForm
  produtos: IProduto[]
  FreteServico: string
  totalPagar: number
  Frete: IFreteInfo
}

export const PagamentoCard = async ({ data, produtos, FreteServico, totalPagar, Frete }: IPagamentoCard) => {
  const postApi = PostFactory()
  const cardInfo: ICardPaymentInfo = { // preenche informações do comprador para compra com cartao
    bairro: data.Bairro,
    nome: data.Nome,
    cpf: normalize(data.Cpf),
    cidade: data.Cidade,
    rua: data.Endereco,
    complemento: data.Complemento,
    estado: data.Estado,
    numero: normalize(data.Numero),
    whatsapp: normalize(data.Whatsapp),
    cep: normalize(data.Cep),
    email: data.email,
    cardInfo: {
      CardCVC: normalize(data.CardCVC),
      CardExpire: normalize(data.CardExpire),
      CardName: data.CardName,
      CardNumber: normalize(data.CardNumber),
      parcelas: data.parcelas
    }
  }
  return await postApi.handle({
    url: 'api/pagamento/cartao',
    body: {
      data: {
        info: cardInfo, // informaçoes do comprador e do cartao
        produtos: produtos, // lista de produtos
        total: totalPagar.toFixed(2), // valor total a se pagar
        FreteInfo: {
          FreteServico: FreteServico,
          /* FreteValor: fretes[Frete].valor,
          prazo: fretes[Frete].prazo
          */
          FreteValor: Frete.FreteValor,
          prazo: Frete.prazo
        }
      }
    }
  })
}
