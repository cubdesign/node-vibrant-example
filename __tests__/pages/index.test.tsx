import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const posts: any[] = [];
    render(<Home />);
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
