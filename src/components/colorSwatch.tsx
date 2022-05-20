import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Swatch } from "@vibrant/color";
import { ReactNode } from "react";

const backgroundDynamicStyle = ({ rgb }: { rgb: any }) => {
  return css`
    background-color: rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]});
  `;
};

const Component = styled("div")`
  border: solid 1px #000000;
  padding: 8px;
  margin-bottom: 8px;
  overflow: hidden;
  ${backgroundDynamicStyle}
`;

type ColorSwatchProps = {
  swatch: Swatch;
  label: string;
};

const ColorSwatch: React.FC<ColorSwatchProps> = ({ swatch, label }) => {
  const { rgb } = swatch;
  return (
    <Component rgb={rgb}>
      {label}: {rgb.toString()}
    </Component>
  );
};

export default ColorSwatch;
