import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import pagarme from 'pagarme';
import { IProduto } from '../../../Interfaces/IProduto';
import { FillBoletoInfo } from '../../../Util/Pagamentos/FillBoletoInfo'
import { SavePedidoFactory } from '../../../Factory/savePedidoFactory'
import {newPedidoMail} from '../../../Factory/newPedidoEmail'
export interface  IBoletoInfo{
  nome: string
  cpf: string,
  estado: string,
  cidade: string,
  bairro: string,
  rua: string,
  numero: string,
  cep: string,
  whatsapp: string,
  email: string
}

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {

  const paymentInfo:IBoletoInfo = Request.body.data.info
  const total = Request.body.data.total
  const Produtos: Array<IProduto> = Request.body.data.Produtos
  console.log(FillBoletoInfo(paymentInfo, Produtos, total))
  try{
      const response = await pagarme.client
      .connect({ api_key: process.env.PAGARME_APIKEY})
      .then((client: any) =>
        client.transactions.create(FillBoletoInfo(paymentInfo, Produtos, total)),
    )
  /*
   await  pagarme.client.connect({ api_key: process.env.PAGARME_APIKEY })
  .then((client:any) => client.transactions.collectPayment({
    id: response.id,
    email: paymentInfo.email,
  }))
   */
    const savePedido = SavePedidoFactory()
    await savePedido.save({
      email: paymentInfo.email,
      idTransaction: response.id,
      method: 'boleto',
      nome: paymentInfo.nome,
      status: response.status,
      produtos: Produtos,
      total: total,
      whatsapp: paymentInfo.whatsapp,
    })
    const PedidoMail = newPedidoMail()
    await PedidoMail.send({
      Produtos: Produtos,
      email: paymentInfo.email,
      idTransaction: response.id,
      method: 'boleto',
      status: response.status
    })
      return Response.json(response)  
  } catch (error) {
    return Response.status(500).json(error)
  }
}
