import { getOS, isAndroid, isApple } from "@/utils/ua";
import { UA } from "__tests__/testData/ua";

describe("Test getOS", () => {
  it("UAが空だったら空文字を返す", () => {
    expect(getOS("")).toBe("");
  });
  it("macの判定が正しくできる", () => {
    expect(getOS(UA.MacBook_12_Chrome)).toBe("Mac OS");
  });
  it("iPhoneの判定が正しくできる", () => {
    expect(getOS(UA.iPhone_Safari)).toBe("iOS");
  });
  it("iPadの判定が正しくできる（Mac OSとして扱われる）", () => {
    expect(getOS(UA.iPadPro_2018_11_Safari)).toBe("Mac OS");
  });
  it("Androidの判定が正しくできる", () => {
    expect(getOS(UA.Android_Chrome)).toBe("Android");
  });
  it("Windowsの判定が正しくできる", () => {
    expect(getOS(UA.Windows10_Edge)).toBe("Windows");
    expect(getOS(UA.Windows11_Edge)).toBe("Windows");
  });
});

describe("isApple", () => {
  it("UAが空だったらFalse", () => {
    expect(isApple("")).toBeFalsy();
  });
  it("macはTrue", () => {
    expect(isApple(UA.MacBook_12_Chrome)).toBeTruthy();
  });
  it("iPhoneはTrue", () => {
    expect(isApple(UA.iPhone_Safari)).toBeTruthy();
  });
  it("iPadはTrue", () => {
    expect(isApple(UA.iPadPro_2018_11_Safari)).toBeTruthy();
  });
  it("AndroidはFalse", () => {
    expect(isApple(UA.Android_Chrome)).toBeFalsy();
  });
  it("WindowsはFalse", () => {
    expect(isApple(UA.Windows10_Edge)).toBeFalsy();
    expect(isApple(UA.Windows11_Edge)).toBeFalsy();
  });
});

describe("isAndroid", () => {
  it("UAが空だったらFalse", () => {
    expect(isAndroid("")).toBeFalsy();
  });
  it("macはFalse", () => {
    expect(isAndroid(UA.MacBook_12_Chrome)).toBeFalsy();
  });
  it("iPhoneはFalse", () => {
    expect(isAndroid(UA.iPhone_Safari)).toBeFalsy();
  });
  it("iPadはFalse", () => {
    expect(isAndroid(UA.iPadPro_2018_11_Safari)).toBeFalsy();
  });
  it("AndroidはTrue", () => {
    expect(isAndroid(UA.Android_Chrome)).toBeTruthy();
  });
  it("WindowsはFalse", () => {
    expect(isAndroid(UA.Windows10_Edge)).toBeFalsy();
    expect(isAndroid(UA.Windows11_Edge)).toBeFalsy();
  });
});
