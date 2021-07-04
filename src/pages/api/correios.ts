import { NextApiRequest, NextApiResponse } from 'next'
import { PostFactory } from '../../Factory/http/PostFactory'
import { normalize } from '../../Util/Normalize'
import convert from 'xml-js'

export default async function handler (
  Request: NextApiRequest,
  Response: NextApiResponse
) {
  if (Request.method === 'POST') {
    const cep: string = Request.body.cep
    const servico: string = Request.body.servico

    const api = PostFactory()
    const response = await api.handle({
      url: `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=36170000&sCepDestino=${normalize(cep)}&nVlPeso=1&nCdFormato=1&nVlComprimento=15&nVlAltura=10&nVlLargura=10&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${servico}&nVlDiametro=30&StrRetorno=xml&nIndicaCalculo=3`,
      body: null
    })

    const frete = convert.xml2json(response.body, { compact: true })

    return Response.json(frete)
  }
}
