import { IProduto } from '../../typing/Interfaces/IProduto'
import { IBoletoInfo } from '../../pages/api/pagamento/boleto'
import { IFreteInfo } from '../../typing/Interfaces/IFreteInfo'

export const FillBoletoInfo = (paymentInfo: IBoletoInfo, Produtos: Array<IProduto>, total: number, FreteInfo: IFreteInfo) => {
  const datapayment = {
    amount: total * 100,
    async: false,
    payment_method: 'boleto',
    postback_url: `${process.env.POSTBACK_URL}/api/pagamento/postback`,
    customer: {
      type: 'individual',
      country: 'br',
      name: paymentInfo.nome,
      documents: [
        {
          type: 'cpf',
          number: paymentInfo.cpf
        }
      ]
    },
    shipping: {
      name: paymentInfo.nome,
      fee: FreteInfo.FreteValor * 100,
      expedited: true,
      address: {
        country: 'br',
        state: paymentInfo.estado,
        city: paymentInfo.cidade,
        neighborhood: paymentInfo.bairro,
        street: paymentInfo.rua,
        street_number: paymentInfo.numero,
        zipcode: '06714360'
      }
    },
    billing: {
      name: paymentInfo.nome,
      address: {
        country: 'br',
        state: paymentInfo.estado,
        city: paymentInfo.cidade,
        neighborhood: paymentInfo.bairro,
        street: paymentInfo.rua,
        street_number: paymentInfo.numero,
        zipcode: paymentInfo.cep,
        complementary: paymentInfo.complemento
      }
    },
    items: Produtos.map((produto) => {
      return {
        id: produto._id,
        title: produto.Nome,
        unit_price: produto.saleprice * 100,
        quantity: produto.quantidade,
        tangible: true
      }
    })
  }
  return datapayment
}
