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

const isSameFile = (a: File, b: File): boolean => {
  return a.name === b.name && a.size === b.size && a.type === b.type;
};

const hasFile = (files: File[], targetFile: File): boolean => {
  return files.some((file) => {
    return isSameFile(file, targetFile);
  });
};

export { getImageURLFromOrigin, getFileName, isSameFile, hasFile };
const fileUtils = { getImageURLFromOrigin, getFileName, hasFile };
export default fileUtils;
