export interface ICardPaymentInfo{
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
  cardInfo: {
    CardNumber: string,
    CardExpire: string,
    CardName: string,
    CardCVC: string
    parcelas: number
  }
}
