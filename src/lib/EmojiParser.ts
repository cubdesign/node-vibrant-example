import { isAndroid, isApple } from "@/utils/ua";
import { EmojiEntity, parse } from "twemoji-parser";

export type EmojiBrand = "apple" | "google" | "twitter";

export type EmojiItem = {
  text: string;
  unicode: string;
  brand: EmojiBrand;
  imageUrl: string;
};

/**
 * UserAgentから絵文字のブランドを取得する
 *
 * @param ua UserAgent
 * @returns
 */
const getEmojiBrandByUA = (ua: string): EmojiBrand => {
  if (isApple(ua)) {
    return "apple";
  }
  if (isAndroid(ua)) {
    return "google";
  }

  // appleデバイス、アンドロイド以外はTwitterとする
  return "twitter";
};
/**
 * 絵文字の画像URLからunicodeテキストを取得する
 *
 * @param emojiImageURL 絵文字の画像URL
 * @returns
 */
const getUnicodeFromEmojiImageURL = (emojiImageURL: string): string => {
  return emojiImageURL.replace(/.*\/(.*)\.(png|svg)/, "$1");
};

/**
 * 絵文字のユニコードを取得する
 *
 * @param emoji 絵文字（複数可）
 */
const getEmojiItems = (emoji: string, ua: string): EmojiItem[] => {
  const emojiBrand: EmojiBrand = getEmojiBrandByUA(ua);

  const emojiEntities: EmojiEntity[] = parse(emoji, {
    buildUrl: (codepoints: string, assetType: string): string => {
      return assetType === "png"
        ? `https://cdn.jsdelivr.net/npm/emoji-datasource-${emojiBrand}@14.0.0/img/${emojiBrand}/64/${codepoints}.png`
        : `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
    },
    assetType: "png",
  });

  const emojiItems: EmojiItem[] = [];

  for (let i: number = 0; i < emojiEntities.length; i++) {
    const emojiEntity: EmojiEntity = emojiEntities[i];

    emojiItems.push({
      text: emojiEntity.text,
      unicode: getUnicodeFromEmojiImageURL(emojiEntity.url),
      brand: emojiBrand,
      imageUrl: emojiEntity.url,
    });
  }

  return emojiItems;
};

/**
 * 文字列の中の絵文字を抽出して配列で返す
 *
 * @param text 絵文字入りの文字（絵文字複数可）
 */
const getEmojiListFromString = (text: string): string[] => {
  const emojiEntities: EmojiEntity[] = parse(text);

  return emojiEntities.map((emoji) => emoji.text);
};

export {
  getEmojiBrandByUA,
  getUnicodeFromEmojiImageURL,
  getEmojiItems,
  getEmojiListFromString,
};

const EmojiParser = {
  getEmojiBrandByUA,
  getUnicodeFromEmojiImageURL,
  getEmojiItems,
  getEmojiListFromString,
};

export default EmojiParser;
