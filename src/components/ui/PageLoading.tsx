import styled from "@emotion/styled";

const Loading = styled("span")`
  opacity: 0;
  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  // ちらつくので、loading表示まで、600msあける（早くページがロードしたら表示させない）
  animation: fade 300ms ease-in-out 600ms;
`;

const PageLoading = () => {
  return <Loading>now loading...</Loading>;
};
export default PageLoading;
