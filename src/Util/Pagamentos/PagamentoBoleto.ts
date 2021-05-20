import { PostFactory } from "../../Factory/http/PostFactory"
import { IBoletoInfo } from "../../pages/api/pagamento/boleto"
import { IFreteInfo } from "../../typing/Interfaces/IFreteInfo"
import { IProduto } from "../../typing/Interfaces/IProduto"
import { IDataForm } from "../../typing/Interfaces/IReactHookDataForm"
import { normalize } from "../Normalize"

interface IPagamentoBoleto{
  data: IDataForm
  produtos: IProduto[]
  FreteServico: string
  totalPagar: number
  Frete: IFreteInfo
}

export const PagamentoBoleto = async ({data, totalPagar, Frete, produtos, FreteServico}: IPagamentoBoleto) =>{
  const postApi = PostFactory()
  const boletoInfo: IBoletoInfo = { //preenchendo as informações de comprador do boleto
    cpf: normalize(data.Cpf),
    nome: data.Nome,
    bairro: data.Bairro,
    cep: normalize(data.Cep),
    cidade: data.Cidade,
    estado: data.Estado,
    numero: data.Numero,
    rua: data.Endereco,
    email: data.email,
    whatsapp: data.Whatsapp,
    complemento: data.Complemento
  }
  return await postApi.handle({
    url: 'api/pagamento/boleto',
    body: {
      data: {
      info: boletoInfo,
      total: totalPagar.toFixed(2),
      Produtos: produtos,
      FreteInfo: {
        FreteServico: FreteServico,
        /*FreteValor: fretes[Frete].valor,
        prazo: fretes[Frete].prazo
        */
        FreteValor: Frete.FreteValor,
        prazo: Frete.prazo
      }
    }
    }
  }) 
}