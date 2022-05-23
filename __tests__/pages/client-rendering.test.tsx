import { render, screen } from "@testing-library/react";
import ClientRenderingPage from "@/pages/client-rendering";

describe("ClientRenderingPage", () => {
  it("renders a heading", () => {
    const origin: string = "http://localhost:3000";

    render(<ClientRenderingPage origin={origin} />);
    expect(screen.getByText(/vibrant/)).toBeInTheDocument();
  });
});
