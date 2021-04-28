import { sendNewPedidoMail } from '../infra/Mail/SendGrid/sendNewPedidoMail'
import { emailNewPedidoData } from '../data/useCase/Messages/newPedidoMessageData'

export const newPedidoMail = () => {
  const sendEmailPedidoInfra = new sendNewPedidoMail()
  return new emailNewPedidoData(sendEmailPedidoInfra)
}