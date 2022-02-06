import { VehiclesCategories } from "../models/hangar";

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

export const getSelectedCategoriesNamesAndImages = (
  cat: VehiclesCategories,
  selected: number[] | string[]
) => {
  let categoriesNames: string[][] = [];
  let currentIndex = -1;

  const getNames: (
    cat: VehiclesCategories,
    selected: number[] | string[]
  ) => void = (cat, selected) => {
    currentIndex++;
    if (
      selected[currentIndex] !== undefined &&
      cat.categories[Number(selected[currentIndex])] !== undefined
    ) {
      if (cat.categories[Number(selected[currentIndex])].child) {
        categoriesNames = [
          ...categoriesNames,
          [
            cat.catTitle,
            cat.categories[Number(selected[currentIndex])].name,
            cat.categories[Number(selected[currentIndex])].image,
          ],
        ];
        getNames(
          cat.categories[Number(selected[currentIndex])].child!,
          selected
        );
      } else {
        categoriesNames = [
          ...categoriesNames,
          [
            cat.catTitle,
            cat.categories[Number(selected[currentIndex])].name,
            cat.categories[Number(selected[currentIndex])].image,
          ],
        ];
      }
    }
  };

  getNames(cat, selected);
  return categoriesNames;
};
