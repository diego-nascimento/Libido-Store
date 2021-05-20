import { IsaveTransacionEntry } from "../../../domain/useCases/Transactions/saveTransaction";

export interface ISaveTransactionRepo{
   save(data: IsaveTransacionEntry): Promise<any>
}