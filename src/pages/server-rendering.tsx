import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import absoluteUrl from "next-absolute-url";

import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";
import VibrantBlock from "@/components/VibrantBlock";
import { mq } from "@/utils/mq";

type ServerRenderingPageProps = {
  vibrantResultListString: string;
};

const Container = styled("div")`
  padding: 0 2rem;
`;

const Main = styled("main")`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled("h1")`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  text-align: center;

  ${mq("sm")} {
    font-size: 4rem;
  }
`;

const Footer = styled("footer")`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    &:hover,
    &:focus,
    &:active {
      text-decoration: underline;
    }
  }
`;

const ServerRenderingPage: NextPage<ServerRenderingPageProps> = ({
  vibrantResultListString,
}) => {
  const vibrantResultList: VibrantResult[] = JSON.parse(
    vibrantResultListString
  );

  return (
    <Container>
      <Head>
        <title>node-vibrant example</title>
        <meta name="description" content="node-vibrant example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>Welcome to node-vibrant example</Title>
        <p>
          <a
            href="https://github.com/cubdesign/node-vibrant-example"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/cubdesign/node-vibrant-example
          </a>
        </p>

        {vibrantResultList.map(
          (vibrantResult: VibrantResult, index: number) => {
            return (
              <VibrantBlock
                key={`VibrantBlock${index}`}
                vibrantResult={vibrantResult}
              />
            );
          }
        )}
      </Main>

      <Footer>
        <a
          href="https://cubdesign.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; cubdesign
        </a>
      </Footer>
    </Container>
  );
};

export default ServerRenderingPage;

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
