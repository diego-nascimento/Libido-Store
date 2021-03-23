import axios from 'axios';
import { ICategoria } from '../Interfaces/ICategoria';

export const getCategorias =  async (): Promise<[ICategoria]> => {
  const response = await axios.get('http://localhost:1337/categorias');
  
  return response.data
};
