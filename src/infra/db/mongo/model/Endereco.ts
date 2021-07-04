import mongoose, { Schema } from 'mongoose'

const EnderecoSchema = new Schema({
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String,
  rua: String,
  complemento: String
})

const Endereco = mongoose.models.components_endereco_enderecos || mongoose.model('components_endereco_enderecos', EnderecoSchema)

export default Endereco
