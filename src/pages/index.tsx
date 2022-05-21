import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Vibrant from "node-vibrant";
import { Palette } from "@vibrant/color";
import { css } from "@emotion/react";
import ColorSwatch from "@/components/colorSwatch";
import { ReactNode } from "react";
import absoluteUrl from "next-absolute-url";
import { mq } from "@/utils/mq";
import { EmojiEntity, parse, toCodePoints } from "twemoji-parser";

type PaletteImage = {
  imagePath: string;
  imageURL: string;
  palette: Palette;
};

type HomeProps = {
  paletteImagesString: string;
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

const ImageWrapper = styled("div")`
  text-align: center;
`;

const backgroundDynamicStyle = ({ mainColor }: { mainColor: any }) => {
  return css`
    background-color: ${mainColor};
  `;
};

const VibrantBlock = styled("div")`
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  ${backgroundDynamicStyle} ${mq("sm")} {
    display: flex;
  }
`;

const ImageBlock = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 50vh;
  ${mq("sm")} {
    min-height: auto;
    width: 50%;
  }
`;

const DetailBlock = styled("div")`
  ${mq("sm")} {
    width: 50%;
  }
`;

const ColorSwatchBlock = styled("div")`
  padding: 2rem 1rem;
`;

const JSONViewer = styled("div")`
  padding: 0 1rem;
  line-height: 1.3rem;
  color: #ffffff;
  opacity: 0.2;
  code {
    word-break: break-all;
  }
`;

const createVibrantBlock = (paletteImage: PaletteImage): ReactNode => {
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    paletteImage.palette;
  return (
    <VibrantBlock
      key={paletteImage.imageURL}
      mainColor={`rgb(${DarkMuted?.rgb.toString()})`}
    >
      <ImageBlock
        style={{
          backgroundImage: `
          linear-gradient(
               45deg,
               rgb(${Vibrant?.rgb.toString()}) 0% 30%, 
               rgb(${Muted?.rgb.toString()}) 0% 40%,
               rgb(${DarkVibrant?.rgb.toString()}) 0% 50%, 
               rgb(${DarkMuted?.rgb.toString()}) 0% 60%, 
               rgb(${LightVibrant?.rgb.toString()}) 0% 70%, 
               rgb(${LightMuted?.rgb.toString()}) 0% 80%
           )
            `,
        }}
      >
        <ImageWrapper>
          <Image src={paletteImage.imageURL} alt="image1" />
        </ImageWrapper>
      </ImageBlock>
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
          <code>{JSON.stringify(paletteImage.palette)}</code>
        </JSONViewer>
      </DetailBlock>
    </VibrantBlock>
  );
};

const Home: NextPage<HomeProps> = ({ paletteImagesString }) => {
  const paletteImages: PaletteImage[] = JSON.parse(paletteImagesString);
  const emoji = "💨😅🙅🏻‍♂️";
  const emojiEntities: EmojiEntity[] = parse(emoji, {
    buildUrl: (codepoints: string, assetType: string): string => {
      return assetType === "png"
        ? `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/${codepoints}.png`
        : `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
    },
    assetType: "png",
  });

  let emojiDisplay: JSX.Element[] = [];
  for (let i: number = 0; i < emojiEntities.length; i++) {
    const emojiEntity: EmojiEntity = emojiEntities[i];
    emojiDisplay.push(
      <div key={emojiDisplay.length}>
        {`${emojiEntity.text} : `}
        <img src={emojiEntity.url} alt={emojiEntity.text} />
        {` : ${emojiEntity.url.replace(/.*\/(.*)\.(png|svg)/, "$1")}`}
        {/* {` : ${emojiEntity.url}`} */}
      </div>
    );
  }

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

        <div
          style={{
            padding: "1rem",
            fontSize: "2rem",
          }}
        >
          {emojiDisplay}
        </div>

        {paletteImages.map((paletteImage: PaletteImage) => {
          return createVibrantBlock(paletteImage);
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

const getImageURLFromOrigin = (imagePath: string, origin: string): string => {
  const imageURL: string = `${origin}${imagePath}`;
  return imageURL;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { origin } = absoluteUrl(context.req);

  const images: string[] = [
    `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f4a8.png`,
    `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f605.png`,
    `https://cdn.jsdelivr.net/npm/emoji-datasource-apple@14.0.0/img/apple/64/1f645-1f3fb-200d-2642-fe0f.png`,
    "/images/elza-kurbanova-f8MLY_HKwqQ-unsplash.jpg",
    "/images/erik-mclean-9y1cTVKe1IY-unsplash.jpg",
    "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
    "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
    "/images/david-clode-fT2qXggBlks-unsplash.jpg",
  ];

  const paletteImages: PaletteImage[] = [];

  for (let i: number = 0; i < images.length; i++) {
    const imagePath: string = images[i];
    const imageURL: string = /^(https:|http:)/.test(imagePath)
      ? imagePath
      : getImageURLFromOrigin(imagePath, origin);

    // Using builder
    const palette = await Vibrant.from(imageURL).getPalette();

    const paletteImage: PaletteImage = {
      imagePath: imagePath,
      imageURL: imageURL,
      palette: palette,
    };
    paletteImages.push(paletteImage);
  }

  const props: HomeProps = {
    paletteImagesString: JSON.stringify(paletteImages),
  };

  return {
    props: props,
  };
};
