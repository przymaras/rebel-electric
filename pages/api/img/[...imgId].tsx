import type { NextApiRequest, NextApiResponse } from "next";
import { getImageDetailsByName } from "../../../components/tools/imageKit-functions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { imgId } = req.query;

  // console.log(imgId);

  try {
    res.status(200).json(await getImageDetailsByName(imgId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
