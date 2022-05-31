import { getImageURLFromOrigin } from "@/utils/fileUtils";
import Vibrant from "node-vibrant";
import { Palette, Swatch, Vec3 } from "node-vibrant/lib/color";
import { Emoji, getEmojis } from "./EmojiParser";

export type SwatchLabel =
  | "Vibrant"
  | "Muted"
  | "DarkVibrant"
  | "DarkMuted"
  | "LightVibrant"
  | "LightMuted";

export type ColorSwatch = {
  label: SwatchLabel;
  rgb: number[];
  hex: string;
  population: number;
  ratio: number;
};

export type VibrantSourceType = "image" | "emoji";

export type VibrantSource = {
  file?: string;
  emoji?: string;
  type: VibrantSourceType;
};

export type VibrantResult = {
  preview: string;
  emoji: Emoji | null;
  top: ColorSwatch;
  swatches: ColorSwatch[];
  source: VibrantSource;
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

const createColorSwatches = (palette: Palette): ColorSwatch[] => {
  const colorSwatches: ColorSwatch[] = [];

  if (palette.Vibrant) {
    colorSwatches.push(createColorSwatch("Vibrant", palette.Vibrant));
  }

  if (palette.Muted) {
    colorSwatches.push(createColorSwatch("Muted", palette.Muted));
  }

  if (palette.DarkVibrant) {
    colorSwatches.push(createColorSwatch("DarkVibrant", palette.DarkVibrant));
  }

  if (palette.DarkMuted) {
    colorSwatches.push(createColorSwatch("DarkMuted", palette.DarkMuted));
  }

  if (palette.LightVibrant) {
    colorSwatches.push(createColorSwatch("LightVibrant", palette.LightVibrant));
  }

  if (palette.LightMuted) {
    colorSwatches.push(createColorSwatch("LightMuted", palette.LightMuted));
  }

  const totalPopulation = colorSwatches.reduce(
    (acc: number, val: ColorSwatch): number => {
      return acc + val.population;
    },
    0
  );

  const calculatedColorSwatches = colorSwatches.map(
    (colorSwatch: ColorSwatch): ColorSwatch => {
      colorSwatch.ratio = (colorSwatch.population / totalPopulation) * 100;
      return colorSwatch;
    }
  );

  return calculatedColorSwatches;
};

const getTopRatioSwatch = (colorSwatches: ColorSwatch[]): ColorSwatch => {
  // 0,4,3,1,0,2,5
  const withoutZeroColorSwatches: ColorSwatch[] = colorSwatches.filter(
    (colorSwatch: ColorSwatch) => {
      return colorSwatch.ratio > 0;
    }
  );

  // 5,4,3,2,1
  const sortedColorSwatches: ColorSwatch[] = withoutZeroColorSwatches.sort(
    (a: ColorSwatch, b: ColorSwatch) => {
      return b.ratio - a.ratio;
    }
  );

  return sortedColorSwatches[0];
};

const getCSSGradientRGBList = (colorSwatches: ColorSwatch[]): string[] => {
  // 0,4,3,1,0,2,5
  const withoutZeroRatioColorSwatches: ColorSwatch[] = colorSwatches.filter(
    (colorSwatch: ColorSwatch) => {
      return colorSwatch.ratio > 0;
    }
  );

  const cssRGBList: string[] = [];
  // 開始は常に0
  let currentStart: number = 0;
  let currentEnd: number = 0;
  for (let i: number = 0; i < withoutZeroRatioColorSwatches.length; i++) {
    const colorSwatch: ColorSwatch = withoutZeroRatioColorSwatches[i];
    currentEnd += ratioInteger(colorSwatch.ratio);
    if (i === withoutZeroRatioColorSwatches.length - 1) {
      // 100%を超えないように、最後は100%
      currentEnd = 100;
    }
    cssRGBList.push(
      `rgb(${rgbInteger(
        colorSwatch.rgb
      ).toString()}) ${currentStart}% ${currentEnd}%`
    );
  }

  return cssRGBList;
};

const convertVec3ToNumberArray = (vec3: Vec3): number[] => {
  return [vec3[0], vec3[1], vec3[2]];
};

const createColorSwatch = (label: SwatchLabel, swatch: Swatch): ColorSwatch => {
  return {
    label: label,
    rgb: convertVec3ToNumberArray(swatch.rgb),
    hex: swatch.hex,
    population: swatch.population,
    ratio: 0,
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

    const palette: Palette = await Vibrant.from(imageURL)
      .quality(quality)
      .getPalette();

    const swatches: ColorSwatch[] = createColorSwatches(palette);

    const top: ColorSwatch = getTopRatioSwatch(swatches);

    const vibrantResult: VibrantResult = {
      preview: imageURL,
      emoji: emoji,
      top: top,
      swatches: swatches,
      source: source,
    };

    vibrantResultList.push(vibrantResult);
  }

  return vibrantResultList;
};

export { rgbInteger, ratioInteger, getCSSGradientRGBList, getVibrantList };
const ColorAnalyzer = {
  rgbInteger,
  ratioInteger,
  getCSSGradientRGBList,
  getVibrantList,
};
export default ColorAnalyzer;
