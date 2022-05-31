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
        top: {
          label: "Muted",
          rgb: [124, 92, 172],
          hex: "#7c5cac",
          population: 207,
          ratio: 29.74137931034483,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [140, 106, 186],
            hex: "#8c6aba",
            population: 197,
            ratio: 28.304597701149426,
          },
          {
            label: "Muted",
            rgb: [124, 92, 172],
            hex: "#7c5cac",
            population: 207,
            ratio: 29.74137931034483,
          },
          {
            label: "DarkVibrant",
            rgb: [62.65045871559632, 41.9697247706422, 90.6302752293578],
            hex: "#3e295a",
            population: 0,
            ratio: 0,
          },
          {
            label: "DarkMuted",
            rgb: [71, 61, 77],
            hex: "#473d4d",
            population: 86,
            ratio: 12.35632183908046,
          },
          {
            label: "LightVibrant",
            rgb: [157, 122, 205],
            hex: "#9d7acd",
            population: 43,
            ratio: 6.17816091954023,
          },
          {
            label: "LightMuted",
            rgb: [146, 116, 190],
            hex: "#9274be",
            population: 163,
            ratio: 23.419540229885058,
          },
        ],
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
        top: {
          label: "Vibrant",
          rgb: [230, 165, 28],
          hex: "#e6a51c",
          population: 392,
          ratio: 87.89237668161435,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [230, 165, 28],
            hex: "#e6a51c",
            population: 392,
            ratio: 87.89237668161435,
          },
          {
            label: "Muted",
            rgb: [137.82142857142856, 98.35714285714285, 15.17857142857143],
            hex: "#89620f",
            population: 0,
            ratio: 0,
          },
          {
            label: "DarkVibrant",
            rgb: [140, 52, 12],
            hex: "#8c340c",
            population: 3,
            ratio: 0.672645739910314,
          },
          {
            label: "DarkMuted",
            rgb: [140.92105263157893, 52.342105263157904, 12.078947368421062],
            hex: "#8c340c",
            population: 0,
            ratio: 0,
          },
          {
            label: "LightVibrant",
            rgb: [248, 95, 87],
            hex: "#f85f57",
            population: 51,
            ratio: 11.434977578475337,
          },
          {
            label: "LightMuted",
            rgb: [146.88000000000002, 13.114285714285694, 6.119999999999977],
            hex: "#920d06",
            population: 0,
            ratio: 0,
          },
        ],
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
        top: {
          label: "LightVibrant",
          rgb: [220, 237, 252],
          hex: "#dcedfc",
          population: 262,
          ratio: 43.377483443708606,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [20.13157894736837, 134.21052631578945, 234.86842105263162],
            hex: "#1486ea",
            population: 0,
            ratio: 0,
          },
          {
            label: "Muted",
            rgb: [121, 141, 166],
            hex: "#798da6",
            population: 104,
            ratio: 17.218543046357617,
          },
          {
            label: "DarkVibrant",
            rgb: [10.468421052631557, 69.7894736842105, 122.13157894736845],
            hex: "#0a457a",
            population: 0,
            ratio: 0,
          },
          {
            label: "DarkMuted",
            rgb: [12.078947368421034, 80.52631578947366, 140.92105263157896],
            hex: "#0c508c",
            population: 0,
            ratio: 0,
          },
          {
            label: "LightVibrant",
            rgb: [220, 237, 252],
            hex: "#dcedfc",
            population: 262,
            ratio: 43.377483443708606,
          },
          {
            label: "LightMuted",
            rgb: [174, 193, 215],
            hex: "#aec1d7",
            population: 238,
            ratio: 39.40397350993378,
          },
        ],
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
        top: {
          label: "DarkVibrant",
          rgb: [164, 100, 4],
          hex: "#a46404",
          population: 154,
          ratio: 30.495049504950494,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [240, 160, 18],
            hex: "#f0a012",
            population: 152,
            ratio: 30.099009900990097,
          },
          {
            label: "Muted",
            rgb: [164, 157, 121],
            hex: "#a49d79",
            population: 42,
            ratio: 8.316831683168317,
          },
          {
            label: "DarkVibrant",
            rgb: [164, 100, 4],
            hex: "#a46404",
            population: 154,
            ratio: 30.495049504950494,
          },
          {
            label: "DarkMuted",
            rgb: [140, 100, 68],
            hex: "#8c6444",
            population: 1,
            ratio: 0.19801980198019803,
          },
          {
            label: "LightVibrant",
            rgb: [251, 247, 136],
            hex: "#fbf788",
            population: 116,
            ratio: 22.970297029702973,
          },
          {
            label: "LightMuted",
            rgb: [196, 192, 187],
            hex: "#c4c0bb",
            population: 40,
            ratio: 7.920792079207921,
          },
        ],
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
        top: {
          label: "LightVibrant",
          rgb: [243, 208, 173],
          hex: "#f3d0ad",
          population: 297,
          ratio: 36.57635467980296,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [72, 138, 202],
            hex: "#488aca",
            population: 269,
            ratio: 33.12807881773399,
          },
          {
            label: "Muted",
            rgb: [172, 116, 84],
            hex: "#ac7454",
            population: 3,
            ratio: 0.3694581280788177,
          },
          {
            label: "DarkVibrant",
            rgb: [27, 80, 144],
            hex: "#1b5090",
            population: 169,
            ratio: 20.8128078817734,
          },
          {
            label: "DarkMuted",
            rgb: [88, 72, 65],
            hex: "#584841",
            population: 66,
            ratio: 8.12807881773399,
          },
          {
            label: "LightVibrant",
            rgb: [243, 208, 173],
            hex: "#f3d0ad",
            population: 297,
            ratio: 36.57635467980296,
          },
          {
            label: "LightMuted",
            rgb: [210, 192, 172],
            hex: "#d2c0ac",
            population: 8,
            ratio: 0.9852216748768473,
          },
        ],
        source: { emoji: "🙅🏻‍♂️", type: "emoji" },
      },
      {
        preview:
          "http://localhost:3000/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
        emoji: null,
        top: {
          label: "DarkVibrant",
          rgb: [95, 4, 4],
          hex: "#5f0404",
          population: 1566,
          ratio: 25.015974440894567,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [175, 32, 17],
            hex: "#af2011",
            population: 284,
            ratio: 4.536741214057508,
          },
          {
            label: "Muted",
            rgb: [174, 124, 96],
            hex: "#ae7c60",
            population: 1559,
            ratio: 24.904153354632587,
          },
          {
            label: "DarkVibrant",
            rgb: [95, 4, 4],
            hex: "#5f0404",
            population: 1566,
            ratio: 25.015974440894567,
          },
          {
            label: "DarkMuted",
            rgb: [87, 71, 57],
            hex: "#574739",
            population: 1293,
            ratio: 20.654952076677315,
          },
          {
            label: "LightVibrant",
            rgb: [236, 183, 167],
            hex: "#ecb7a7",
            population: 10,
            ratio: 0.1597444089456869,
          },
          {
            label: "LightMuted",
            rgb: [203, 192, 182],
            hex: "#cbc0b6",
            population: 1548,
            ratio: 24.728434504792332,
          },
        ],
        source: {
          file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
        emoji: null,
        top: {
          label: "LightVibrant",
          rgb: [234, 204, 88],
          hex: "#eacc58",
          population: 923,
          ratio: 35.56840077071291,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [212, 170, 5],
            hex: "#d4aa05",
            population: 906,
            ratio: 34.91329479768786,
          },
          {
            label: "Muted",
            rgb: [107, 89, 164],
            hex: "#6b59a4",
            population: 35,
            ratio: 1.348747591522158,
          },
          {
            label: "DarkVibrant",
            rgb: [10, 74, 91],
            hex: "#0a4a5b",
            population: 508,
            ratio: 19.576107899807322,
          },
          {
            label: "DarkMuted",
            rgb: [63, 42, 51],
            hex: "#3f2a33",
            population: 140,
            ratio: 5.394990366088632,
          },
          {
            label: "LightVibrant",
            rgb: [234, 204, 88],
            hex: "#eacc58",
            population: 923,
            ratio: 35.56840077071291,
          },
          {
            label: "LightMuted",
            rgb: [130, 172, 193],
            hex: "#82acc1",
            population: 83,
            ratio: 3.198458574181118,
          },
        ],
        source: {
          file: "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
        emoji: null,
        top: {
          label: "Vibrant",
          rgb: [224, 112, 57],
          hex: "#e07039",
          population: 1051,
          ratio: 48.433179723502306,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [224, 112, 57],
            hex: "#e07039",
            population: 1051,
            ratio: 48.433179723502306,
          },
          {
            label: "Muted",
            rgb: [161, 128, 98],
            hex: "#a18062",
            population: 53,
            ratio: 2.442396313364055,
          },
          {
            label: "DarkVibrant",
            rgb: [121, 50, 17],
            hex: "#793211",
            population: 52,
            ratio: 2.3963133640553,
          },
          {
            label: "DarkMuted",
            rgb: [59, 44, 27],
            hex: "#3b2c1b",
            population: 851,
            ratio: 39.21658986175115,
          },
          {
            label: "LightVibrant",
            rgb: [248, 167, 105],
            hex: "#f8a769",
            population: 163,
            ratio: 7.511520737327189,
          },
          {
            label: "LightMuted",
            rgb: [146.17834394904457, 67.2420382165605, 6.821656050955412],
            hex: "#924306",
            population: 0,
            ratio: 0,
          },
        ],
        source: {
          file: "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
        emoji: null,
        top: {
          label: "DarkMuted",
          rgb: [56, 66, 71],
          hex: "#384247",
          population: 1109,
          ratio: 42.023493747631676,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [29, 154, 198],
            hex: "#1d9ac6",
            population: 146,
            ratio: 5.532398635846912,
          },
          {
            label: "Muted",
            rgb: [181, 110, 97],
            hex: "#b56e61",
            population: 174,
            ratio: 6.593406593406594,
          },
          {
            label: "DarkVibrant",
            rgb: [30, 78, 111],
            hex: "#1e4e6f",
            population: 253,
            ratio: 9.586964759378553,
          },
          {
            label: "DarkMuted",
            rgb: [56, 66, 71],
            hex: "#384247",
            population: 1109,
            ratio: 42.023493747631676,
          },
          {
            label: "LightVibrant",
            rgb: [236, 189, 204],
            hex: "#ecbdcc",
            population: 427,
            ratio: 16.180371352785148,
          },
          {
            label: "LightMuted",
            rgb: [202, 151, 162],
            hex: "#ca97a2",
            population: 530,
            ratio: 20.08336491095112,
          },
        ],
        source: {
          file: "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
          type: "image",
        },
      },
      {
        preview:
          "http://localhost:3000/images/david-clode-fT2qXggBlks-unsplash.jpg",
        emoji: null,
        top: {
          label: "DarkMuted",
          rgb: [55, 74, 48],
          hex: "#374a30",
          population: 1270,
          ratio: 47.97884397431054,
        },
        swatches: [
          {
            label: "Vibrant",
            rgb: [201, 48, 72],
            hex: "#c93048",
            population: 240,
            ratio: 9.066868152625613,
          },
          {
            label: "Muted",
            rgb: [164, 114, 131],
            hex: "#a47283",
            population: 920,
            ratio: 34.75632791839819,
          },
          {
            label: "DarkVibrant",
            rgb: [22, 60, 4],
            hex: "#163c04",
            population: 10,
            ratio: 0.37778617302606726,
          },
          {
            label: "DarkMuted",
            rgb: [55, 74, 48],
            hex: "#374a30",
            population: 1270,
            ratio: 47.97884397431054,
          },
          {
            label: "LightVibrant",
            rgb: [229.43855421686743, 147.96144578313255, 160.7421686746988],
            hex: "#e593a0",
            population: 0,
            ratio: 0,
          },
          {
            label: "LightMuted",
            rgb: [185, 208, 168],
            hex: "#b9d0a8",
            population: 207,
            ratio: 7.820173781639592,
          },
        ],
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
