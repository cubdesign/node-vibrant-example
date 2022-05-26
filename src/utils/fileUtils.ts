const getImageURLFromOrigin = (filePath: string, origin: string): string => {
  const imageURL: string = /^(https:|http:|blob:)/.test(filePath)
    ? filePath
    : `${origin}${filePath}`;

  return imageURL;
};

/**
 * URLからファイル名を取得する
 */
const getFileName = (url: string): string => {
  let fileName: string = url.substring(url.lastIndexOf("/") + 1);
  fileName = fileName.split("?")[0];
  return fileName;
};

export { getImageURLFromOrigin, getFileName };
const fileUtils = { getImageURLFromOrigin, getFileName };
export default fileUtils;
