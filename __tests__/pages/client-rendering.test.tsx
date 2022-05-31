import { render, screen, waitFor } from "@testing-library/react";
import ClientRenderingPage from "@/pages/client-rendering";

const origin: string = "http://localhost:3000";

describe("ClientRenderingPage", () => {
  it("renders a heading", () => {
    render(<ClientRenderingPage origin={origin} />);
    expect(screen.getByText(/CSR/)).toBeInTheDocument();
  });

  it("結果が表示されること", async () => {
    render(<ClientRenderingPage origin={origin} />);
    await waitFor(() => screen.getAllByText(/Muted/), { timeout: 1000 * 5 });
  });
});
