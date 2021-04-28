import {IUpdateStatusTransactionRepo } from '../../../data/protocols/Transactions/IUpdateStatusTransactionRepo';
import { IUpdateStatusTransacionEntry } from '../../../domain/useCases/Transactions/updateStatusTransaction';
import Pedido from './model/Pedido'
import dbConnect from './mongoCreate'

export class updateStatusPedidoRepo implements IUpdateStatusTransactionRepo{
  async update(data: IUpdateStatusTransacionEntry): Promise<any> {
    try {
      await dbConnect()
      const pedido = await Pedido.updateOne(
        {
          idTransaction: data.idTransaction
        }, {
          status: data.status
        }
      )
      return pedido
    } catch (error) {
      return error
    }
  }
}