export const ifData = (object, key, alt) => {
  return object ? (object[key] ? object[key] : alt) : alt;
};

export const getBigThumbSrc = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-big_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getSmallThumbSrc = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-small_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};

export const getFullSrc = (imgName, projName) => {
  const [imageName, imageExtension] = imgName.split(".");
  const underscoredProjectName = projName.split(" ").join("_");
  return `https://ik.imagekit.io/rebelelectric/ik-seo/tr:pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredProjectName}.${imageExtension}`;
};
