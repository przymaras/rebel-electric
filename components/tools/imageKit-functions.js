import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: "https://ik.imagekit.io/rebelelectric/",
});

// export const getImageDetails = async (imagesIds) => {
//   let imagesDetails = [];
//   imagesDetails = await Promise.all(
//     imagesIds.map(async (oneImgId) => await imagekit.getFileDetails(oneImgId))
//   );
//   return imagesDetails;
// };

export const getAuthenticationParameters = async () => {
  return await imagekit.getAuthenticationParameters();
};

export const moveImage = async (source, destination) => {
  return await imagekit.moveFile(source, destination);
};

export const getImageDetailsByName = async (filesNames) => {
  let imagesDetails = [];
  imagesDetails = await Promise.all(
    filesNames.map(
      async (oneImgName) =>
        await imagekit.listFiles({
          name: oneImgName,
        })
    )
  );
  return imagesDetails.map((image) => image[0]); //[0] for remove parent array which always have one item
};
