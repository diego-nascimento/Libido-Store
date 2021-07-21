import { IPostEntry, IPostInfra } from '../../data/protocols/http/IPost-infra'
import { HttpResponse } from '../../domain/protocols/IHttpHelpers'
import axios from 'axios'

export class PostInfra implements IPostInfra {
  async Post ({ body, url }: IPostEntry): Promise<HttpResponse> {
    try {
      const response = await axios({
        method: 'POST',
        url: `${process.env.APIURL}/${url}`,
        data: body
      })
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
