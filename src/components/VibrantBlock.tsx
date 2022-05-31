import styled from "@emotion/styled";
import VibrantColorSwatch from "@/components/VibrantColorSwatch";
import { mq } from "@/utils/mq";
import { css } from "@emotion/react";
import {
  ColorSwatch,
  getCSSGradientRGBList,
  rgbInteger,
  VibrantResult,
} from "@/lib/ColorAnalyzer";
import EmojiView from "./EmojiView";

type VibrantBlockProps = {
  vibrantResult: VibrantResult;
};

const Image = styled("img")`
  max-width: 100%;
  max-height: 50vh;
  ${mq("sm")} {
    max-height: 60vh;
  }
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
  margin-bottom: 32px;
  width: 100%;
  border-radius: 0;
  ${containerBackgroundDynamicStyle}
  ${mq("sm")} {
    display: flex;
  }
`;

const viewerBlockBackgroundDynamicStyle = ({
  cssGradientRGB,
}: {
  cssGradientRGB: string[];
}) => {
  return css`
    background-image: linear-gradient(45deg, ${cssGradientRGB.join(",")});
  `;
};

const ViewerBlock = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 40vh;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ColorSwatchBlock = styled("div")`
  padding: 2rem 1rem;
  ${mq("sm")} {
    width: 100%;
  }
`;

const JSONViewer = styled("div")`
  padding: 0 1rem;
  font-size: 12px;
  line-height: 1.2rem;
  color: #000000;
  opacity: 0.5;
  code {
    word-break: break-all;
  }
  ${mq("sm")} {
    width: 100%;
  }
`;

const VibrantBlock: React.FC<VibrantBlockProps> = ({ vibrantResult }) => {
  const { swatches, top } = vibrantResult;
  const cssGradientRGBList: string[] = getCSSGradientRGBList(swatches);
  const mainColor: string = `rgb(${rgbInteger(top.rgb).toString()})`;

  return (
    <Container key={vibrantResult.preview} mainColor={mainColor}>
      <ViewerBlock cssGradientRGB={cssGradientRGBList}>
        <ViewerWrapper>
          {vibrantResult.source.type === "image" ? (
            <Image src={vibrantResult.preview} alt="image1" />
          ) : (
            <EmojiView
              emoji={vibrantResult.emoji!}
              mainColor={mainColor}
              size={12}
              debug={false}
            />
          )}
        </ViewerWrapper>
      </ViewerBlock>
      <DetailBlock>
        <ColorSwatchBlock>
          {swatches.map((swatch: ColorSwatch) => {
            return (
              <VibrantColorSwatch
                key={swatch.label}
                swatch={swatch}
              ></VibrantColorSwatch>
            );
          })}
        </ColorSwatchBlock>

        <JSONViewer
          style={{
            display: "none",
          }}
        >
          <code>{JSON.stringify(vibrantResult)}</code>
        </JSONViewer>
      </DetailBlock>
    </Container>
  );
};

export default VibrantBlock;
