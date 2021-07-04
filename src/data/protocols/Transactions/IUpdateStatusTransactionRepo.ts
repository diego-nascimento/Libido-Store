import { IUpdateStatusTransacionEntry } from '../../../domain/useCases/Transactions/updateStatusTransaction'

export interface IUpdateStatusTransactionRepo{
   update(data: IUpdateStatusTransacionEntry): Promise<any>
}
