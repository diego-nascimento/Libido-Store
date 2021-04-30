
import { HttpRequest, HttpResponse } from '../../../domain/protocols/IHttpHelpers';
import {IPost} from '../../../domain/useCases/http/Post/Post-Domain'
import { IPostInfra} from '../../protocols/http/IPost-infra';

export class PostData implements IPost{
  private readonly PostInfra: IPostInfra

  constructor(PostInfra: IPostInfra) {
    this.PostInfra = PostInfra
  }

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse>{
    return this.PostInfra.Post({
      body: HttpRequest.body,
      url: HttpRequest.url
    })
  }
}