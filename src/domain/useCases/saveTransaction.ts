import { IProduto } from "../../Interfaces/IProduto";

export interface IsaveTransacionEntry{
  idTransaction: number
  status: string
  method: string
  produtos: Array<IProduto>
  total: number
  nome: string
  whatsapp: string
  email: string
  boleto?: string
}

export interface IsaveTransactionDomain{
  save(data: IsaveTransacionEntry):Promise<any>
}