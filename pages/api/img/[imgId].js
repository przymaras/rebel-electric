import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/rebelelectric/",
});

export default function handler(req, res) {
  const { imgId } = req.query;

  imagekit.getFileDetails(imgId, (error, result) => {
    if (error) console.log(error);
    else res.status(200).json(result);
  });
}
