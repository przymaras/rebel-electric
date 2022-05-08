import type { Translate } from 'next-translate';

import { VehiclesCategories } from 'src/modules/hangar/types/hangar';

export const dataOrOther = (
  value: string | undefined,
  valueOther: string | undefined,
  t: Translate
) => {
  let returnValue: string | undefined = value ? value : t('hangar:unknown');

  if (value === 'other') returnValue = valueOther;

  return returnValue;
};

export const translateOrOther = (
  value: string | undefined,
  valueOther: string | undefined,
  t: Translate
) => {
  let returnValue = t(`hangar:${value ? value : 'unknown'}`);

  if (value === 'other' && valueOther) returnValue = valueOther;

  return returnValue;
};

export const roundNum = (number: number | string | undefined) => {
  const value = Math.round(Number(number) * 100) / 100;
  return value ? value : undefined;
};

type ImgProjNameFn = (imgName: string, projName: string) => string;

export const getBigThumbSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split('.');
  const underscoredProjectName = projName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-big_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getSmallThumbSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split('.');
  const underscoredProjectName = projName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-small_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getFullSrc: ImgProjNameFn = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split('.');
  const underscoredProjectName = projName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getSelectedCategoryId = (
  cat: VehiclesCategories,
  selected: number[],
  allowPartialSelection?: boolean
) => {
  if (selected[0] === -1) return;
  let categoryID: string = '';
  let level = -1;

  const getId: (
    catArr: VehiclesCategories,
    selected: number[],
    allowPartialSelection: boolean
  ) => void = (catArr, selectedGetId, allowPartialSelectionGetId = false) => {
    level++;
    if (catArr === undefined) return;
    if (selectedGetId[level] === undefined) return;
    if (selectedGetId[level] === -1) return;

    // this is for hangar filtering by category where user select only part of category tree
    if (selectedGetId[level + 1] === -1 && allowPartialSelectionGetId) {
      categoryID = catArr.categories[selectedGetId[level]].id;
      return;
    }

    if (level === selectedGetId.length - 1 && selectedGetId[level] !== -1) {
      categoryID = catArr.categories[selectedGetId[level]].id;
      return;
    }

    if (catArr.categories[selectedGetId[level]].child) {
      getId(
        catArr.categories[selectedGetId[level]].child!,
        selectedGetId,
        allowPartialSelectionGetId
      );
    }
  };

  getId(cat, selected, allowPartialSelection ?? false);
  return categoryID;
};

export const getSelectedCategoryTreeInfo = (cat: VehiclesCategories, id: string) => {
  if (!id) return;
  const categoriesIndexes: number[] = [];
  const categoriesIDs: string[] = [];
  const categoriesNames: string[] = [];
  const categoriesImages: string[] = [];
  let restCategories: VehiclesCategories | undefined;
  let restIDs: string[] = [];

  let level = 0;
  let idFound = false;

  const getInfo: (catArr: VehiclesCategories | undefined, id: string) => void = (
    catArr,
    idGetInfo
  ) => {
    if (catArr === undefined) return;

    //search for given id in this level of categories
    const foundIndex = catArr.categories.findIndex((category) => category.id === idGetInfo);

    //if found push it's index number at index [level] to "categoriesInfoArray" and return
    if (foundIndex !== -1) {
      categoriesIndexes[level] = foundIndex;
      categoriesIndexes.splice(level + 1);

      categoriesIDs[level] = catArr.categories[foundIndex].id;
      categoriesIDs.splice(level + 1);

      categoriesNames[level] = catArr.categories[foundIndex].name;
      categoriesNames.splice(level + 1);

      categoriesImages[level] = catArr.categories[foundIndex].image;
      categoriesImages.splice(level + 1);

      restCategories = catArr.categories[foundIndex].child;
      restIDs = [...restIDs, catArr.categories[foundIndex].id];

      idFound = true;
      return;
    }

    //else get first category, check if it has child categories
    catArr.categories.some((category, i) => {
      const tempLevel = level;

      if (category.child) {
        //if it has child categories temporaryly push this category index at index[level] of "categoriesInfoArray"
        categoriesIndexes[level] = i;
        categoriesIDs[level] = category.id;
        categoriesNames[level] = category.name;
        categoriesImages[level] = category.image;

        //repeat until idFound or no more children
        level++;
        getInfo(category.child, idGetInfo);
      }

      //if idFound then break .some method and return
      if (idFound) return true;

      level = tempLevel;
    });
  };

  const getRestIDs: (catArr: VehiclesCategories | undefined) => void = (catArr) => {
    if (!catArr) return;

    catArr.categories.forEach((category) => {
      restIDs = [...restIDs, category.id];
      if (category.child && !category.child.powerRelated) {
        getRestIDs(category.child);
      }
    });
  };

  getInfo(cat, id);
  getRestIDs(restCategories);

  return {
    categoriesIndexes,
    categoriesIDs,
    categoriesNames,
    categoriesImages,
    restIDs,
  };
};
