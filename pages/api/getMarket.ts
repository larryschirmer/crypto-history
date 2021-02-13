import type { NextApiRequest, NextApiResponse } from 'next';

const apiBaseUrl = 'https://api.coingecko.com/api/v3';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ text: 'Hello' });
}
