import { IProduto } from '../../Interfaces/IProduto'
import { IBoletoInfo } from '../../pages/api/pagamento/boleto'


export const FillBoletoInfo = (paymentInfo: IBoletoInfo, Produtos: Array<IProduto>, total: number) => {
  const datapayment = {
    capture: true,
    amount: total * 100,
    payment_method: 'boleto',
    postback_url: `${process.env.POSTBACK_URL}/api/pagamento/postback`,
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
  return datapayment
}