import { getEmojiListFromString, VibrantSource } from "@/lib/ColorAnalyzer";
import { getImageURLFromOrigin } from "@/utils/fileUtils";
import { mq } from "@/utils/mq";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import DropZoneWithPreview, {
  DropZoneWithPreviewChildHandles,
} from "./DropZoneWithPreview";

type PlaygroundInputProps = {
  initialVibrantSourceList: VibrantSource[];
  origin: string;
  onChange?: (vibrantSourceList: VibrantSource[]) => void;
};

type InitialInputValue = {
  inputEmoji: string;
  inputImage: string[];
};

const InputBlock = styled("div")`
  width: 90%;
  padding: 1rem;
  border: solid 3px #ffffff;
  margin-bottom: 48px;
  text-align: center;
`;

const Label = styled("h2")`
  text-align: left;
  padding: 0;
  margin: 0 0 8px 0;
`;

const InputBlockInner = styled("div")`
  position: relative;
  top: 0;
  left: 0;
`;

const EmojiInput = styled("input")`
  font-size: 2rem;
  line-height: 1;
  padding: 8px;
  width: 100%;
  margin-bottom: 8px;
  ${mq("sm")} {
    font-size: 3rem;
    padding: 16px;
  }
`;

const Button = styled("button")`
  display: none;

  padding: 1rem;
  width: 50%;
  margin-top: 32px;
  color: #ffffff;
  background-color: #be0fbe;
  border: none;
  &:active {
    background-color: #09dd5a;
  }
  @media (hover: hover) and (pointer: fine) {
    // タッチデバイス以外（タッチデバイスだとhoverが残り続ける）
    &:hover {
      background-color: #09dd5a;
    }
  }
`;

const ResetButton = styled("button")`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.4rem 1rem;
  color: #ffffff;
  background-color: #be0fbe;
  border: none;
  &:active {
    background-color: #09dd5a;
  }
  @media (hover: hover) and (pointer: fine) {
    // タッチデバイス以外（タッチデバイスだとhoverが残り続ける）
    &:hover {
      background-color: #09dd5a;
    }
  }
`;

const PlaygroundInput: React.FC<PlaygroundInputProps> = ({
  initialVibrantSourceList,
  origin,
  onChange,
}) => {
  const [vibrantSourceList, setVibrantSourceList] = useState<VibrantSource[]>(
    []
  );
  const dropZoneRef = useRef<DropZoneWithPreviewChildHandles>(null);

  const [inputEmoji, setInputEmoji] = useState<string>("");

  const [inputImage, setInputImage] = useState<string[]>([]);

  const [initInputValue, setInitInputValue] = useState<boolean>(false);

  const createInitialInputValue = () => {
    // TODO　強引
    if (initInputValue) {
      return;
    } else {
      setInitInputValue(true);
    }

    const initialInputValue: InitialInputValue = {
      inputEmoji: "",
      inputImage: [],
    };

    for (let i: number = 0; i < initialVibrantSourceList.length; i++) {
      const source = initialVibrantSourceList[i];
      if (source.type === "emoji") {
        initialInputValue.inputEmoji += source.emoji;
      } else {
        initialInputValue.inputImage.push(
          getImageURLFromOrigin(source.file!, origin)
        );
      }
    }

    setInputEmoji(initialInputValue.inputEmoji);
    setInputImage(initialInputValue.inputImage);
  };

  const createVibrantSourceList = useCallback(() => {
    const inputEmojiList: VibrantSource[] = getEmojiListFromString(
      inputEmoji
    ).map((emoji) => {
      return {
        emoji: emoji,
        type: "emoji",
      };
    });

    const inputImageList: VibrantSource[] = inputImage.map((file) => {
      return {
        file: file,
        type: "image",
      };
    });

    const newVibrantSourceList = [...inputEmojiList, ...inputImageList];
    setVibrantSourceList(newVibrantSourceList);

    if (onChange) {
      onChange(newVibrantSourceList);
    }
  }, [inputEmoji, inputImage]);

  useEffect(() => {
    //TODO useCallback、実際はうまくいっている気がする
    createVibrantSourceList();
  }, [inputEmoji, inputImage]);

  useEffect(() => {
    createInitialInputValue();
  }, []);

  const onClickButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    createVibrantSourceList();
  };

  const onClickResetButton = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setInputEmoji("");
    setInputImage([]);
    // TODO 汚い
    dropZoneRef.current?.resetAll();
  };
  return (
    <InputBlock>
      <InputBlockInner>
        <Label>emoji</Label>
        <EmojiInput
          type={"text"}
          value={inputEmoji}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setInputEmoji(event.target.value.trim());
          }}
        />
        <Label>image</Label>
        {initInputValue ? (
          <DropZoneWithPreview
            ref={dropZoneRef}
            defaultValue={inputImage}
            onChange={(images: string[]) => {
              setInputImage(images);
            }}
          />
        ) : (
          ""
        )}
        <Button type="button" onClick={onClickButton}>
          Play
        </Button>
        <ResetButton type="button" onClick={onClickResetButton}>
          Reset all
        </ResetButton>
      </InputBlockInner>
    </InputBlock>
  );
};

export default PlaygroundInput;
