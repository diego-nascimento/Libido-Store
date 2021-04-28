import { IUpdateStatusTransacionEntry, IUpdateStatusTransactionDomain } from "../../domain/useCases/updateStatusTransaction";
import { IUpdateStatusTransactionRepo } from "../protocols/IUpdateStatusTransactionRepo";


export class updateStatusTransactionData implements IUpdateStatusTransactionDomain{
  private readonly saveTransactionRepo: IUpdateStatusTransactionRepo

  constructor(saveTransactionRepo: IUpdateStatusTransactionRepo) {
    this.saveTransactionRepo = saveTransactionRepo
  }

  async update(data: IUpdateStatusTransacionEntry): Promise<any>{
    return  await this.saveTransactionRepo.update(data)
  }
}