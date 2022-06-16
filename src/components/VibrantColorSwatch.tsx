import { ColorSwatch, ratioInteger, rgbInteger } from "@/lib/ColorAnalyzer";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Color from "color";
import { useMemo } from "react";

export type VibrantColorSwatchProps = {
  swatch: ColorSwatch;
  isTop?: boolean;
};

const dynamicStyle = ({ rgb, isTop }: { rgb: number[]; isTop: boolean }) => {
  const backgroundColor: string = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const textColor: string = Color(backgroundColor).isLight()
    ? Color(backgroundColor).darken(0.8).toString()
    : "inherit";

  const borderSize = isTop ? 3 : 1;

  return css`
    color: ${textColor};
    background-color: ${backgroundColor};
    border: solid ${borderSize}px #000000;
  `;
};

const Component = styled("div")`
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
  swatch,
  isTop = false,
}) => {
  const { label, ratio, rgb, population } = swatch;

  // 少数点が多すぎるとテキストが切れるので、数値を切り捨て
  const shortRgb: number[] = useMemo(() => rgbInteger(rgb), [rgb]);

  // 数値を切り捨て
  const shortRatio: number = useMemo(() => ratioInteger(ratio), [ratio]);

  return (
    <Component rgb={shortRgb} isTop={isTop}>
      <ComponentInner>
        <Label>{label}</Label>
        <Rgb>{shortRgb.join(",")}</Rgb>
        <Population>{population}</Population>
        <Ratio>{shortRatio}</Ratio>
      </ComponentInner>
    </Component>
  );
};

export default VibrantColorSwatch;
