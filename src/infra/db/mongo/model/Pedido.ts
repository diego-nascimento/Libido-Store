import mongoose, {Schema} from 'mongoose'


const pedidoSchema = new Schema({
  idTransaction: Number,
  status: String,
  method: String,
  Cpf: String,
  Endereco: [
    {
      kind: String,
      ref: {
        type: mongoose.Schema.Types.ObjectId, ref: 'components_endereco_enderecos'
      }
    }
  ],
  Produtos: [
    {
      kind: String,
      ref: {
        type: mongoose.Schema.Types.ObjectId, ref: 'components_pedido_produto_pedidos'
      }
    }
  ],
  total: Number,
  nome: String,
  whatsapp: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
  publishedAt: {
      type: Date,
      default: Date.now()
  }
})

const Pedido = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema)

export default Pedido