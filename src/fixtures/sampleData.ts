import { VibrantSource } from "@/lib/ColorAnalyzer";

const sampleVibrantSource: VibrantSource[] = [
  {
    emoji: "👾",
    type: "emoji",
  },
  {
    emoji: "🎁",
    type: "emoji",
  },
  {
    emoji: "💨",
    type: "emoji",
  },
  {
    emoji: "😅",
    type: "emoji",
  },
  {
    emoji: "🙅🏻‍♂️",
    type: "emoji",
  },
  {
    file: "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
    type: "image",
  },
  {
    file: "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
    type: "image",
  },
  {
    file: "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
    type: "image",
  },
  {
    file: "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
    type: "image",
  },
  {
    file: "/images/david-clode-fT2qXggBlks-unsplash.jpg",
    type: "image",
  },
];

const getSampleVibrantSource = (): VibrantSource[] => {
  return [...sampleVibrantSource];
};

export default getSampleVibrantSource;
