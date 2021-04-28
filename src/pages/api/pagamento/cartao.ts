import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import pagarme from 'pagarme';
import { IProduto } from '../../../Interfaces/IProduto';
import {ICardPaymentInfo} from '../../../Interfaces/ICardInfo'
import { FillCardInfo } from '../../../Util/Pagamentos/FillCardInfo';
import { SavePedidoFactory } from '../../../Factory/savePedidoFactory'
import { newPedidoMail } from '../../../Factory/newPedidoEmail';


export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {

  if (Request.method === 'POST') {
    try {
      const PersonInfo: ICardPaymentInfo = Request.body.data.info
      const Produtos: Array<IProduto> = Request.body.data.produtos
      const total: number = Request.body.data.total
      
      const response = await pagarme.client
        .connect({ api_key: process.env.PAGARME_APIKEY})
        .then((client: any) =>
          client.transactions.create(FillCardInfo(PersonInfo, Produtos, total)),
      )
      console.log(response)
      const PedidoSave = SavePedidoFactory()
      PedidoSave.save(
        {
          email: PersonInfo.email,
          idTransaction: response.id,
          method: 'cartao',
          nome: PersonInfo.Nome,
          status: response.status,
          produtos: Produtos,
          total: total,
          whatsapp: PersonInfo.Whatsapp
        }
      )

      const PedidoMail = newPedidoMail()
    await PedidoMail.send({
      Produtos: Produtos,
      email: PersonInfo.email,
      idTransaction: response.id,
      method: 'cartao',
      status: response.status
    })
      
      return Response.json(response)
    } catch (error) {
      return Response.json(error)
    
    }
  }
}
