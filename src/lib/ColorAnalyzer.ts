import { getImageURLFromOrigin } from "@/utils/fileUtils";
import Vibrant from "node-vibrant";
import { Palette, Swatch, Vec3 } from "node-vibrant/lib/color";
import { Emoji, getEmojis } from "./EmojiParser";

export type VibrantSourceType = "image" | "emoji";

export type VibrantSource = {
  file?: string;
  emoji?: string;
  type: VibrantSourceType;
};

export type VibrantResult = {
  preview: string;
  emoji: Emoji | null;
  palette: ColorPalette;
  source: VibrantSource;
};

export type ColorPalette = {
  Vibrant?: ColorSwatch;
  Muted?: ColorSwatch;
  DarkVibrant?: ColorSwatch;
  DarkMuted?: ColorSwatch;
  LightVibrant?: ColorSwatch;
  LightMuted?: ColorSwatch;
};

export type SwatchLabel =
  | "Vibrant"
  | "Muted"
  | "DarkVibrant"
  | "DarkMuted"
  | "LightVibrant"
  | "LightMuted";

export type ColorSwatch = {
  rgb: number[];
  hex: string;
  population: number;
};

export type RatioSwatch = ColorSwatch & {
  label: SwatchLabel;
  ratio: number;
};

/**
 * rgbを整数にして返す
 *
 * TODO 表示する場合、ここを通さないと色が表記と変わる。整数にしているので、色が変わるかもしれない
 */
const rgbInteger = (rgb: number[]): number[] => {
  return rgb.map((n: number): number => {
    return Math.floor(n);
  });
};

/**
 *  ratioを整数にして返す
 */
const ratioInteger = (ratio: number): number => {
  return Math.floor(ratio);
};

const getRatioSwatch = (palette: ColorPalette): RatioSwatch[] => {
  const ratioSwatchList: RatioSwatch[] = [];

  if (palette.Vibrant) {
    ratioSwatchList.push({
      label: "Vibrant",
      ratio: 0,
      ...palette.Vibrant,
    });
  }

  if (palette.Muted) {
    ratioSwatchList.push({
      label: "Muted",
      ratio: 0,
      ...palette.Muted,
    });
  }

  if (palette.DarkVibrant) {
    ratioSwatchList.push({
      label: "DarkVibrant",
      ratio: 0,
      ...palette.DarkVibrant,
    });
  }

  if (palette.DarkMuted) {
    ratioSwatchList.push({
      label: "DarkMuted",
      ratio: 0,
      ...palette.DarkMuted,
    });
  }

  if (palette.LightVibrant) {
    ratioSwatchList.push({
      label: "LightVibrant",
      ratio: 0,
      ...palette.LightVibrant,
    });
  }

  if (palette.LightMuted) {
    ratioSwatchList.push({
      label: "LightMuted",
      ratio: 0,
      ...palette.LightMuted,
    });
  }

  const totalPopulation = ratioSwatchList.reduce(
    (acc: number, val: RatioSwatch): number => {
      return acc + val.population;
    },
    0
  );

  const calculatedRatioSwatchList = ratioSwatchList.map(
    (ratioSwatch: RatioSwatch): RatioSwatch => {
      ratioSwatch.ratio = (ratioSwatch.population / totalPopulation) * 100;
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
        ratioSwatch.rgb
      ).toString()}) ${currentStart}% ${currentEnd}%`
    );
  }

  return cssRGBList;
};
const convertVec3ToNumberArray = (vec3: Vec3): number[] => {
  return [vec3[0], vec3[1], vec3[2]];
};
const convertSwatchToColorSwatch = (swatch: Swatch): ColorSwatch => {
  return {
    rgb: convertVec3ToNumberArray(swatch.rgb),
    hex: swatch.hex,
    population: swatch.population,
  };
};
const convertPaletteToColorPalette = (palette: Palette): ColorPalette => {
  return {
    Vibrant: palette.Vibrant
      ? convertSwatchToColorSwatch(palette.Vibrant)
      : undefined,
    Muted: palette.Muted
      ? convertSwatchToColorSwatch(palette.Muted)
      : undefined,
    DarkVibrant: palette.DarkVibrant
      ? convertSwatchToColorSwatch(palette.DarkVibrant)
      : undefined,
    DarkMuted: palette.DarkMuted
      ? convertSwatchToColorSwatch(palette.DarkMuted)
      : undefined,
    LightVibrant: palette.LightVibrant
      ? convertSwatchToColorSwatch(palette.LightVibrant)
      : undefined,
    LightMuted: palette.LightMuted
      ? convertSwatchToColorSwatch(palette.LightMuted)
      : undefined,
  };
};

const getVibrantList = async (
  vibrantSourceList: VibrantSource[],
  origin: string,
  ua: string
): Promise<VibrantResult[]> => {
  const vibrantResultList: VibrantResult[] = [];

  for (let i: number = 0; i < vibrantSourceList.length; i++) {
    const source = vibrantSourceList[i];

    let emoji = null;

    if (source.type === "emoji") {
      emoji = getEmojis(source.emoji!, ua)[0];
    }

    const filePath: string =
      source.type === "image" ? source.file! : emoji!.imageUrl;

    const imageURL: string = getImageURLFromOrigin(filePath, origin);

    // 絵文字は、画像が64x64と小さいのでクオリティを上げる
    const quality: number = source.type === "image" ? 5 : 1;

    // Using builder
    const palette = await Vibrant.from(imageURL).quality(quality).getPalette();

    const vibrantResult: VibrantResult = {
      preview: imageURL,
      emoji: emoji,
      palette: convertPaletteToColorPalette(palette),
      source: source,
    };

    vibrantResultList.push(vibrantResult);
  }

  return vibrantResultList;
};

export {
  rgbInteger,
  ratioInteger,
  getRatioSwatch,
  getTopRatioSwatch,
  getCSSGradientRGBList,
  getVibrantList,
};
const ColorAnalyzer = {
  rgbInteger,
  ratioInteger,
  getRatioSwatch,
  getTopRatioSwatch,
  getCSSGradientRGBList,
  getVibrantList,
};
export default ColorAnalyzer;
