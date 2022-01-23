import ImageKit from "imagekit";

const imagekit: ImageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
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

export const moveImage = async (source: string, destination: string) => {
  return await imagekit.moveFile(source, destination);
};

export const getImageDetailsByName = async (
  imageFileNames: string | string[]
) => {
  let imagesDetails = [];
  let ImageFilesNamesArray: string[] = [];
  if (typeof imageFileNames === "string") {
    ImageFilesNamesArray.push(imageFileNames);
  } else ImageFilesNamesArray = imageFileNames;

  imagesDetails = await Promise.all(
    ImageFilesNamesArray.map(
      async (imgName) =>
        await imagekit.listFiles({
          name: imgName,
        })
    )
  );
  return imagesDetails.map((image) => image[0]); //[0] for remove parent array which always have one item
};
