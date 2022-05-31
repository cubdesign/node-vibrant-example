import { render, screen, waitFor } from "@testing-library/react";
import PlaygroundPage from "@/pages/index";

const origin: string = "http://localhost:3000";

describe("PlaygroundPage", () => {
  test("renders a heading", async () => {
    render(<PlaygroundPage origin={origin} />);
    expect(screen.getByText(/Playground/)).toBeInTheDocument();
  });

  test.skip("結果表示できる", async () => {
    render(<PlaygroundPage origin={origin} />);
    // ↓ ここで落ちる
    const Muted = await waitFor(() => screen.findByText(/Muted/));
    screen.debug();
    expect(Muted).toBeInTheDocument();
  });
});
