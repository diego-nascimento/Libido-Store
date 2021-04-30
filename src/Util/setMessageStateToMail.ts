

export type IMessages = {
  paid: string,
  processing: string,
  refunded: string,
  waiting_payment: string,
  pending_refund: string
}

export const messages = {
  paid: 'Pago',
  processing: 'Processando Pagamento',
  refunded: 'Estornado',
  waiting_payment: 'Aguardando Pagamento',
  pending_refund: 'Estorno Pendente',
}

