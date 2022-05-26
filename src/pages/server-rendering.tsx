import styled from "@emotion/styled";
import type { GetServerSideProps, NextPageWithLayout } from "next";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";
import VibrantBlock from "@/components/VibrantBlock";
import { mq } from "@/utils/mq";
import { ReactElement } from "react";
import DefaultLayout, { Title } from "@/components/layouts/defaultLayout";

type ServerRenderingPageProps = {
  vibrantResultListString: string;
};

const ServerRenderingPage: NextPageWithLayout<ServerRenderingPageProps> = ({
  vibrantResultListString,
}) => {
  const vibrantResultList: VibrantResult[] = JSON.parse(
    vibrantResultListString
  );

  return (
    <>
      <Title>
        node-vibrant example
        <br /> ( SSR )
      </Title>

      {vibrantResultList.map((vibrantResult: VibrantResult, index: number) => {
        return (
          <VibrantBlock
            key={`VibrantBlock${index}`}
            vibrantResult={vibrantResult}
          />
        );
      })}
    </>
  );
};

ServerRenderingPage.getLayout = (page: ReactElement) => {
  return (
    <DefaultLayout
      title="node-vibrant example ( SSR )"
      description="node-vibrant example ( SSR )"
    >
      {page}
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const vibrantSourceList: VibrantSource[] = [
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

  const { origin } = absoluteUrl(context.req);

  const vibrantResultList: VibrantResult[] = await getVibrantList(
    vibrantSourceList,
    origin
  );

  const props: ServerRenderingPageProps = {
    vibrantResultListString: JSON.stringify(vibrantResultList),
  };

  return {
    props: props,
  };
};

export default ServerRenderingPage;
