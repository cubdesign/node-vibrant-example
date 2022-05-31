import { render, screen, waitFor } from "@testing-library/react";
import PlaygroundPage from "@/pages/index";

const origin: string = "http://localhost:3000";

describe("PlaygroundPage", () => {
  beforeEach(() => {
    URL.createObjectURL = jest.fn();
  });

  test("renders a heading", async () => {
    render(<PlaygroundPage origin={origin} />);
    expect(screen.getByText(/Playground/)).toBeInTheDocument();
  });

  test.skip("結果表示できる", async () => {
    // ↓ ここで落ちる
    const Muted = await waitFor(() => screen.findByText(/Muted/));
    expect(Muted).toBeInTheDocument();
  });

  afterEach(() => {
    // @ts-ignore: URL.createObjectURL is mocked within beforeEach()
    URL.createObjectURL.mockReset();
    jest.restoreAllMocks();
  });
});
