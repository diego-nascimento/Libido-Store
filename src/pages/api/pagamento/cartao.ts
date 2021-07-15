import { NextApiRequest, NextApiResponse } from 'next'
// @ts-ignore
import pagarme from 'pagarme'
import { IProduto } from '../../../typing/Interfaces/IProduto'
import { ICardPaymentInfo } from '../../../typing/Interfaces/ICardInfo'
import { FillCardInfo } from '../../../Util/Pagamentos/FillCardInfo'
import { SavePedidoFactory } from '../../../Factory/savePedidoFactory'
import { newPedidoMail } from '../../../Factory/newPedidoEmail'
import { IFreteInfo } from '../../../typing/Interfaces/IFreteInfo'
import { Parcelas } from '../../../Util/Parcelas'

export default async function handler (
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  if (Request.method === 'POST') {
    try {
      const PersonInfo: ICardPaymentInfo = Request.body.data.info
      const Produtos: Array<IProduto> = Request.body.data.Produtos
      const total: number = Request.body.data.total
      const FreteInfo: IFreteInfo = Request.body.data.FreteInfo

      const response = await pagarme.client
        .connect({ api_key: process.env.PAGARME_APIKEY })
        .then((client: any) =>
          client.transactions.create(FillCardInfo(PersonInfo, Produtos, total, FreteInfo))
        )

      if (response.status === 'refused') {
        throw new Error('Pagamento Recusado')
      }

      const PedidoSave = SavePedidoFactory()
      PedidoSave.save(
        {
          email: PersonInfo.email,
          idTransaction: response.id,
          method: 'cartao',
          nome: PersonInfo.Nome,
          status: response.status,
          produtos: Produtos,
          parcelas: PersonInfo.cardInfo.parcelas,
          total: total,
          whatsapp: PersonInfo.Whatsapp,
          cpf: PersonInfo.Cpf,
          endereco: {
            bairro: PersonInfo.Bairro,
            cep: PersonInfo.Cep,
            cidade: PersonInfo.Cidade,
            estado: PersonInfo.Estado,
            numero: PersonInfo.Numero,
            rua: PersonInfo.Endereco,
            complemento: PersonInfo.complemento
          },
          freteInfo: {
            servico: FreteInfo.servico,
            FreteValor: FreteInfo.FreteValor,
            prazo: FreteInfo.prazo
          }
        }
      )
      const PedidoMail = newPedidoMail()
      await PedidoMail.send({
        Produtos: Produtos,
        email: PersonInfo.email,
        idTransaction: response.id,
        method: 'cartao',
        status: response.status,
        freteInfo: FreteInfo
      })

      return Response.status(response.statusCode).json(response.body)
    } catch (error) {
      console.log(error)
      return Response.status(500).json(error)
    }
  }
}
