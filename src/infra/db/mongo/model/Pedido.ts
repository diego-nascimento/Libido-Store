import mongoose, {Schema} from 'mongoose'


const pedidoSchema = new Schema({
  idTransaction: Number,
  status: String,
  method: String,
  produtos: [
    {
      id: String,
      nome: String,
      preco: String,
      quantidade: Number
    }
  ],
  total: Number,
  nome: String,
  whatsapp: String,
  email: String
})

const Pedido = mongoose.models.Pedido || mongoose.model('Pedido', pedidoSchema)

export default Pedido