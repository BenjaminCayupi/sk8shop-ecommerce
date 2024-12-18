export const imageSrc = (url: string): string => {
  return url.startsWith("https") ? url : "/imgs/placeholder-image.jpg";
};
