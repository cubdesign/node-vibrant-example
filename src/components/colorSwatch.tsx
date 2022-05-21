import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Swatch, Vec3 } from "@vibrant/color";

type ColorSwatchProps = {
  swatch: Swatch;
  label: string;
};

const backgroundDynamicStyle = ({ rgb }: { rgb: any }) => {
  return css`
    background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
  `;
};

const Component = styled("div")`
  border: solid 1px #000000;
  padding: 8px;
  margin-bottom: 8px;
  font-size: 0.86rem;
  ${backgroundDynamicStyle}
`;

const ComponentInner = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled("span")`
  display: inline-block;
`;

const Rgb = styled("span")`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  width: 100%;
  padding-left: 8px;
  padding-right: 16px;
`;

const Population = styled("span")`
  display: inline-block;
`;

const rgbFloor = (rgb: Vec3): Vec3 => {
  return rgb.map((n: number): number => {
    // 小数第2位以下を切り捨て
    return Math.floor(n * 10) / 10;
  }) as Vec3;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({ swatch, label }) => {
  const { rgb, population } = swatch;

  // 少数点が多すぎるとテキストが切れるので、数値を切り捨て
  const shortRgb: Vec3 = rgbFloor(rgb);

  return (
    <Component rgb={rgb}>
      <ComponentInner>
        <Label>{label}: </Label>
        <Rgb>[ {shortRgb.join(", ")} ]</Rgb>
        <Population>{population}</Population>
      </ComponentInner>
    </Component>
  );
};

export default ColorSwatch;
