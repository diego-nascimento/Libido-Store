import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import pagarme from 'pagarme';

export interface  IBoletoInfo{
  nome: string
  cpf: string
}

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {

  const paymentInfo:IBoletoInfo = Request.body.data.info
  const total = Request.body.data.total


  const datapayment = {
    capture: true,
    amount: total * 100,
    payment_method: 'boleto',
    postback_url: 'http://www.libidoss.com.br/api/postback/pkt7pgpk',
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
    }
  }
    const response = await pagarme.client
    .connect({ api_key: process.env.PAGARME_APIKEY})
    .then((client: any) =>
      client.transactions.create(datapayment),
    )
    return Response.json(response)
  
  
}
