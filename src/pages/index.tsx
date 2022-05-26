import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import DropZoneWithPreview from "@/components/ui/DropzoneWithPreview";

type PlaygroundPageProps = {
  origin: string;
};

const initialVibrantSourceList: VibrantSource[] = [
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

type InitialInputValue = {
  inputEmoji: string[];
  inputImage: string[];
};

const createInitialInputValue = () => {
  const initialInputValue: InitialInputValue = {
    inputEmoji: [],
    inputImage: [],
  };

  for (let i: number = 0; i < initialVibrantSourceList.length; i++) {
    const source = initialVibrantSourceList[i];
    if (source.type === "emoji") {
      initialInputValue.inputEmoji.push(source.emoji!);
    } else {
      initialInputValue.inputImage.push(source.file!);
    }
  }

  return initialInputValue;
};

const initialInputValue = createInitialInputValue();

const PlaygroundPage: NextPageWithLayout<PlaygroundPageProps> = ({
  origin,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [vibrantSourceList, setVibrantSourceList] = useState<VibrantSource[]>(
    initialVibrantSourceList
  );

  const [vibrantResultList, setVibrantResultList] = useState<VibrantResult[]>(
    []
  );

  const [inputEmoji, setInputEmoji] = useState<string>(
    initialInputValue.inputEmoji.join("")
  );

  const [inputImage, setInputImage] = useState<string[]>(
    initialInputValue.inputImage
  );

  const load = useCallback(async () => {
    const vibrantResultList: VibrantResult[] = await getVibrantList(
      vibrantSourceList,
      origin
    );
    setLoading(false);
    setVibrantResultList(vibrantResultList);
  }, [vibrantSourceList, origin]);

  useEffect(() => {
    setLoading(false);
    load();
  }, [vibrantSourceList, load]);

  const onClickButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setVibrantSourceList([
      {
        emoji: "🥎",
        type: "emoji",
      },
      {
        emoji: "🍙",
        type: "emoji",
      },
      {
        file: "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
        type: "image",
      },
    ]);
  };

  return (
    <>
      <Title>node-vibrant example ( Playground )</Title>

      <div>
        <h2>emoji</h2>
        <input
          type={"text"}
          defaultValue={inputEmoji}
          style={{
            fontSize: "3rem",
            padding: "16px",
            width: "100%",
          }}
        />
        <h2>画像</h2>
        <DropZoneWithPreview defaultValue={inputImage}></DropZoneWithPreview>
        <button type="button" onClick={onClickButton}>
          get vibrant
        </button>
      </div>

      {loading
        ? "now loading ..."
        : vibrantResultList.map(
            (vibrantResult: VibrantResult, index: number) => {
              return (
                <VibrantBlock
                  key={`VibrantBlock${index}`}
                  vibrantResult={vibrantResult}
                />
              );
            }
          )}
    </>
  );
};

PlaygroundPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="node-vibrant example ( Playground )"
      description="node-vibrant example ( Playground )"
    >
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req);

  const props: PlaygroundPageProps = {
    origin: origin,
  };

  return {
    props: props,
  };
};

export default PlaygroundPage;
