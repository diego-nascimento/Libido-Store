import { IImagem } from "./IImagem";
import {ICategoria} from './ICategoria'

export interface IProduto{
  _id: string,
  Nome: string, 
  imagem: IImagem
  categoria: ICategoria
}