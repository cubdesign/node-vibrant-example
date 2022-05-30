import {
  getEmojiBrandByUA,
  getUnicodeFromEmojiImageURL,
  getEmojis,
  getEmojiListFromString,
  Emoji,
} from "@/lib/EmojiParser";

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

describe("getEmojiBrandByUA", () => {
  it("UAが空だったらtwitterを返す", () => {
    expect(getEmojiBrandByUA("")).toBe("twitter");
  });
  it("macはapple", () => {
    expect(getEmojiBrandByUA(UA.MacBook_12_Chrome)).toBe("apple");
  });
  it("iPhoneはapple", () => {
    expect(getEmojiBrandByUA(UA.iPhone_Safari)).toBe("apple");
  });
  it("iPadはapple", () => {
    expect(getEmojiBrandByUA(UA.iPadPro_2018_11_Safari)).toBe("apple");
  });
  it("Androidはgoogle", () => {
    expect(getEmojiBrandByUA(UA.Android_Chrome)).toBe("google");
  });
  it("Windowsはtwitter", () => {
    expect(getEmojiBrandByUA(UA.Windows10_Edge)).toBe("twitter");
    expect(getEmojiBrandByUA(UA.Windows11_Edge)).toBe("twitter");
  });
});

describe("getUnicodeFromEmojiImageURL", () => {
  it("emojiのURLからunicodeテキストを取得できる", () => {
    // 👾
    const imageUrl1 =
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f47e.png";

    expect(getUnicodeFromEmojiImageURL(imageUrl1)).toBe("1f47e");

    // 🙅🏻‍♂️
    const imageUrl2 =
      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f645-1f3fb-200d-2642-fe0f.png";

    expect(getUnicodeFromEmojiImageURL(imageUrl2)).toBe(
      "1f645-1f3fb-200d-2642-fe0f"
    );
  });
});

describe("getEmojis", () => {
  it("空文字の場合は空配列が返る", () => {
    expect(getEmojis("", UA.MacBook_12_Chrome)).toEqual<Emoji[]>([]);
  });

  it("テキストから絵文字情報を取り出せる", () => {
    expect(getEmojis("👾🙅🏻‍♂️", UA.MacBook_12_Chrome)).toEqual<Emoji[]>([
      {
        text: "👾",
        unicode: "1f47e",
        brand: "apple",
        imageUrl:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f47e.png",
      },
      {
        text: "🙅🏻‍♂️",
        unicode: "1f645-1f3fb-200d-2642-fe0f",
        brand: "apple",
        imageUrl:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f645-1f3fb-200d-2642-fe0f.png",
      },
    ]);
  });

  it("UAが不明な場合はtwitter絵文字になる", () => {
    expect(getEmojis("👾🙅🏻‍♂️", "")).toEqual<Emoji[]>([
      {
        text: "👾",
        unicode: "1f47e",
        brand: "twitter",
        imageUrl:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-twitter@14.0.0/img/twitter/64/1f47e.png",
      },
      {
        text: "🙅🏻‍♂️",
        unicode: "1f645-1f3fb-200d-2642-fe0f",
        brand: "twitter",
        imageUrl:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-twitter@14.0.0/img/twitter/64/1f645-1f3fb-200d-2642-fe0f.png",
      },
    ]);
  });
});

describe("getEmojiListFromString", () => {
  it("空文字の場合は空配列が返る", () => {
    expect(getEmojiListFromString("")).toEqual([]);
  });

  it("テキストから絵文字を取り出せる", () => {
    expect(getEmojiListFromString("👾")).toEqual(["👾"]);
    expect(getEmojiListFromString("👾🙅🏻‍♂️")).toEqual(["👾", "🙅🏻‍♂️"]);
    expect(getEmojiListFromString("aa👾bbbb🙅🏻‍♂️cccc")).toEqual(["👾", "🙅🏻‍♂️"]);
  });
});
