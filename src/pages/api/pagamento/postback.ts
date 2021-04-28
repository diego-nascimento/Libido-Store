import { NextApiRequest, NextApiResponse } from 'next';
import {updateStatusTransactionFactory} from '../../../Factory/updatePedidoFactory'
import {IUpdateStatusTransacionEntry} from '../../../domain/useCases/Transactions/updateStatusTransaction'
import {updateStatusMessageFactory} from '../../../Factory/statusUpdateEmailFactory'

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {
  if (Request.method === 'POST') {
    const { id, current_status } = Request.body
    const updatePedido = updateStatusTransactionFactory()
    const data: IUpdateStatusTransacionEntry = {
      idTransaction: id,
      status: current_status
    }
    const response = await updatePedido.update(data)
    const updateStatus = updateStatusMessageFactory()
    updateStatus.send({
      email: response.email,
      idTransaction: response.idTransaction,
      method: response.method,
      status: response.status
    })
    if (response) {
      return Response.status(200).json({message: 'ok'})
    } else {
      return Response.status(500).json({
        message: 'error'
      })
    }
  }
}
