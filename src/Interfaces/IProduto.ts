import { IImagem } from "./IImagem";
import {ICategoria} from './ICategoria'

export interface IProduto{
  _id: string,
  Nome: string, 
  imagem: IImagem
  categorias: Array<ICategoria>
  preco: number
  descricao: string
  especificacao: string
  pronta: boolean
  quantidade?: number
  subtotal?: number
}