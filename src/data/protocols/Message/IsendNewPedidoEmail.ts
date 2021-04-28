import {IemailNewPedidoEntry} from '../../../domain/useCases/Messages/newPedido'

export interface IsendNewPedidoEmail{
  send(data:IemailNewPedidoEntry):Promise<any>
}