import { IGetInfra, IGetEntry } from '../../../data/protocols/http/IGet-Infra'
import { HttpResponse } from '../../../domain/protocols/IHttpHelpers'
import axios from 'axios'

export class GetInfra implements IGetInfra {
  async Get ({ body, url }: IGetEntry): Promise<HttpResponse> {
    try {
      const response = await axios.get(url, {
        data: body
      })

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
      default:
        return {
          StatusCode: response.status,
          body: response.data
        }
      }
    } catch (error) {
      return {
        StatusCode: 500,
        body: 'Algo deu Errado, Tente mais tarde'
      }
    }
  }
}
