import Vibrant from "node-vibrant";
import { Palette, Swatch, Vec3 } from "node-vibrant/lib/color";
import { EmojiEntity, parse } from "twemoji-parser";

interface ExtendsEmojiEntity extends EmojiEntity {
  unicode: string;
}

export type VibrantSourceType = "image" | "emoji";

export type VibrantSource = {
  file?: string;
  emoji?: string;
  type: VibrantSourceType;
};

export type VibrantResult = {
  imageURL: string;
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
 * rgbの整数にして返す
 *
 * TODO 表示する場合、ここを通さないと色が表記と変わる。整数にしているので、色が変わるかもしれない
 */
const rgbInteger = (rgb: Vec3): Vec3 => {
  return rgb.map((n: number): number => {
    return Math.floor(n);
  }) as Vec3;
};

const getImageURLFromOrigin = (imagePath: string, origin: string): string => {
  const imageURL: string = `${origin}${imagePath}`;
  return imageURL;
};

/**
 * 絵文字のユニコードを取得する
 *
 * @param emoji 絵文字（複数可）
 */
const getExtendsEmojiEntities = (emoji: string): ExtendsEmojiEntity[] => {
  const emojiEntities: EmojiEntity[] = parse(emoji, {
    buildUrl: (codepoints: string, assetType: string): string => {
      return assetType === "png"
        ? `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${codepoints}.png`
        : `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
    },
    assetType: "png",
  });

  const extendsEmojiEntities: ExtendsEmojiEntity[] = [];

  for (let i: number = 0; i < emojiEntities.length; i++) {
    const emojiEntity: EmojiEntity = emojiEntities[i];

    extendsEmojiEntities.push({
      unicode: emojiEntity.url.replace(/.*\/(.*)\.(png|svg)/, "$1"),
      ...emojiEntity,
    });
  }

  return extendsEmojiEntities;
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

const getVibrantList = async (
  vibrantSourceList: VibrantSource[],
  origin: string
): Promise<VibrantResult[]> => {
  const vibrantResultList: VibrantResult[] = [];

  for (let i: number = 0; i < vibrantSourceList.length; i++) {
    const source = vibrantSourceList[i];

    const filePath: string =
      source.type === "image"
        ? source.file!
        : getExtendsEmojiEntities(source.emoji!)[0].url;

    const imageURL: string = /^(https:|http:)/.test(filePath)
      ? filePath
      : getImageURLFromOrigin(filePath, origin);

    // 絵文字は、画像が64x64と小さいのでクオリティを上げる
    const quality: number = source.type === "image" ? 5 : 1;

    // Using builder
    const palette = await Vibrant.from(imageURL).quality(quality).getPalette();

    const vibrantResult: VibrantResult = {
      imageURL: imageURL,
      palette: palette,
      source: source,
    };

    vibrantResultList.push(vibrantResult);
  }
  return vibrantResultList;
};

export { rgbInteger, getRatioSwatch, getTopRatioSwatch, getVibrantList };
const ColorAnalyzer = {
  rgbInteger,
  getRatioSwatch,
  getTopRatioSwatch,
  getVibrantList,
};
export default ColorAnalyzer;
