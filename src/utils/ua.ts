import UAParser from "ua-parser-js";

const isAndroid = (ua: string): boolean => {
  if (ua === "") {
    return false;
  }

  const os = UAParser(ua).os.name;

  if (os === undefined) {
    return false;
  }

  if (os === "Android" || os === "Android[-x86]") {
    return true;
  }

  return false;
};

const isApple = (ua: string): boolean => {
  if (ua === "") {
    return false;
  }
  const os = UAParser(ua).os.name;

  if (os === undefined) {
    return false;
  }

  if (os === "Mac OS" || os === "iOS") {
    return true;
  }

  return false;
};

const getOS = (ua: string): string => {
  if (ua === "") {
    return "";
  }
  const os = UAParser(ua).os.name;
  return os ? os : "";
};

export { isAndroid, isApple, getOS };
const ua = { isAndroid, isApple, getOS };
export default ua;
