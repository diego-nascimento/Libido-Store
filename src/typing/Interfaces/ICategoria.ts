import { IImagem } from '../Interfaces/IImagem'

export interface ICategoria{
  _id: string
  Nome: string,
  Imagem: IImagem,
  banner?: IImagem
}
