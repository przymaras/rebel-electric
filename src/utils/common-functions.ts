import type { Translate } from 'next-translate';

import { VehiclesCategories } from 'src/modules/hangar/types/hangar';

const imgTargetDir = process.env.NEXT_PUBLIC_IMAGEKIT_DIRECTORY ?? '/hangar/';

interface GetMaybeOtherValueProps {
  value: string | undefined;
  otherValue: string | undefined;
}

interface GetMaybeOtherValueOrTProps {
  value: string | undefined;
  otherValue: string | undefined;
}

interface GetImgSrcProps {
  imageName: string;
  seoName: string;
}
export const maybeOtherValue = (fallback: string) => {
  /**It checks if value === 'other'
   *
   * If YES returns otherValue, if NO returns value.
   *
   * OR returns fallback if undefined*/
  const getMaybeOtherValue = ({
    otherValue = fallback,
    value = fallback,
  }: GetMaybeOtherValueProps) => {
    return value === 'other' ? otherValue : value;
  };
  return { getMaybeOtherValue };
};

export const maybeOtherValueOrT = (fallback: string, t: Translate) => {
  /**It checks if value === 'other'
   *
   * If YES returns otherValue, if NO returns proper translation for value.
   *
   * OR returns fallback if undefined*/
  const getMaybeOtherValueOrT = ({ otherValue = fallback, value }: GetMaybeOtherValueOrTProps) => {
    return value === 'other' ? otherValue : t(`hangar:${value ? value : 'unknown'}`);
  };
  return { getMaybeOtherValueOrT };
};

/** Rounds number to 2 decimal places.
 *
 *  If not a number it returns undefined
 */
export const roundDec2 = (number: number | string | undefined) => {
  const value = Math.round(Number(number) * 100) / 100;
  return value ? value : undefined;
};

/** Returns SEO friendly URL of BIG THUMB image */
export const getBigThumbSrc = ({ imageName, seoName }: GetImgSrcProps) => {
  const [name, extension] = imageName.split('.');
  const underscoredProjectName = seoName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-big_thumb,pr-true,di-rebel.jpg${imgTargetDir}${name}/${underscoredProjectName}.${extension}`;
};

/** Returns SEO friendly URL of SMALL THUMB image */
export const getSmallThumbSrc = ({ imageName, seoName }: GetImgSrcProps) => {
  const [name, extension] = imageName.split('.');
  const underscoredProjectName = seoName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-small_thumb,pr-true,di-rebel.jpg${imgTargetDir}${name}/${underscoredProjectName}.${extension}`;
};

/** Returns SEO friendly URL of FULL SIZE image */
export const getFullSrc = ({ imageName, seoName }: GetImgSrcProps) => {
  const [name, extension] = imageName.split('.');
  const underscoredProjectName = seoName.split(' ').join('_');
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:pr-true,di-rebel.jpg${imgTargetDir}${name}/${underscoredProjectName}.${extension}`;
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
