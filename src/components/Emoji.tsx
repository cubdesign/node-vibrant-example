import { ExtendsEmojiEntity } from "@/lib/ColorAnalyzer";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import Color from "color";

type EmojiProps = {
  emoji: ExtendsEmojiEntity;
  mainColor: string;
  size?: number;
  debug?: boolean;
};

const StyledEmoji = styled("div")(
  ({
    mainColor,
    size,
    baseFontSize = 16,
  }: {
    mainColor: string;
    size: number;
    baseFontSize?: number;
  }) => `
    font-size: ${size}rem;
    filter: drop-shadow(0 0px ${size * baseFontSize * 0.01}px ${Color(mainColor)
    .darken(0.8)
    .toString()});
`
);

const ImageEmoji = styled("div")(
  ({
    mainColor,
    size,
    baseFontSize = 16,
  }: {
    mainColor: string;
    size: number;
    baseFontSize?: number;
  }) => `
    img {
        width: ${size * baseFontSize}px;
        height: ${size * baseFontSize}px;
        filter: drop-shadow(0 0px ${size * baseFontSize * 0.01}px ${Color(
    mainColor
  )
    .darken(0.8)
    .toString()});
    }
  `
);

const SVGEmoji = styled("div")(
  ({
    mainColor,
    size,
    baseFontSize = 16,
  }: {
    mainColor: string;
    size: number;
    baseFontSize?: number;
  }) => `
      img {
          width: ${size * baseFontSize}px;
          height: ${size * baseFontSize}px;
          filter: drop-shadow(0 0px ${size * baseFontSize * 0.01}px ${Color(
    mainColor
  )
    .darken(0.3)
    .toString()});
      }
    `
);

const Emoji: React.FC<EmojiProps> = ({
  emoji,
  mainColor,
  size = 1,
  debug = false,
}) => {
  const getView = (
    emoji: ExtendsEmojiEntity,
    mainColor: string,
    debug: boolean
  ): ReactNode => {
    if (debug) {
      return (
        <ImageEmoji mainColor={mainColor} size={size}>
          <img
            src={`https://cdn.jsdelivr.net/npm/emoji-datasource-${emoji.brand}@14.0.0/img/${emoji.brand}/64/${emoji.unicode}.png`}
            alt={emoji.text}
          />
        </ImageEmoji>
      );
    }

    if (emoji.brand === "twitter") {
      return (
        <SVGEmoji mainColor={mainColor} size={size}>
          <img
            src={`https://twemoji.maxcdn.com/v/latest/svg/${emoji.unicode}.svg`}
            alt={emoji.text}
          />
        </SVGEmoji>
      );
    }

    return (
      <StyledEmoji mainColor={mainColor} size={size}>
        {emoji.text}
      </StyledEmoji>
    );
  };
  const view = getView(emoji, mainColor, debug);
  return <>{view}</>;
};

export default Emoji;
