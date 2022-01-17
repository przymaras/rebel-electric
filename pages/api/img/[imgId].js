import { getImageDetailsByName } from "../../../components/tools/imageKit-functions";

export default async function handler(req, res) {
  let { imgId } = req.query;

  imgId = imgId.split("-|-");

  // console.log(imgId);

  try {
    res.status(200).json(await getImageDetailsByName(imgId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
