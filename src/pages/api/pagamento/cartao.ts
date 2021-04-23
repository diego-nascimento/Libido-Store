import { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import pagarme from 'pagarme';
import { IProduto } from '../../../Interfaces/IProduto';



export interface ICardPaymentInfo{
  Nome: string,
  Cpf: string,
  Whatsapp: string,
  email: string,
  Endereco: string,
  Numero: string,
  Bairro: string,
  Cep: string
  Cidade: string,
  Estado: string,
  cardInfo: {
    CardNumber: string,
    CardExpire: string,
    CardName: string,
    CardCVC: string
  }
}

export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {

  if (Request.method === 'POST') {
    try {
      const PersonInfo: ICardPaymentInfo = Request.body.data.info
      const Produtos: Array<IProduto> = Request.body.data.produtos
      const total: number = Request.body.data.total
      const datapayment = {
        "capture": true,
        "amount": total * 100,
        "card_number": PersonInfo.cardInfo.CardNumber,
        "card_cvv": PersonInfo.cardInfo.CardCVC,
        "card_expiration_date": PersonInfo.cardInfo.CardExpire,
        "card_holder_name": PersonInfo.cardInfo.CardName,
        "customer": {
          "external_id": "#3311",
          "name": PersonInfo.Nome,
          "type": "individual",
          "country": "br",
          "email": PersonInfo.email,
          "documents": [
            {
              "type": "cpf",
              "number": PersonInfo.Cpf
            }
          ],
          "phone_numbers": [`+55${PersonInfo.Whatsapp}`],
        },
        "billing": {
          "name": PersonInfo.Nome,
          "address": {
            "country": "br",
            "state": PersonInfo.Estado,
            "city": PersonInfo.Cidade,
            "neighborhood": PersonInfo.Bairro,
            "street": PersonInfo.Endereco,
            "street_number": PersonInfo.Numero,
            "zipcode": PersonInfo.Cep
          }
        },
        "shipping": {
          "name": PersonInfo.Nome,
          "expedited": true,
          "fee": 1000,
          "address": {
            "country": "br",
            "state": PersonInfo.Estado,
            "city": PersonInfo.Cidade,
            "neighborhood": PersonInfo.Bairro,
            "street": PersonInfo.Endereco,
            "street_number": PersonInfo.Numero,
            "zipcode": PersonInfo.Cep
          }
        },
        "items": Produtos.map(produto => {
          return {
            "id": produto._id,
            "title": produto.Nome,
            "unit_price": produto.preco * 100,
            "quantity": produto.quantidade,
            "tangible": true
          }
        })

      }
      console.log(process.env.PAGAR)
      const response = await pagarme.client
        .connect({ api_key: process.env.PAGARME_APIKEY})
        .then((client: any) =>
          client.transactions.create(datapayment),
        )
      return Response.json(response)
    } catch (error) {
      return Response.json(error)
    
    }
  }
}
