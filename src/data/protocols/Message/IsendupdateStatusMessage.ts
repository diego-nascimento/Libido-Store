import {IemailupdateStatusEntry} from '../../../domain/useCases/Messages/updateStatusPedido'

export interface IsendupdateStatusMessage{
  send(data:IemailupdateStatusEntry):Promise<any>
}