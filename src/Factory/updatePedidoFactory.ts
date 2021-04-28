import { updateStatusPedidoRepo } from '../infra/db/mongo/updateStatusPedido'
import { updateStatusTransactionData } from '../data/useCase/updateStatusTransactionData'

export const updateStatusTransactionFactory = () => {
  const updatePedidoInfra = new updateStatusPedidoRepo()
  return new updateStatusTransactionData(updatePedidoInfra)
}