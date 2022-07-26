import ImageKit from 'imagekit';
import type { IKCallback } from 'imagekit/dist/libs/interfaces';

const imagekit: ImageKit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? '',
  urlEndpoint: 'https://ik.imagekit.io/rebelelectric/',
});

export const getAuthenticationParameters = () => {
  return imagekit.getAuthenticationParameters();
};

export const moveImage = async (sourceFilePath: string, destinationPath: string) => {
  await imagekit.moveFile({ sourceFilePath, destinationPath });
};

export const getImageDetailsByName = async (imageFileNames: string | string[]) => {
  let imageDetails = [];
  let ImageFileNames: string[] = [];
  if (typeof imageFileNames === 'string') {
    ImageFileNames.push(imageFileNames);
  } else ImageFileNames = imageFileNames;

  imageDetails = await Promise.all(
    ImageFileNames.map((imgName) =>
      imagekit.listFiles({
        name: imgName,
      })
    )
  );
  return imageDetails.map((image) => image[0]); //[0] for remove parent array which always have one item
};

export const deleteImage = async (fileName: string, fn?: IKCallback<void, Error>) => {
  const fileId = (await getImageDetailsByName(fileName))[0].fileId;
  if (fn) imagekit.deleteFile(fileId, fn);
  else await imagekit.deleteFile(fileId);
};
