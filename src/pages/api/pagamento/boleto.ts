import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import pagarme from 'pagarme';
import { IProduto } from '../../../Interfaces/IProduto';

export interface  IBoletoInfo{
  nome: string
  cpf: string,
  estado: string,
  cidade: string,
  bairro: string,
  rua: string,
  numero: string,
  cep: string
}

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {

  const paymentInfo:IBoletoInfo = Request.body.data.info
  const total = Request.body.data.total
  const Produtos: Array<IProduto> = Request.body.data.Produtos
  try{
    const datapayment = {
      capture: true,
      amount: total * 100,
      payment_method: 'boleto',
      postback_url: 'http://www.libidoss.com.br/api/postback',
      customer: {
        type: 'individual',
        country: 'br',
        name: paymentInfo.nome,
        documents: [
          {
            type: 'cpf',
            number: paymentInfo.cpf,
          },
        ],
      },
      "billing": {
        "name": paymentInfo.nome,
        "address": {
            "country": "br",
            "state": paymentInfo.estado,
            "city": paymentInfo.cidade,
            "neighborhood": paymentInfo.bairro,
            "street":  paymentInfo.rua,
            "street_number": paymentInfo.numero,
            "zipcode": paymentInfo.cep
        }
    },
      "items": Produtos.map((produto) => {
        return {
          "id": produto._id,
          "title": produto.Nome,
          "unit_price": produto.preco * 100,
          "quantity": produto.quantidade,
          "tangible": true
        }
      })
    }
      const response = await pagarme.client
      .connect({ api_key: process.env.PAGARME_APIKEY})
      .then((client: any) =>
        client.transactions.create(datapayment),
      )
      return Response.json(response)  
  } catch (error) {
    return Response.status(500).json(error)
  }
}
