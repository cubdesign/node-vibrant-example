import { ratioInteger, RatioSwatch, rgbInteger } from "@/lib/ColorAnalyzer";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Vec3 } from "node-vibrant/lib/color";
import Color from "color";
export type VibrantColorSwatchProps = {
  ratioSwatch: RatioSwatch;
};

const dynamicStyle = ({ rgb }: { rgb: any }) => {
  const backgroundColor: string = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const textColor: string = Color(backgroundColor).isLight()
    ? Color(backgroundColor).darken(0.8).toString()
    : "inherit";
  return css`
    color: ${textColor};
    background-color: ${backgroundColor};
  `;
};

const Component = styled("div")`
  border: solid 1px #000000;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  ${dynamicStyle}
`;

const ComponentInner = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled("span")`
  display: inline-block;
  &::after {
    content: ":";
    font-size: 10px;
    opacity: 0.5;
  }
`;

const Rgb = styled("span")`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  flex: 3;
  padding-left: 2px;

  &::before {
    content: "rgb(";
    font-size: 10px;
    opacity: 0.5;
  }
  &::after {
    content: ")";
    font-size: 10px;
    opacity: 0.5;
  }
`;

const Population = styled("span")`
  display: block;
  flex: 1;
  text-align: right;
  &::after {
    content: "p";
    font-size: 10px;
    opacity: 0.5;
  }
`;

const Ratio = styled("span")`
  display: block;
  flex-basis: 32px;
  text-align: right;
  &::after {
    content: "%";
    font-size: 10px;
    opacity: 0.5;
  }
`;

const VibrantColorSwatch: React.FC<VibrantColorSwatchProps> = ({
  ratioSwatch,
}) => {
  const { rgb, population } = ratioSwatch.swatch;
  const { label, ratio } = ratioSwatch;

  // 少数点が多すぎるとテキストが切れるので、数値を切り捨て
  const shortRgb: Vec3 = rgbInteger(rgb);

  return (
    <Component rgb={shortRgb}>
      <ComponentInner>
        <Label>{label}</Label>
        <Rgb>{shortRgb.join(",")}</Rgb>
        <Population>{population}</Population>
        <Ratio>{ratioInteger(ratio)}</Ratio>
      </ComponentInner>
    </Component>
  );
};

export default VibrantColorSwatch;
