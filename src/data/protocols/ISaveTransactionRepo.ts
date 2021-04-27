import { IsaveTransacionEntry } from "../../domain/useCases/saveTransaction";

export interface ISaveTransactionRepo{
   save(data: IsaveTransacionEntry): Promise<any>
}