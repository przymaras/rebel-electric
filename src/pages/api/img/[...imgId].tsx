import type { NextApiRequest, NextApiResponse } from 'next';

import { getImageDetailsByName } from 'src/utils/imageKit-functions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imgId } = req.query;
  if (!imgId) {
    res.status(500).json({ error: 'no id' });
    return;
  }
  try {
    res.status(200).json(await getImageDetailsByName(imgId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
