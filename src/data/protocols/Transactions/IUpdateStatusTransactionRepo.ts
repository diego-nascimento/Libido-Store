import { IUpdateStatusTransacionEntry } from "../../domain/useCases/updateStatusTransaction";

export interface IUpdateStatusTransactionRepo{
   update(data: IUpdateStatusTransacionEntry): Promise<any>
}