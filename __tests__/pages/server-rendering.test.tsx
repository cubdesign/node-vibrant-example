import { render, screen } from "@testing-library/react";
import ServerRenderingPage from "@/pages/server-rendering";

describe("ServerRenderingPage", () => {
  it("renders a heading", () => {
    const vibrantResultList: object = [
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
          Vibrant: { rgb: [140, 106, 186], population: 197 },
          LightVibrant: { rgb: [157, 122, 205], population: 43 },
          DarkVibrant: {
            rgb: [62.65045871559632, 41.9697247706422, 90.6302752293578],
            population: 0,
          },
          Muted: { rgb: [124, 92, 172], population: 207 },
          LightMuted: { rgb: [146, 116, 190], population: 163 },
          DarkMuted: { rgb: [71, 61, 77], population: 86 },
        },
        source: { emoji: "👾", type: "emoji" },
      },
      {
        preview:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f381.png",
        emoji: {
          text: "🎁",
          unicode: "1f381",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f381.png",
        },
        palette: {
          Vibrant: { rgb: [230, 165, 28], population: 392 },
          LightVibrant: { rgb: [248, 95, 87], population: 51 },
          DarkVibrant: { rgb: [140, 52, 12], population: 3 },
          Muted: {
            rgb: [137.82142857142856, 98.35714285714285, 15.17857142857143],
            population: 0,
          },
          LightMuted: {
            rgb: [146.88000000000002, 13.114285714285694, 6.119999999999977],
            population: 0,
          },
          DarkMuted: {
            rgb: [140.92105263157893, 52.342105263157904, 12.078947368421062],
            population: 0,
          },
        },
        source: { emoji: "🎁", type: "emoji" },
      },
      {
        preview:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f4a8.png",
        emoji: {
          text: "💨",
          unicode: "1f4a8",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f4a8.png",
        },
        palette: {
          Vibrant: {
            rgb: [20.13157894736837, 134.21052631578945, 234.86842105263162],
            population: 0,
          },
          LightVibrant: { rgb: [220, 237, 252], population: 262 },
          DarkVibrant: {
            rgb: [10.468421052631557, 69.7894736842105, 122.13157894736845],
            population: 0,
          },
          Muted: { rgb: [121, 141, 166], population: 104 },
          LightMuted: { rgb: [174, 193, 215], population: 238 },
          DarkMuted: {
            rgb: [12.078947368421034, 80.52631578947366, 140.92105263157896],
            population: 0,
          },
        },
        source: { emoji: "💨", type: "emoji" },
      },
      {
        preview:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f605.png",
        emoji: {
          text: "😅",
          unicode: "1f605",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f605.png",
        },
        palette: {
          Vibrant: { rgb: [240, 160, 18], population: 152 },
          LightVibrant: { rgb: [251, 247, 136], population: 116 },
          DarkVibrant: { rgb: [164, 100, 4], population: 154 },
          Muted: { rgb: [164, 157, 121], population: 42 },
          LightMuted: { rgb: [196, 192, 187], population: 40 },
          DarkMuted: { rgb: [140, 100, 68], population: 1 },
        },
        source: { emoji: "😅", type: "emoji" },
      },
      {
        preview:
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f645-1f3fb-200d-2642-fe0f.png",
        emoji: {
          text: "🙅🏻‍♂️",
          unicode: "1f645-1f3fb-200d-2642-fe0f",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f645-1f3fb-200d-2642-fe0f.png",
        },
        palette: {
          Vibrant: { rgb: [72, 138, 202], population: 269 },
          LightVibrant: { rgb: [243, 208, 173], population: 297 },
          DarkVibrant: { rgb: [27, 80, 144], population: 169 },
          Muted: { rgb: [172, 116, 84], population: 3 },
          LightMuted: { rgb: [210, 192, 172], population: 8 },
          DarkMuted: { rgb: [88, 72, 65], population: 66 },
        },
        source: { emoji: "🙅🏻‍♂️", type: "emoji" },
      },
      {
        preview:
          "http://localhost:3000/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [175, 32, 17], population: 284 },
          LightVibrant: { rgb: [236, 183, 167], population: 10 },
          DarkVibrant: { rgb: [95, 4, 4], population: 1566 },
          Muted: { rgb: [174, 124, 96], population: 1559 },
          LightMuted: { rgb: [203, 192, 182], population: 1548 },
          DarkMuted: { rgb: [87, 71, 57], population: 1293 },
        },
        source: {
          file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [212, 170, 5], population: 906 },
          LightVibrant: { rgb: [234, 204, 88], population: 923 },
          DarkVibrant: { rgb: [10, 74, 91], population: 508 },
          Muted: { rgb: [107, 89, 164], population: 35 },
          LightMuted: { rgb: [130, 172, 193], population: 83 },
          DarkMuted: { rgb: [63, 42, 51], population: 140 },
        },
        source: {
          file: "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [224, 112, 57], population: 1051 },
          LightVibrant: { rgb: [248, 167, 105], population: 163 },
          DarkVibrant: { rgb: [121, 50, 17], population: 52 },
          Muted: { rgb: [161, 128, 98], population: 53 },
          LightMuted: {
            rgb: [146.17834394904457, 67.2420382165605, 6.821656050955412],
            population: 0,
          },
          DarkMuted: { rgb: [59, 44, 27], population: 851 },
        },
        source: {
          file: "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [29, 154, 198], population: 146 },
          LightVibrant: { rgb: [236, 189, 204], population: 427 },
          DarkVibrant: { rgb: [30, 78, 111], population: 253 },
          Muted: { rgb: [181, 110, 97], population: 174 },
          LightMuted: { rgb: [202, 151, 162], population: 530 },
          DarkMuted: { rgb: [56, 66, 71], population: 1109 },
        },
        source: {
          file: "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/david-clode-fT2qXggBlks-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [201, 48, 72], population: 240 },
          LightVibrant: {
            rgb: [229.43855421686743, 147.96144578313255, 160.7421686746988],
            population: 0,
          },
          DarkVibrant: { rgb: [22, 60, 4], population: 10 },
          Muted: { rgb: [164, 114, 131], population: 920 },
          LightMuted: { rgb: [185, 208, 168], population: 207 },
          DarkMuted: { rgb: [55, 74, 48], population: 1270 },
        },
        source: {
          file: "/images/david-clode-fT2qXggBlks-unsplash.jpg",
          type: "image",
        },
      },
    ];
    const vibrantResultListString = JSON.stringify(vibrantResultList);
    render(
      <ServerRenderingPage vibrantResultListString={vibrantResultListString} />
    );
    expect(screen.getByText(/SSR/)).toBeInTheDocument();
  });
});
