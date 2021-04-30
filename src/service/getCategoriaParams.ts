import { ICategoria } from '../typing/Interfaces/ICategoria';
import { api } from './api'

export const getCategoriaParams = async () => {
  const response = await api.get('/categorias')

  const params: { params: { id: string } }[] = []
  response.data.forEach((element:ICategoria) => {
    params.push({
      params: {
        id: element._id,
      },
    });
  });

  return params 
}