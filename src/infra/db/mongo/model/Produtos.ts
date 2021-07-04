import mongoose, { Schema } from 'mongoose'

const ProdutosSchema = new Schema({
  produto:
  {
    type: mongoose.Schema.Types.ObjectId, ref: 'produtos'
  },
  quantidade: Number
})

const Produto = mongoose.models.components_pedido_produto_pedidos || mongoose.model('components_pedido_produto_pedidos', ProdutosSchema)

export default Produto
