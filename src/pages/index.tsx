import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Vibrant from "node-vibrant";
import { Palette, Vec3 } from "@vibrant/color";
import { css } from "@emotion/react";
import ColorSwatch from "@/components/colorSwatch";
import { ReactNode } from "react";
import absoluteUrl from "next-absolute-url";

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
  max-width: 200px;
  margin-bottom: 16px;
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
  ${backgroundDynamicStyle}
`;

const ColorSwatchBlock = styled("div")`
  padding: 2rem;
`;

const JSONViewer = styled("div")`
  padding: 1rem;
  color: #ffffff;
  line-height: 1.6rem;
  border: solid 1px #000000;
`;

const createVibrantBlock = (paletteImage: PaletteImage): ReactNode => {
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    paletteImage.palette;
  return (
    <VibrantBlock
      key={paletteImage.imageURL}
      mainColor={`rgb(${DarkMuted?.rgb.toString()})`}
    >
      <ImageWrapper>
        <Image src={paletteImage.imageURL} alt="image1" />
      </ImageWrapper>

      <ColorSwatchBlock>
        {Vibrant ? (
          <ColorSwatch swatch={Vibrant} label="Vibrant"></ColorSwatch>
        ) : (
          ""
        )}

        {Muted ? <ColorSwatch swatch={Muted} label="Muted"></ColorSwatch> : ""}

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
          <ColorSwatch swatch={LightVibrant} label="LightVibrant"></ColorSwatch>
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
    </VibrantBlock>
  );
};

const Home: NextPage<HomeProps> = ({ paletteImagesString }) => {
  const paletteImages: PaletteImage[] = JSON.parse(paletteImagesString);

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
    "/images/max-zhang-gkdyrA_eOo8-unsplash.jpg",
    "/images/zhang_d-cCatH3q6o9M-unsplash.jpg",
    "/images/david-clode-fT2qXggBlks-unsplash.jpg",
  ];

  const paletteImages: PaletteImage[] = [];

  for (let i: number = 0; i < images.length; i++) {
    const imagePath: string = images[i];
    const imageURL: string = getImageURLFromOrigin(imagePath, origin);

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
