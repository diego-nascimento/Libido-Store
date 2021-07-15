import { NextApiRequest, NextApiResponse } from 'next'
import { IProduto } from '../../../typing/Interfaces/IProduto'
import { SavePedidoFactory } from '../../../Factory/savePedidoFactory'
import { newPedidoMail } from '../../../Factory/newPedidoEmail'
import { IFreteInfo } from '../../../typing/Interfaces/IFreteInfo'

export interface IEntregaInfo{
  nome: string
  cpf: string,
  estado: string,
  cidade: string,
  bairro: string,
  complemento: string,
  rua: string,
  numero: string,
  cep: string,
  whatsapp: string,
  email: string
}

export default async function handler (
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  const paymentInfo:IEntregaInfo = Request.body.data.info
  const total = Request.body.data.total
  const Produtos: Array<IProduto> = Request.body.data.Produtos
  const FreteInfo: IFreteInfo = Request.body.data.FreteInfo
  try {
    const savePedido = SavePedidoFactory()
    await savePedido.save({
      email: paymentInfo.email,
      method: 'Pagamento a combinar',
      status: 'Entrega e pagamento pendente',
      nome: paymentInfo.nome,
      produtos: Produtos,
      total: total + FreteInfo.FreteValor,
      whatsapp: paymentInfo.whatsapp,
      cpf: paymentInfo.cpf,
      endereco: {
        bairro: paymentInfo.bairro,
        cep: paymentInfo.cep,
        cidade: paymentInfo.cidade,
        estado: paymentInfo.estado,
        numero: paymentInfo.numero,
        rua: paymentInfo.rua,
        complemento: paymentInfo.complemento
      },
      freteInfo: {
        servico: FreteInfo.servico,
        FreteValor: FreteInfo.FreteValor,
        prazo: FreteInfo.prazo
      }
    })
    const PedidoMail = newPedidoMail()
    await PedidoMail.send({
      Produtos: Produtos,
      email: paymentInfo.email,
      method: 'Pagamento na entrega',
      status: 'Entrega e pagamento pendente',
      freteInfo: FreteInfo
    })
    return Response.status(200).json({ message: 'ok' })
  } catch (error) {
    return Response.status(500).json(error)
  }
}
