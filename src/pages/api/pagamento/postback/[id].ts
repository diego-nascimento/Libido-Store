import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(
  Request: NextApiRequest,
  Response: NextApiResponse,
) {
  if (Request.method === 'GET') {
    return Response.json('funcionou')
  }
}
