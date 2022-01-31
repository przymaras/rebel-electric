export const ifData = (object: any, key: string, alt: any) => {
  return object ? (object[key] ? object[key] : alt) : alt;
};

export const ifDataOther = (
  object: any,
  key: string,
  keyOther: string,
  alt: any
) => {
  let value = alt;

  if (object) {
    if (object[key]) {
      if (object[key] === "other" && object[keyOther]) {
        value = object[keyOther];
      } else {
        value = object[key];
      }
    }
  }

  return value;
};

export const roundNum = (number: number) => Math.round(number * 100) / 100;

type ImgProjNameFn = (imgName: string, projName: string) => string;

export const getBigThumbSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-big_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getSmallThumbSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-small_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getFullSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};
