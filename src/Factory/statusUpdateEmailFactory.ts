import { sendUpdateStatusMail } from '../infra/Mail/SendGrid/sendupdateStatusMail'
import { updateStatusPedidoMessageData } from '../data/useCase/Messages/updateStatusPedidoMessageData'

export const updateStatusMessageFactory = () => {
  const updateStatusMessageInfra = new sendUpdateStatusMail()
  return new updateStatusPedidoMessageData(updateStatusMessageInfra)
}