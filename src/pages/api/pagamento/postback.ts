import { NextApiRequest, NextApiResponse } from 'next';
import {updateStatusTransactionFactory} from '../../../Factory/updatePedidoFactory'
import {IUpdateStatusTransacionEntry} from '../../../domain/useCases/Transactions/updateStatusTransaction'
import {updateStatusMessageFactory} from '../../../Factory/statusUpdateEmailFactory'

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {
  return Response.json({message: 'ok'})
  if (Request.method === 'POST') {
    const { id, current_status } = Request.body
    const updatePedido = updateStatusTransactionFactory()
    const data: IUpdateStatusTransacionEntry = {
      idTransaction: id,
      status: current_status
    }
    const response = await updatePedido.update(data)
    console.log(response)
    const updateStatus = updateStatusMessageFactory()
    
    if (response) {
      return Response.status(200).json({message: 'ok'})
    } else {
      return Response.status(500).json({
        message: 'error'
      })
    }
  }
}
