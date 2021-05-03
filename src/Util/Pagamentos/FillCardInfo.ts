import { IProduto } from "../../typing/Interfaces/IProduto"
import {ICardPaymentInfo} from '../../typing/Interfaces/ICardInfo'
import { IFreteInfo } from "../../typing/Interfaces/IFreteInfo"

export const FillCardInfo = (PersonInfo: ICardPaymentInfo, Produtos: Array<IProduto>, total: number, FreteInfo: IFreteInfo) => {
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
    "shipping": {
      "name": PersonInfo.Nome,
      "fee": FreteInfo.FreteValor * 100,
      "expedited": true,
      "address": {
        "country": "br",
        "state": PersonInfo.Estado,
        "city": PersonInfo.Cidade,
        "neighborhood": PersonInfo.Bairro,
        "street": PersonInfo.Endereco,
        "street_number": PersonInfo.Numero,
        "zipcode": "06714360"
      }
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
        "zipcode": PersonInfo.Cep,
        "complementary": PersonInfo.complemento
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