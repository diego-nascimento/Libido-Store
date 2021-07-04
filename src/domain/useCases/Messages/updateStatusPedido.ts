export interface IemailupdateStatusEntry{
  idTransaction: string,
  method: string,
  email: string
  status: string
}

export interface updateStatusPedidoDomain{
  send(data: IemailupdateStatusEntry):Promise<any>
}
