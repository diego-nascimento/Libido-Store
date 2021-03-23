import axios from 'axios';
import { IProduto } from '../Interfaces/Iproduto';


export const getNovidades = async ():Promise<[IProduto]> => {
  const response = await axios.get('http://192.168.0.16:1337/produtos?novidade=1');
  return response.data
};
