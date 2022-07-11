import ImageKit from 'imagekit';
import type { IKCallback } from 'imagekit/dist/libs/interfaces';

const imagekit: ImageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? '',
  urlEndpoint: 'https://ik.imagekit.io/rebelelectric/',
});

// export const getImageDetails = async (imagesIds) => {
//   let imagesDetails = [];
//   imagesDetails = await Promise.all(
//     imagesIds.map(async (oneImgId) => await imagekit.getFileDetails(oneImgId))
//   );
//   return imagesDetails;
// };

export const getAuthenticationParameters = () => {
  return imagekit.getAuthenticationParameters();
};

export const moveImage = async (sourceFilePath: string, destinationPath: string) => {
  await imagekit.moveFile({ sourceFilePath, destinationPath });
};

export const getImageDetailsByName = async (imageFileNames: string | string[]) => {
  let imagesDetails = [];
  let ImageFilesNamesArray: string[] = [];
  if (typeof imageFileNames === 'string') {
    ImageFilesNamesArray.push(imageFileNames);
  } else ImageFilesNamesArray = imageFileNames;

  imagesDetails = await Promise.all(
    ImageFilesNamesArray.map((imgName) =>
      imagekit.listFiles({
        name: imgName,
      })
    )
  );
  return imagesDetails.map((image) => image[0]); //[0] for remove parent array which always have one item
};

export const deleteImage = async (fileName: string, fn?: IKCallback<void, Error>) => {
  const fileId = (await getImageDetailsByName(fileName))[0].fileId;
  if (fn) imagekit.deleteFile(fileId, fn);
  else await imagekit.deleteFile(fileId);
};
