// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getAuthenticationParameters } from '../../../src/utils/imageKit-functions';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(getAuthenticationParameters());
}
