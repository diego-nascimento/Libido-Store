import { HttpResponse } from '../../../domain/protocols/IHttpHelpers'

export interface IPostEntry{
  body: any
  url: string
}

export interface IPostInfra{
  Post({ body, url }: IPostEntry): Promise<HttpResponse>
}
