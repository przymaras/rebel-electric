// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/rebelelectric/",
});

export default function handler(req, res) {
  res.status(200).json(imagekit.getAuthenticationParameters());
}
