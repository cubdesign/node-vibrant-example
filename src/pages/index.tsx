import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Palette } from "@vibrant/color";
import { css } from "@emotion/react";
import ColorSwatch from "@/components/colorSwatch";
import { ReactNode } from "react";
import absoluteUrl from "next-absolute-url";
import { mq } from "@/utils/mq";
import {
  getVibrantList,
  VibrantResult,
  VibrantSource,
} from "@/lib/ColorAnalyzer";

type HomeProps = {
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
  font-size: 4rem;
  text-align: center;
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

const Image = styled("img")`
  max-width: 100%;
  max-height: 50vh;
  ${mq("sm")} {
    max-height: 60vh;
  }
`;
const Emoji = styled("div")`
  font-size: 12rem;
`;

// TODO これは、不要かも
const ViewerWrapper = styled("div")`
  text-align: center;
`;

const vibrantBlockBackgroundDynamicStyle = ({
  mainColor,
}: {
  mainColor: any;
}) => {
  return css`
    background-color: ${mainColor};
  `;
};

const VibrantBlock = styled("div")`
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  ${vibrantBlockBackgroundDynamicStyle}
  ${mq("sm")} {
    display: flex;
  }
`;

const viewerBlockBackgroundDynamicStyle = ({
  palette,
}: {
  palette: Palette;
}) => {
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    palette;

  return css`
    background-image: linear-gradient(
      45deg,
      rgb(${Vibrant?.rgb.toString()}) 0% 30%,
      rgb(${Muted?.rgb.toString()}) 0% 40%,
      rgb(${DarkVibrant?.rgb.toString()}) 0% 50%,
      rgb(${DarkMuted?.rgb.toString()}) 0% 60%,
      rgb(${LightVibrant?.rgb.toString()}) 0% 70%,
      rgb(${LightMuted?.rgb.toString()}) 0% 80%
    );
  `;
};

const ViewerBlock = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 50vh;
  ${viewerBlockBackgroundDynamicStyle}
  ${mq("sm")} {
    min-height: auto;
    width: 50%;
  }
`;

const DetailBlock = styled("div")`
  ${mq("sm")} {
    padding-left: 1rem;
    width: 50%;
  }
`;

const ColorSwatchBlock = styled("div")`
  padding: 2rem 1rem;
`;

const JSONViewer = styled("div")`
  padding: 0 1rem;
  font-size: 12px;
  line-height: 1.2rem;
  color: #ffffff;
  opacity: 0.2;
  code {
    word-break: break-all;
  }
`;

const createVibrantBlock = (vibrantResult: VibrantResult): ReactNode => {
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    vibrantResult.palette;
  return (
    <VibrantBlock
      key={vibrantResult.imageURL}
      mainColor={`rgb(${DarkMuted?.rgb.toString()})`}
    >
      <ViewerBlock palette={vibrantResult.palette}>
        <ViewerWrapper>
          {vibrantResult.source.type === "image" ? (
            <Image src={vibrantResult.imageURL} alt="image1" />
          ) : (
            <Emoji>{vibrantResult.source.emoji}</Emoji>
          )}
        </ViewerWrapper>
      </ViewerBlock>
      <DetailBlock>
        <ColorSwatchBlock>
          {Vibrant ? (
            <ColorSwatch swatch={Vibrant} label="Vibrant"></ColorSwatch>
          ) : (
            ""
          )}

          {Muted ? (
            <ColorSwatch swatch={Muted} label="Muted"></ColorSwatch>
          ) : (
            ""
          )}

          {DarkVibrant ? (
            <ColorSwatch swatch={DarkVibrant} label="DarkVibrant"></ColorSwatch>
          ) : (
            ""
          )}

          {DarkMuted ? (
            <ColorSwatch swatch={DarkMuted} label="DarkMuted"></ColorSwatch>
          ) : (
            ""
          )}

          {LightVibrant ? (
            <ColorSwatch
              swatch={LightVibrant}
              label="LightVibrant"
            ></ColorSwatch>
          ) : (
            ""
          )}

          {LightMuted ? (
            <ColorSwatch swatch={LightMuted} label="LightMuted"></ColorSwatch>
          ) : (
            ""
          )}
        </ColorSwatchBlock>

        <JSONViewer>
          <code>{JSON.stringify(vibrantResult)}</code>
        </JSONViewer>
      </DetailBlock>
    </VibrantBlock>
  );
};

const Home: NextPage<HomeProps> = ({ vibrantResultListString }) => {
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
        <p>サンプルです。</p>

        {vibrantResultList.map((vibrantResult: VibrantResult) => {
          return createVibrantBlock(vibrantResult);
        })}
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

export default Home;

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

  const props: HomeProps = {
    vibrantResultListString: JSON.stringify(vibrantResultList),
  };

  return {
    props: props,
  };
};
