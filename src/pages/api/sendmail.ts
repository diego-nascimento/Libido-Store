import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(Request: NextApiRequest, Response: NextApiResponse ) {
  Response.status(200).json({ name: 'John Doe' })
}