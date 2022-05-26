import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getEmojiListFromString,
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

import VibrantBlock from "@/components/VibrantBlock";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";
import DropZoneWithPreview from "@/components/ui/DropZoneWithPreview";
import { getImageURLFromOrigin } from "@/utils/fileUtils";
import styled from "@emotion/styled";
import { mq } from "@/utils/mq";

type PlaygroundPageProps = {
  origin: string;
};

type InitialInputValue = {
  inputEmoji: string[];
  inputImage: string[];
};

const InputBlock = styled("div")`
  width: 90%;
  padding: 1rem;
  border: solid 3px #ffffff;
  margin-bottom: 48px;
  text-align: center;
  h2 {
    text-align: left;
    padding: 0;
    margin: 0 0 8px 0;
  }
`;

const EmojiInput = styled("input")`
  font-size: 2rem;
  line-height: 1;
  padding: 8px;
  width: 100%;
  margin-bottom: 8px;
  ${mq("sm")} {
    font-size: 3rem;
    padding: 16px;
  }
`;

const Button = styled("button")`
  display: none;

  padding: 1rem;
  width: 50%;
  margin-top: 32px;
  color: #ffffff;
  background-color: #be0fbe;
  border: none;
  &:active {
    background-color: #09dd5a;
  }
  @media (hover: hover) and (pointer: fine) {
    // タッチデバイス以外（タッチデバイスだとhoverが残り続ける）
    &:hover {
      background-color: #09dd5a;
    }
  }
`;

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
    []
  );

  const [vibrantResultList, setVibrantResultList] = useState<VibrantResult[]>(
    []
  );

  const [inputEmoji, setInputEmoji] = useState<string>("🥎🍙");

  const [inputImage, setInputImage] = useState<string[]>([
    getImageURLFromOrigin(
      "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
      origin
    ),
    getImageURLFromOrigin("/images/max-zhang-gkdyrA_eOo8-unsplash.jpg", origin),
  ]);

  const createVibrantSourceList = useCallback(() => {
    const inputEmojiList: VibrantSource[] = getEmojiListFromString(
      inputEmoji
    ).map((emoji) => {
      return {
        emoji: emoji,
        type: "emoji",
      };
    });

    const inputImageList: VibrantSource[] = inputImage.map((file) => {
      return {
        file: file,
        type: "image",
      };
    });

    setVibrantSourceList([...inputEmojiList, ...inputImageList]);
  }, [inputEmoji, inputImage]);

  useEffect(() => {
    //TODO useCallback、実際はうまくいっている気がする
    createVibrantSourceList();
  }, [inputEmoji, inputImage]);

  useEffect(() => {
    createVibrantSourceList();
  }, []);

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
    createVibrantSourceList();
  };

  return (
    <>
      <Title>
        node-vibrant example
        <br /> ( Playground )
      </Title>

      <InputBlock>
        <h2>emoji</h2>
        <EmojiInput
          type={"text"}
          value={inputEmoji}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputEmoji(event.target.value.trim());
          }}
        />
        <h2>image</h2>
        <DropZoneWithPreview
          defaultValue={inputImage}
          onChange={(images: string[]) => {
            setInputImage(images);
          }}
        ></DropZoneWithPreview>
        <Button type="button" onClick={onClickButton}>
          Play
        </Button>
      </InputBlock>

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
