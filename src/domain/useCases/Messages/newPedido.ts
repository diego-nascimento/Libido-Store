import { IFreteInfo } from "../../../typing/Interfaces/IFreteInfo";
import { IProduto } from "../../../typing/Interfaces/IProduto";

export interface IemailNewPedidoEntry{
  idTransaction: string,
  method: string,
  Produtos: Array<IProduto>
  email: string
  status: string
  freteInfo: IFreteInfo
  boletoURL?: string
}

export interface emailNewPedido{
  send(data: IemailNewPedidoEntry):Promise<any>
}