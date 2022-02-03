export const dataOrOther = (
  value: string | undefined,
  valueOther: string | undefined,
  t: Function
) => {
  let returnValue: string | undefined = value
    ? value
    : (t("hangar:unknown") as string);

  if (value === "other") returnValue = valueOther;

  return returnValue;
};

export const translateOrOther = (
  value: string | undefined,
  valueOther: string | undefined,
  t: Function
) => {
  let returnValue = t(`hangar:${value ? value : "unknown"}`);

  if (value === "other") returnValue = valueOther;

  return returnValue;
};

export const roundNum = (number: number | string | undefined) => {
  let value = Math.round(Number(number) * 100) / 100;
  return value ? value : undefined;
};

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
