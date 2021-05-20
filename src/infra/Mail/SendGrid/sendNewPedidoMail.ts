import { IsendNewPedidoEmail } from "../../../data/protocols/Message/IsendNewPedidoEmail";
import { IemailNewPedidoEntry } from "../../../domain/useCases/Messages/newPedido";
import transporter from './createTransporter'

export class sendNewPedidoMail implements IsendNewPedidoEmail{
  async send(data: IemailNewPedidoEntry): Promise<any>{
  var email = {
    from: 'libidopirauba@gmail.com',
    to: data.email,
    subject: 'Libido Love Shop - Novo Pedido',
    template: 'newPedido',
    context: data,
  };
  const response = await transporter.sendMail(email);
    return response;
  }

}