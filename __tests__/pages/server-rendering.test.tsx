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
          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f381.png",
        emoji: {
          text: "🎁",
          unicode: "1f381",
          brand: "apple",
          imageUrl:
            "https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f381.png",
        },
        palette: {
          Vibrant: { rgb: [230, 165, 28], hex: "#e6a51c", population: 392 },
          Muted: {
            rgb: [137.82142857142856, 98.35714285714285, 15.17857142857143],
            hex: "#89620f",
            population: 0,
          },
          DarkVibrant: { rgb: [140, 52, 12], hex: "#8c340c", population: 3 },
          DarkMuted: {
            rgb: [140.92105263157893, 52.342105263157904, 12.078947368421062],
            hex: "#8c340c",
            population: 0,
          },
          LightVibrant: { rgb: [248, 95, 87], hex: "#f85f57", population: 51 },
          LightMuted: {
            rgb: [146.88000000000002, 13.114285714285694, 6.119999999999977],
            hex: "#920d06",
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
            hex: "#1486ea",
            population: 0,
          },
          Muted: { rgb: [121, 141, 166], hex: "#798da6", population: 104 },
          DarkVibrant: {
            rgb: [10.468421052631557, 69.7894736842105, 122.13157894736845],
            hex: "#0a457a",
            population: 0,
          },
          DarkMuted: {
            rgb: [12.078947368421034, 80.52631578947366, 140.92105263157896],
            hex: "#0c508c",
            population: 0,
          },
          LightVibrant: {
            rgb: [220, 237, 252],
            hex: "#dcedfc",
            population: 262,
          },
          LightMuted: { rgb: [174, 193, 215], hex: "#aec1d7", population: 238 },
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
          Vibrant: { rgb: [240, 160, 18], hex: "#f0a012", population: 152 },
          Muted: { rgb: [164, 157, 121], hex: "#a49d79", population: 42 },
          DarkVibrant: { rgb: [164, 100, 4], hex: "#a46404", population: 154 },
          DarkMuted: { rgb: [140, 100, 68], hex: "#8c6444", population: 1 },
          LightVibrant: {
            rgb: [251, 247, 136],
            hex: "#fbf788",
            population: 116,
          },
          LightMuted: { rgb: [196, 192, 187], hex: "#c4c0bb", population: 40 },
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
          Vibrant: { rgb: [72, 138, 202], hex: "#488aca", population: 269 },
          Muted: { rgb: [172, 116, 84], hex: "#ac7454", population: 3 },
          DarkVibrant: { rgb: [27, 80, 144], hex: "#1b5090", population: 169 },
          DarkMuted: { rgb: [88, 72, 65], hex: "#584841", population: 66 },
          LightVibrant: {
            rgb: [243, 208, 173],
            hex: "#f3d0ad",
            population: 297,
          },
          LightMuted: { rgb: [210, 192, 172], hex: "#d2c0ac", population: 8 },
        },
        source: { emoji: "🙅🏻‍♂️", type: "emoji" },
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
      {
        preview:
          "http://localhost:3000/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
        emoji: null,
        palette: {
          Vibrant: { rgb: [212, 170, 5], hex: "#d4aa05", population: 906 },
          Muted: { rgb: [107, 89, 164], hex: "#6b59a4", population: 35 },
          DarkVibrant: { rgb: [10, 74, 91], hex: "#0a4a5b", population: 508 },
          DarkMuted: { rgb: [63, 42, 51], hex: "#3f2a33", population: 140 },
          LightVibrant: {
            rgb: [234, 204, 88],
            hex: "#eacc58",
            population: 923,
          },
          LightMuted: { rgb: [130, 172, 193], hex: "#82acc1", population: 83 },
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
          Vibrant: { rgb: [224, 112, 57], hex: "#e07039", population: 1051 },
          Muted: { rgb: [161, 128, 98], hex: "#a18062", population: 53 },
          DarkVibrant: { rgb: [121, 50, 17], hex: "#793211", population: 52 },
          DarkMuted: { rgb: [59, 44, 27], hex: "#3b2c1b", population: 851 },
          LightVibrant: {
            rgb: [248, 167, 105],
            hex: "#f8a769",
            population: 163,
          },
          LightMuted: {
            rgb: [146.17834394904457, 67.2420382165605, 6.821656050955412],
            hex: "#924306",
            population: 0,
          },
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
          Vibrant: { rgb: [29, 154, 198], hex: "#1d9ac6", population: 146 },
          Muted: { rgb: [181, 110, 97], hex: "#b56e61", population: 174 },
          DarkVibrant: { rgb: [30, 78, 111], hex: "#1e4e6f", population: 253 },
          DarkMuted: { rgb: [56, 66, 71], hex: "#384247", population: 1109 },
          LightVibrant: {
            rgb: [236, 189, 204],
            hex: "#ecbdcc",
            population: 427,
          },
          LightMuted: { rgb: [202, 151, 162], hex: "#ca97a2", population: 530 },
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
          Vibrant: { rgb: [201, 48, 72], hex: "#c93048", population: 240 },
          Muted: { rgb: [164, 114, 131], hex: "#a47283", population: 920 },
          DarkVibrant: { rgb: [22, 60, 4], hex: "#163c04", population: 10 },
          DarkMuted: { rgb: [55, 74, 48], hex: "#374a30", population: 1270 },
          LightVibrant: {
            rgb: [229.43855421686743, 147.96144578313255, 160.7421686746988],
            hex: "#e593a0",
            population: 0,
          },
          LightMuted: { rgb: [185, 208, 168], hex: "#b9d0a8", population: 207 },
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
