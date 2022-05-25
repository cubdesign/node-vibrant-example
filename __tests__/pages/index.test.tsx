import { render, screen } from "@testing-library/react";
import PlaygroundPage from "@/pages/index";

describe("PlaygroundPage", () => {
  it("renders a heading", () => {
    const origin: string = "http://localhost:3000";

    render(<PlaygroundPage origin={origin} />);
    expect(screen.getByText(/Playground/)).toBeInTheDocument();
  });
});
