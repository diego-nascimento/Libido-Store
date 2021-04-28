import { IemailupdateStatusEntry, updateStatusPedidoDomain } from '../../../domain/useCases/Messages/updateStatusPedido'
import { IsendupdateStatusMessage } from '../../protocols/Message/IsendupdateStatusMessage'


export class updateStatusPedidoMessageData implements updateStatusPedidoDomain{
  private readonly sendEmail: IsendupdateStatusMessage

  constructor(sendEmail: IsendupdateStatusMessage) {
    this.sendEmail = sendEmail
  }

  async send(data: IemailupdateStatusEntry): Promise<any>{
    return this.sendEmail.send(data)
  }
}