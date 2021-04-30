import { IsaveTransacionEntry, IsaveTransactionDomain } from "../../../domain/useCases/Transactions/saveTransaction";
import { ISaveTransactionRepo } from "../../protocols/Transactions/ISaveTransactionRepo";


export class SaveTransactionData implements IsaveTransactionDomain{
  private readonly saveTransactionRepo: ISaveTransactionRepo

  constructor(saveTransactionRepo: ISaveTransactionRepo) {
    this.saveTransactionRepo = saveTransactionRepo
  }

  async save(data: IsaveTransacionEntry): Promise<any>{
    return await this.saveTransactionRepo.save(data)
  }
}