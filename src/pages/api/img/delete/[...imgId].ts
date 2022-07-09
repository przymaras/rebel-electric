import type { NextApiRequest, NextApiResponse } from 'next';

import { deleteImage } from 'src/utils/imageKit-functions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { imgId } = req.query;
  let imageName: string;
  if (typeof imgId === 'string') imageName = imgId;
  else imageName = imgId[0];

  try {
    await deleteImage(imageName, (error, result) => {
      if (error) res.status(500).json({ deleteFile: 'error', error });
      else res.status(200).json({ deleteFile: 'success', result });
    });
  } catch (err) {
    let message = 'unknown error';
    if (err instanceof Error) message = err?.message;
    res.status(500).json({ deleteFile: message });
  }
}
