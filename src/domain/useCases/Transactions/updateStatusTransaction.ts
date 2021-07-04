export interface IUpdateStatusTransacionEntry{
  idTransaction: number
  status: string
}

export interface IUpdateStatusTransactionDomain{
  update(data: IUpdateStatusTransacionEntry):Promise<any>
}
