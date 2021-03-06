import { render, screen, waitFor } from "@testing-library/react";
import PlaygroundPage from "@/pages/index";

const origin: string = "http://localhost:3000";

describe("PlaygroundPage", () => {
  test("renders a heading", async () => {
    render(<PlaygroundPage origin={origin} />);
    expect(screen.getByText(/Playground/)).toBeInTheDocument();
  });

  test("結果表示できる", async () => {
    render(<PlaygroundPage origin={origin} />);
    await waitFor(() => screen.getAllByText(/Muted/), { timeout: 1000 * 10 });
    screen.debug();
  });
});
