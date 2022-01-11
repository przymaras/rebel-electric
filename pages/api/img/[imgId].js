import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/rebelelectric/",
});

export default async function handler(req, res) {
  let { imgId } = req.query;

  imgId = imgId.split("-");

  // console.log(imgId);

  const getDetails = async (imagesIds) => {
    let imagesDetails = [];
    imagesDetails = await Promise.all(
      imgId.map(async (oneImgId) => await imagekit.getFileDetails(oneImgId))
    );
    return imagesDetails;
  };

  try {
    res.status(200).json(await getDetails(imgId));
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// imagekit.getFileDetails(oneImgId, (error, result) => {
//   if (error) console.log(error);
//   else res.status(200).json(result);
// });
