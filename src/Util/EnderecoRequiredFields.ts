
interface IRequiredFields{
    field: string,
    response: string
}

export const  requiredFields: Array<IRequiredFields> = [
  {
  field: 'Endereco',
  response: 'address'
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
    response: 'district'
  },
  
]