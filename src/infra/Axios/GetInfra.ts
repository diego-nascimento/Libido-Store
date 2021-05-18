import { IGetInfra, IGetEntry } from '../../data/protocols/http/IGet-Infra';
import { HttpResponse } from '../../domain/protocols/IHttpHelpers';
import { api } from './AxiosApi'

export class GetInfra implements IGetInfra{
  async Get({ body, url }: IGetEntry): Promise<HttpResponse>{
    try {
      const response = await api.get(url, body)
      switch (response.status) {
        case 200:
          return {
            StatusCode: 200,
            body: response.data
          }
        case 400:
        case 404:
          return {
            StatusCode: response.status,
            body: 'Não Encontrado'
          }
      }
      
      return {
        StatusCode: response.status,
        body: response.data
      }
    } catch (error) {
      console.log(error)
      return {
        
        StatusCode: 500,
        body: 'Algo deu Errado, Tente mais tarde'
      }
    }
  }
}