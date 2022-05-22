import Vibrant from "node-vibrant";
import { Palette, Swatch } from "node-vibrant/lib/color";
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

type SwatchLabel =
  | "Vibrant"
  | "Muted"
  | "DarkVibrant"
  | "DarkMuted"
  | "LightVibrant"
  | "LightMuted";

type RatioSwatch = {
  label: SwatchLabel;
  swatch: Swatch;
  ratio: number;
};

const getRatioSwatch = (): RatioSwatch[] => {
  const ratioSwatchList: RatioSwatch[] = [];
  // if (palette.Vibrant) {
  //   ratioSwatchList.push({
  //     label: "Vibrant",
  //     swatch: palette.Vibrant,
  //     ratio: 0,
  //   });
  // }
  // | "Muted"
  // | "DarkVibrant"
  // | "DarkMuted"
  // | "LightVibrant"
  // | "LightMuted";
  return ratioSwatchList;
};
// const getTopRatioSwatch = (palette: Palette): RatioSwatch => {
//   return getRatioSwatch(palette)[0];
// };

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

export { getRatioSwatch, getVibrantList };
const ColorAnalyzer = { getRatioSwatch, getVibrantList };
export default ColorAnalyzer;
