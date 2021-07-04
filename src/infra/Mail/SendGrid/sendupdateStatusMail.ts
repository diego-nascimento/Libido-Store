import { IsendupdateStatusMessage } from '../../../data/protocols/Message/IsendupdateStatusMessage'
import { IemailupdateStatusEntry } from '../../../domain/useCases/Messages/updateStatusPedido'
import transporter from './createTransporter'
import { messages } from '../../../Util/setMessageStateToMail'
import { IMessages } from '../../../typing/types/ITranslatedMessages'

export class sendUpdateStatusMail implements IsendupdateStatusMessage {
  async send (data: IemailupdateStatusEntry): Promise<any> {
    data.status = messages[data.status as keyof IMessages]

    const email = {
      from: 'libidopirauba@gmail.com',
      to: data.email,
      subject: 'Atualização de Estado do Pedido',
      template: 'updateStatus',
      context: data
    }
    const response = await transporter.sendMail(email)
    return response
  }
}
