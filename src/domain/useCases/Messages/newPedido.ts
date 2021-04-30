import { IProduto } from "../../../typing/Interfaces/IProduto";

export interface IemailNewPedidoEntry{
  idTransaction: string,
  method: string,
  Produtos: Array<IProduto>
  email: string
  status: string
}

export interface emailNewPedido{
  send(data: IemailNewPedidoEntry):Promise<any>
}