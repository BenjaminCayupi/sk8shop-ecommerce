export const imageSrc = (url: string): string => {
  return url.startsWith("https") ? url : "/imgs/placeholder-image.jpg";
};

export const paramNumber = (
  param: string | undefined,
  defaultValue?: number
) => {
  if (defaultValue) {
    if (!param) return defaultValue;

    return isNaN(+param) ? defaultValue : +param;
  }
  if (!param) return 1;

  return isNaN(+param) ? 1 : +param;
};

type rowsPerPage = 5 | 10 | 15;

export const paramTake = (param: string | undefined): rowsPerPage => {
  if (!param) return 5;

  const valid = +param;

  if (isNaN(valid)) return 5;

  if (valid !== 5 && valid !== 10 && valid !== 15) return 5;

  return valid as rowsPerPage;
};
