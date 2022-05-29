import { getImageURLFromOrigin } from "@/utils/fileUtils";
import { isAndroid, isApple } from "@/utils/ua";
import Vibrant from "node-vibrant";
import { Palette, Swatch, Vec3 } from "node-vibrant/lib/color";
import { EmojiEntity, parse } from "twemoji-parser";

export type EmojiBrand = "apple" | "google" | "twitter";

export type EmojiItem = {
  text: string;
  unicode: string;
  brand: EmojiBrand;
  imageUrl: string;
};

export type VibrantSourceType = "image" | "emoji";

export type VibrantSource = {
  file?: string;
  emoji?: string;
  type: VibrantSourceType;
};

export type VibrantResult = {
  imageURL: string;
  emoji: EmojiItem | null;
  palette: Palette;
  source: VibrantSource;
};

export type SwatchLabel =
  | "Vibrant"
  | "Muted"
  | "DarkVibrant"
  | "DarkMuted"
  | "LightVibrant"
  | "LightMuted";

export type RatioSwatch = {
  label: SwatchLabel;
  // TODO SwatchはClassだった。なので、↓はインスタンスが入る
  swatch: Swatch;
  ratio: number;
};

/**
 * rgbを整数にして返す
 *
 * TODO 表示する場合、ここを通さないと色が表記と変わる。整数にしているので、色が変わるかもしれない
 */
const rgbInteger = (rgb: Vec3): Vec3 => {
  return rgb.map((n: number): number => {
    return Math.floor(n);
  }) as Vec3;
};

/**
 *  ratioを整数にして返す
 */
const ratioInteger = (ratio: number): number => {
  return Math.floor(ratio);
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
 * 絵文字のユニコードを取得する
 *
 * @param emoji 絵文字（複数可）
 */
const getExtendsEmojiEntities = (emoji: string, ua: string): EmojiItem[] => {
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
      unicode: emojiEntity.url.replace(/.*\/(.*)\.(png|svg)/, "$1"),
      brand: emojiBrand,
      imageUrl: emojiEntity.url,
    });
  }

  return emojiItems;
};

const getRatioSwatch = (palette: Palette): RatioSwatch[] => {
  const ratioSwatchList: RatioSwatch[] = [];
  if (palette.Vibrant) {
    ratioSwatchList.push({
      label: "Vibrant",
      swatch: palette.Vibrant,
      ratio: 0,
    });
  }

  if (palette.Muted) {
    ratioSwatchList.push({
      label: "Muted",
      swatch: palette.Muted,
      ratio: 0,
    });
  }

  if (palette.DarkVibrant) {
    ratioSwatchList.push({
      label: "DarkVibrant",
      swatch: palette.DarkVibrant,
      ratio: 0,
    });
  }

  if (palette.DarkMuted) {
    ratioSwatchList.push({
      label: "DarkMuted",
      swatch: palette.DarkMuted,
      ratio: 0,
    });
  }

  if (palette.LightVibrant) {
    ratioSwatchList.push({
      label: "LightVibrant",
      swatch: palette.LightVibrant,
      ratio: 0,
    });
  }

  if (palette.LightMuted) {
    ratioSwatchList.push({
      label: "LightMuted",
      swatch: palette.LightMuted,
      ratio: 0,
    });
  }

  const totalPopulation = ratioSwatchList.reduce(
    (acc: number, val: RatioSwatch): number => {
      return acc + val.swatch.population;
    },
    0
  );

  const calculatedRatioSwatchList = ratioSwatchList.map(
    (ratioSwatch: RatioSwatch): RatioSwatch => {
      ratioSwatch.ratio =
        (ratioSwatch.swatch.population / totalPopulation) * 100;
      return ratioSwatch;
    }
  );

  return calculatedRatioSwatchList;
};

const getTopRatioSwatch = (ratioSwatchList: RatioSwatch[]): RatioSwatch => {
  // 0,4,3,1,0,2,5
  const withoutZeroRatioSwatchList: RatioSwatch[] = ratioSwatchList.filter(
    (ratioSwatch: RatioSwatch) => {
      return ratioSwatch.ratio > 0;
    }
  );

  // 5,4,3,2,1
  const sortedRatioSwatchList: RatioSwatch[] = withoutZeroRatioSwatchList.sort(
    (a: RatioSwatch, b: RatioSwatch) => {
      return b.ratio - a.ratio;
    }
  );

  return sortedRatioSwatchList[0];
};

const getCSSGradientRGBList = (ratioSwatchList: RatioSwatch[]): string[] => {
  // 0,4,3,1,0,2,5
  const withoutZeroRatioSwatchList: RatioSwatch[] = ratioSwatchList.filter(
    (ratioSwatch: RatioSwatch) => {
      return ratioSwatch.ratio > 0;
    }
  );

  const cssRGBList: string[] = [];
  // 開始は常に0
  let currentStart: number = 0;
  let currentEnd: number = 0;
  for (let i: number = 0; i < withoutZeroRatioSwatchList.length; i++) {
    const ratioSwatch: RatioSwatch = withoutZeroRatioSwatchList[i];
    currentEnd += ratioInteger(ratioSwatch.ratio);
    if (i === withoutZeroRatioSwatchList.length - 1) {
      // 100%を超えないように、最後は100%
      currentEnd = 100;
    }
    cssRGBList.push(
      `rgb(${rgbInteger(
        ratioSwatch.swatch.rgb
      ).toString()}) ${currentStart}% ${currentEnd}%`
    );
  }

  return cssRGBList;
};

const getVibrantList = async (
  vibrantSourceList: VibrantSource[],
  origin: string,
  ua: string
): Promise<VibrantResult[]> => {
  const vibrantResultList: VibrantResult[] = [];

  for (let i: number = 0; i < vibrantSourceList.length; i++) {
    const source = vibrantSourceList[i];

    let extendsEmojiEntity = null;

    if (source.type === "emoji") {
      extendsEmojiEntity = getExtendsEmojiEntities(source.emoji!, ua)[0];
    }

    const filePath: string =
      source.type === "image" ? source.file! : extendsEmojiEntity!.imageUrl;

    const imageURL: string = getImageURLFromOrigin(filePath, origin);

    // 絵文字は、画像が64x64と小さいのでクオリティを上げる
    const quality: number = source.type === "image" ? 5 : 1;

    // Using builder
    const palette = await Vibrant.from(imageURL).quality(quality).getPalette();

    const vibrantResult: VibrantResult = {
      imageURL: imageURL,
      emoji: extendsEmojiEntity,
      palette: palette,
      source: source,
    };

    vibrantResultList.push(vibrantResult);
  }
  return vibrantResultList;
};

export {
  rgbInteger,
  ratioInteger,
  getEmojiListFromString,
  getEmojiBrandByUA,
  getRatioSwatch,
  getTopRatioSwatch,
  getCSSGradientRGBList,
  getVibrantList,
};
const ColorAnalyzer = {
  rgbInteger,
  ratioInteger,
  getEmojiListFromString,
  getEmojiBrandByUA,
  getRatioSwatch,
  getTopRatioSwatch,
  getCSSGradientRGBList,
  getVibrantList,
};
export default ColorAnalyzer;
