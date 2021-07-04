import { IemailNewPedidoEntry, emailNewPedido } from '../../../domain/useCases/Messages/newPedido'
import { IsendNewPedidoEmail } from '../../protocols/Message/IsendNewPedidoEmail'

export class emailNewPedidoData implements emailNewPedido {
  private readonly sendEmail: IsendNewPedidoEmail

  constructor (sendEmail: IsendNewPedidoEmail) {
    this.sendEmail = sendEmail
  }

  async send (data: IemailNewPedidoEntry): Promise<any> {
    return this.sendEmail.send(data)
  }
}
