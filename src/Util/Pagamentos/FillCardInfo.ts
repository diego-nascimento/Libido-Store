import { IProduto } from "../../Interfaces/IProduto"
import {ICardPaymentInfo} from '../../Interfaces/ICardInfo'

export const FillCardInfo = (PersonInfo: ICardPaymentInfo, Produtos: Array<IProduto>, total: number) => {
  const datapayment = {
    "capture": true,
    "postback_url": `${process.env.POSTBACK_URL}/api/pagamento/postback`,
    "amount": total * 100,
    "card_number": PersonInfo.cardInfo.CardNumber,
    "card_cvv": PersonInfo.cardInfo.CardCVC,
    "card_expiration_date": PersonInfo.cardInfo.CardExpire,
    "card_holder_name": PersonInfo.cardInfo.CardName,
    "installments": PersonInfo.cardInfo.parcelas,
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
  return datapayment
}