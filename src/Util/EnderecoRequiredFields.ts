
interface IRequiredFields{
    field: string,
    response: string
}

export const requiredFields: Array<IRequiredFields> = [
  {
    field: 'Endereco',
    response: 'street'
  },
  {
    field: 'Estado',
    response: 'state'
  },
  {
    field: 'Cidade',
    response: 'city'
  },
  {
    field: 'Bairro',
    response: 'neighborhood'
  }

]
