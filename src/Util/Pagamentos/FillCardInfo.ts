import { IProduto } from '../../typing/Interfaces/IProduto'
import { ICardPaymentInfo } from '../../typing/Interfaces/ICardInfo'
import { IFreteInfo } from '../../typing/Interfaces/IFreteInfo'

export const FillCardInfo = (PersonInfo: ICardPaymentInfo, Produtos: Array<IProduto>, total: number, FreteInfo: IFreteInfo) => {
  const datapayment = {
    capture: true,
    async: 'false',
    postback_url: `${process.env.POSTBACK_URL}/api/pagamento/postback`,
    amount: total * 100,
    card_number: PersonInfo.cardInfo.CardNumber,
    card_cvv: PersonInfo.cardInfo.CardCVC,
    card_expiration_date: PersonInfo.cardInfo.CardExpire,
    card_holder_name: PersonInfo.cardInfo.CardName,
    installments: PersonInfo.cardInfo.parcelas,
    customer: {
      external_id: '#3311',
      name: PersonInfo.nome,
      type: 'individual',
      country: 'br',
      email: PersonInfo.email,
      documents: [
        {
          type: 'cpf',
          number: PersonInfo.cpf
        }
      ],
      phone_numbers: [`+55${PersonInfo.whatsapp}`]
    },
    shipping: {
      name: PersonInfo.nome,
      fee: FreteInfo.FreteValor * 100,
      expedited: true,
      address: {
        country: 'br',
        state: PersonInfo.estado,
        city: PersonInfo.cidade,
        neighborhood: PersonInfo.bairro,
        street: PersonInfo.rua,
        street_number: PersonInfo.numero,
        zipcode: '06714360'
      }
    },
    billing: {
      name: PersonInfo.nome,
      address: {
        country: 'br',
        state: PersonInfo.estado,
        city: PersonInfo.cidade,
        neighborhood: PersonInfo.bairro,
        street: PersonInfo.rua,
        street_number: PersonInfo.numero,
        zipcode: PersonInfo.cep,
        complementary: PersonInfo.complemento
      }
    },
    items: Produtos.map(produto => {
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
