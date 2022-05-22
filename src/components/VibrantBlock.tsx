import styled from "@emotion/styled";
import VibrantColorSwatch from "@/components/VibrantColorSwatch";
import { mq } from "@/utils/mq";
import { Palette } from "@vibrant/color";
import { css } from "@emotion/react";
import { VibrantResult } from "@/lib/ColorAnalyzer";

type VibrantBlockhProps = {
  vibrantResult: VibrantResult;
};

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

const containerBackgroundDynamicStyle = ({ mainColor }: { mainColor: any }) => {
  return css`
    background-color: ${mainColor};
  `;
};

const Container = styled("div")`
  padding: 16px;
  margin-bottom: 16px;
  width: 100%;
  ${containerBackgroundDynamicStyle}
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

const VibrantBlock: React.FC<VibrantBlockhProps> = ({ vibrantResult }) => {
  const { Vibrant, Muted, DarkVibrant, DarkMuted, LightVibrant, LightMuted } =
    vibrantResult.palette;
  return (
    <Container
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
            <VibrantColorSwatch
              swatch={Vibrant}
              label="Vibrant"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}

          {Muted ? (
            <VibrantColorSwatch
              swatch={Muted}
              label="Muted"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}

          {DarkVibrant ? (
            <VibrantColorSwatch
              swatch={DarkVibrant}
              label="DarkVibrant"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}

          {DarkMuted ? (
            <VibrantColorSwatch
              swatch={DarkMuted}
              label="DarkMuted"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}

          {LightVibrant ? (
            <VibrantColorSwatch
              swatch={LightVibrant}
              label="LightVibrant"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}

          {LightMuted ? (
            <VibrantColorSwatch
              swatch={LightMuted}
              label="LightMuted"
            ></VibrantColorSwatch>
          ) : (
            ""
          )}
        </ColorSwatchBlock>

        <JSONViewer>
          <code>{JSON.stringify(vibrantResult)}</code>
        </JSONViewer>
      </DetailBlock>
    </Container>
  );
};

export default VibrantBlock;
