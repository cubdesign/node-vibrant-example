import { render, screen } from "@testing-library/react";
import ServerRenderingPage from "@/pages/server-rendering";
import { vibrantResultList } from "__tests__/testData/server-rendering";

describe("ServerRenderingPage", () => {
  it("renders a heading", () => {
    render(<ServerRenderingPage vibrantResultList={vibrantResultList} />);
    expect(screen.getByText(/SSR/)).toBeInTheDocument();
  });
  it("結果が表示されること", () => {
    render(<ServerRenderingPage vibrantResultList={vibrantResultList} />);
    expect(screen.getAllByText(/Muted/)).toBeTruthy();
  });
});
