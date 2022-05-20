import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Vibrant from "node-vibrant";
import path from "path";
import { Palette, Vec3 } from "@vibrant/color";
import { css } from "@emotion/react";
import ColorSwatch from "@/components/colorSwatch";

type HomeProps = {
  paletteString: string;
  imagePath: string;
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

const Home: NextPage<HomeProps> = ({ paletteString, imagePath }) => {
  const palette: Palette = JSON.parse(paletteString);
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    palette;
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

        <VibrantBlock mainColor={`rgb(${DarkVibrant?.rgb.toString()})`}>
          <ImageWrapper>
            <Image src={imagePath} alt="image1" />
          </ImageWrapper>

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
              <ColorSwatch
                swatch={DarkVibrant}
                label="DarkVibrant"
              ></ColorSwatch>
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
            <code>{paletteString}</code>
          </JSONViewer>
        </VibrantBlock>
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
  const image1PublicFilePath: string =
    "/images/david-clode-fT2qXggBlks-unsplash.jpg";

  const image1FilePath: string = path.resolve(
    process.cwd(),
    `public${image1PublicFilePath}`
  );

  // Using builder
  const palette = await Vibrant.from(image1FilePath).getPalette();

  const props: HomeProps = {
    paletteString: JSON.stringify(palette),
    imagePath: image1PublicFilePath,
  };

  return {
    props: props,
  };
};
