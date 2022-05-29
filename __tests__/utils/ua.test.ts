import { getOS, isAndroid, isApple } from "@/utils/ua";

const UA = {
  MacBook_12_Chrome:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
  iPhone_Safari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
  iPadPro_2018_11_Safari:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15",
  Android_Chrome:
    "Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.210 Mobile Safari/537.36",
  Windows10_Edge:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 Edg/81.0.416.72",
  Windows11_Edge:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.66",
};

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
