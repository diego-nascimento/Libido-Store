import { IImagem } from './IImagem'
import { ICategoria } from './ICategoria'

export interface IProduto{
  _id: string,
  Nome: string,
  imagens: Array<IImagem>
  categorias: Array<ICategoria>
  listPrice: number
  saleprice: number
  descricao: string
  especificacao: string
  pronta: boolean
  quantidade?: number
  subtotal?: number
}
