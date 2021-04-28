import { SaveTransactionData } from '../data/useCase/Transactions/saveTransactionData'
import { SavePedidoRepo } from '../infra/db/mongo/savePedido'

export const SavePedidoFactory = () => {
  const savePedidoInfra = new SavePedidoRepo()
  return  new SaveTransactionData(savePedidoInfra)
}