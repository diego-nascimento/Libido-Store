import { NextApiRequest, NextApiResponse } from 'next';
import {updateStatusTransactionFactory} from '../../../Factory/updatePedidoFactory'
import {IUpdateStatusTransacionEntry} from '../../../domain/useCases/updateStatusTransaction'

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
    if (response) {
      return Response.status(200).json({message: 'ok'})
    } else {
      return Response.status(500).json({
        message: 'error'
      })
    }
  }
}
