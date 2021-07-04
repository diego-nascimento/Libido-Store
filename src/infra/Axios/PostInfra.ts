import { IPostEntry, IPostInfra } from '../../data/protocols/http/IPost-infra'
import { HttpResponse } from '../../domain/protocols/IHttpHelpers'
import { api } from './AxiosApi'

export class PostInfra implements IPostInfra {
  async Post ({ body, url }: IPostEntry): Promise<HttpResponse> {
    try {
      const response = await api.post(url, body)
      switch (response.status) {
        case 200:
          return {
            StatusCode: 200,
            body: response.data
          }
        default:
          return {
            StatusCode: response.status,
            body: response.data
          }
      }
    } catch (error: any) {
      return {
        StatusCode: error.response.status,
        body: error.response.data
      }
    }
  }
}
