import { IsaveTransacionEntry, IsaveTransactionDomain } from "../../domain/useCases/saveTransaction";
import { ISaveTransactionRepo } from "../protocols/ISaveTransactionRepo";


export class SaveTransactionData implements IsaveTransactionDomain{
  private readonly saveTransactionRepo: ISaveTransactionRepo

  constructor(saveTransactionRepo: ISaveTransactionRepo) {
    this.saveTransactionRepo = saveTransactionRepo
  }

  async save(data: IsaveTransacionEntry): Promise<any>{
    console.log(data)
    return await this.saveTransactionRepo.save(data)
  }
}