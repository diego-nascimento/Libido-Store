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