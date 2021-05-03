import { ISaveTransactionRepo } from '../../../data/protocols/Transactions/ISaveTransactionRepo';
import { IsaveTransacionEntry } from '../../../domain/useCases/Transactions/saveTransaction';
import { IProduto } from '../../../typing/Interfaces/IProduto';
import Pedido from './model/Pedido'
import Produto from './model/Produtos'
import dbConnect from './mongoCreate'
import Endereco from './model/Endereco'



export class SavePedidoRepo implements ISaveTransactionRepo{
  async save(data: IsaveTransacionEntry): Promise<any> {
    try {
      await dbConnect()

      const createProdutoPedido = async (produto:IProduto) =>{
        let produtoPedido = await Produto.create({
          quantidade: produto.quantidade,
          produto: produto._id  
        })
        return produtoPedido
      }
      
      const produtos: any = await Promise.all(data.produtos.map(async (produto: IProduto) => {
        const produtoPedido = await createProdutoPedido(produto)
        return {
          kind: 'ComponentPedidoProdutoPedido',
          ref: produtoPedido._id
        }
      }));

      const endereco: any = await Endereco.create({
        numero: data.endereco.numero,
        rua: data.endereco.rua,
        bairro: data.endereco.bairro,
        cidade: data.endereco.cidade,
        estado:data.endereco.estado,
        cep: data.endereco.cep,
        complemento: data.endereco.complemento
      })
      
      const InfoReturned = await Pedido.create({
        idTransaction: data.idTransaction,
        method: data.method,
        status: data.status,
        email: data.email,
        nome: data.nome,
        cpf:data.cpf,
        total: data.total,
        whatsapp: data.whatsapp,
        parcelas: data.parcelas? data.parcelas: 1,
        Produtos: produtos,
        Endereco: [{
          kind: 'ComponentEnderecoEndereco',
          ref: endereco._id
        }],
        freteServico: data.freteInfo.FreteServico,
        freteValor: data.freteInfo.FreteValor
      })
      return InfoReturned;
    } catch (error) {
      return error
    }
  }
}