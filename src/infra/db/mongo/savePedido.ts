import { ISaveTransactionRepo } from '../../../data/protocols/ISaveTransactionRepo';
import { IsaveTransacionEntry } from '../../../domain/useCases/saveTransaction';
import { IProduto } from '../../../Interfaces/IProduto';
import Pedido from './model/Pedido'
import dbConnect from './mongoCreate'

export class SavePedidoRepo implements ISaveTransactionRepo{
  async save(data: IsaveTransacionEntry): Promise<any> {
    try {
      await dbConnect()
      const InfoReturned = await Pedido.create({
        idTransaction: data.idTransaction,
        method: data.method,
        status: data.status,
        email: data.email,
        nome: data.nome,
        total: data.total,
        whatsapp: data.whatsapp,
        produtos: data.produtos.map((produto: IProduto) => {
          return {
            id: produto._id,
            nome: produto.Nome,
            preco: produto.subtotal,
            quantidade: produto.quantidade
        }
        })
      })
      console.log(process.env.MONGOURL)
      console.log(InfoReturned)
      return InfoReturned;
    } catch (error) {
      return error
    }
  }
}