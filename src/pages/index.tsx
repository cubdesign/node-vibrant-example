import styled from "@emotion/styled";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Vibrant from "node-vibrant";
import path from "path";
import { Palette, Vec3 } from "@vibrant/color";
import { css } from "@emotion/react";

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
const backgroundDynamicStyle = ({ rgb }: { rgb: any }) => {
  console.log(rgb);
  return css`
    background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
  `;
};

const ColorSwatch = styled("div")`
  border: solid 1px #000000;
  padding: 8px;
  margin-bottom: 8px;
  ${backgroundDynamicStyle}
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
        <div
          style={{
            padding: "16px",
            backgroundColor: `rgb(${Vibrant?.rgb.toString()})`,
          }}
        >
          <div>
            <img
              src={imagePath}
              alt="image1"
              style={{
                maxWidth: "200px",
                marginBottom: "16px",
              }}
            />
          </div>
          <div>
            <ColorSwatch rgb={Vibrant?.rgb}>
              Vibrant: {Vibrant?.rgb.toString()}
            </ColorSwatch>

            <ColorSwatch rgb={Muted?.rgb}>
              Vibrant: {Muted?.rgb.toString()}
            </ColorSwatch>

            <ColorSwatch rgb={DarkVibrant?.rgb}>
              Vibrant: {DarkVibrant?.rgb.toString()}
            </ColorSwatch>

            <ColorSwatch rgb={DarkMuted?.rgb}>
              Vibrant: {DarkMuted?.rgb.toString()}
            </ColorSwatch>

            <ColorSwatch rgb={LightVibrant?.rgb}>
              Vibrant: {LightVibrant?.rgb.toString()}
            </ColorSwatch>

            <ColorSwatch rgb={LightMuted?.rgb}>
              Vibrant: {LightMuted?.rgb.toString()}
            </ColorSwatch>
          </div>

          {/* <pre> */}
          <code>{paletteString}</code>
          {/* </pre> */}
        </div>
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
