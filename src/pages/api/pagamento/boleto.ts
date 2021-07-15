import { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import pagarme from 'pagarme'
import { IProduto } from '../../../typing/Interfaces/IProduto'
import { FillBoletoInfo } from '../../../Util/Pagamentos/FillBoletoInfo'
import { SavePedidoFactory } from '../../../Factory/savePedidoFactory'
import { newPedidoMail } from '../../../Factory/newPedidoEmail'
import { IFreteInfo } from '../../../typing/Interfaces/IFreteInfo'

export interface IBoletoInfo{
  nome: string
  cpf: string,
  estado: string,
  cidade: string,
  bairro: string,
  complemento: string,
  rua: string,
  numero: string,
  cep: string,
  whatsapp: string,
  email: string
}

export default async function handler (
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  const paymentInfo:IBoletoInfo = Request.body.data.info
  const total = Request.body.data.total
  const Produtos: Array<IProduto> = Request.body.data.Produtos
  const FreteInfo: IFreteInfo = Request.body.data.FreteInfo
  try {
    const response = await pagarme.client
      .connect({ api_key: process.env.PAGARME_APIKEY })
      .then((client: any) =>
        client.transactions.create(FillBoletoInfo(paymentInfo, Produtos, total, FreteInfo))
      )

    const savePedido = SavePedidoFactory()
    const responseSave = await savePedido.save({
      email: paymentInfo.email,
      idTransaction: response.id,
      method: FreteInfo.FreteServico || 'Boleto',
      nome: paymentInfo.nome,
      status: response.status,
      produtos: Produtos,
      total: total,
      whatsapp: paymentInfo.whatsapp,
      cpf: paymentInfo.cpf,
      endereco: {
        bairro: paymentInfo.bairro,
        cep: paymentInfo.cep,
        cidade: paymentInfo.cidade,
        estado: paymentInfo.estado,
        numero: paymentInfo.numero,
        rua: paymentInfo.rua,
        complemento: paymentInfo.complemento
      },
      freteInfo: {
        FreteServico: FreteInfo.FreteServico,
        FreteValor: FreteInfo.FreteValor,
        prazo: FreteInfo.prazo
      }
    })
    const PedidoMail = newPedidoMail()
    await PedidoMail.send({
      Produtos: Produtos,
      email: paymentInfo.email,
      idTransaction: response.id,
      method: 'boleto',
      status: response.status,
      freteInfo: FreteInfo,
      boletoURL: response.boleto_url + '?format=pdf'
    })
    return Response.json(response)
  } catch (error) {
    return Response.status(500).json(error)
  }
}
