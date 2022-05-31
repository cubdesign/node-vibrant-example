import { mq } from "@/utils/mq";
import styled from "@emotion/styled";

const StyledEmojiInput = styled("input")`
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

type EmojiInputProps = {
  value: string;
  onChange?: (text: string) => void | undefined;
};

const EmojiInput: React.FC<EmojiInputProps> = ({ value, onChange }) => {
  const onChangeEmojiInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value.trim());
    }
  };

  return (
    <StyledEmojiInput type="text" value={value} onChange={onChangeEmojiInput} />
  );
};

export default EmojiInput;
