import {
  getEmojiBrandByUA,
  getUnicodeFromEmojiImageURL,
  getEmojis,
  getEmojiListFromString,
  Emoji,
} from "@/lib/EmojiParser";
import { UA } from "__tests__/testData/ua";

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
