import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

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

describe("getVibrantList", () => {
  const origin: string = "http://localhost:3000";
  const ua: string = UA.MacBook_12_Chrome;

  it("Sourceが空の場合は、からのResultを返す", async () => {
    const source: VibrantSource[] = [];
    const result: VibrantResult[] = [];
    expect(await getVibrantList(source, origin, ua)).toEqual(result);
  });

  it("SourceからResultが正しく返る", async () => {
    const source: VibrantSource[] = [
      {
        emoji: "👾",
        type: "emoji",
      },
      {
        file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
        type: "image",
      },
    ];
    const result: VibrantResult[] = [
      {
        preview:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f47e.png",
        emoji: {
          text: "👾",
          unicode: "1f47e",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f47e.png",
        },
        palette: {
          Vibrant: { rgb: [140, 106, 186], hex: "#8c6aba", population: 197 },
          Muted: { rgb: [124, 92, 172], hex: "#7c5cac", population: 207 },
          DarkVibrant: {
            rgb: [62.65045871559632, 41.9697247706422, 90.6302752293578],
            hex: "#3e295a",
            population: 0,
          },
          DarkMuted: { rgb: [71, 61, 77], hex: "#473d4d", population: 86 },
          LightVibrant: {
            rgb: [157, 122, 205],
            hex: "#9d7acd",
            population: 43,
          },
          LightMuted: { rgb: [146, 116, 190], hex: "#9274be", population: 163 },
        },
        source: { emoji: "👾", type: "emoji" },
      },
      {
        preview:
          "http://localhost:3000/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [175, 32, 17], hex: "#af2011", population: 284 },
          Muted: { rgb: [174, 124, 96], hex: "#ae7c60", population: 1559 },
          DarkVibrant: { rgb: [95, 4, 4], hex: "#5f0404", population: 1566 },
          DarkMuted: { rgb: [87, 71, 57], hex: "#574739", population: 1293 },
          LightVibrant: {
            rgb: [236, 183, 167],
            hex: "#ecb7a7",
            population: 10,
          },
          LightMuted: {
            rgb: [203, 192, 182],
            hex: "#cbc0b6",
            population: 1548,
          },
        },
        source: {
          file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
          type: "image",
        },
      },
    ];
    expect(await getVibrantList(source, origin, ua)).toEqual(result);
  });
});
