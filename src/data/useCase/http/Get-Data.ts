
import { HttpRequest, HttpResponse } from '../../../domain/protocols/IHttpHelpers';
import {IGet} from '../../../domain/useCases/http/Get/Get-Domain'
import { IGetInfra } from '../../protocols/http/IGet-Infra';

export class GetData implements IGet{
  private readonly GetInfra: IGetInfra

  constructor(GetInfra: IGetInfra) {
    this.GetInfra = GetInfra
  }

  async handle(HttpRequest: HttpRequest): Promise<HttpResponse>{
    return this.GetInfra.Get({
      body: HttpRequest.body,
      url: HttpRequest.url
    })
  }
}