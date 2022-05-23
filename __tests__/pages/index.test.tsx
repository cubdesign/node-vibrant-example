import { render, screen } from "@testing-library/react";
import FrontendPage from "@/pages/index";

describe("FrontendPage", () => {
  it("renders a heading", () => {
    const origin: string = "http://localhost:3000";

    render(<FrontendPage origin={origin} />);
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
