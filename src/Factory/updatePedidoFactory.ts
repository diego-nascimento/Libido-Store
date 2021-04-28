import { updateStatusPedidoRepo } from '../infra/db/mongo/updateStatusPedido'
import { updateStatusTransactionData } from '../data/useCase/Transactions/updateStatusTransactionData'

export const updateStatusTransactionFactory = () => {
  const updatePedidoInfra = new updateStatusPedidoRepo()
  return new updateStatusTransactionData(updatePedidoInfra)
}