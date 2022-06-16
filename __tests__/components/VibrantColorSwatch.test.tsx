import { render, screen, waitFor } from "@testing-library/react";
import VibrantColorSwatch from "@/components/VibrantColorSwatch";
import { ColorSwatch } from "@/lib/ColorAnalyzer";

describe("VibrantColorSwatch", () => {
  it("正しく表示されること", () => {
    const swatch: ColorSwatch = {
      label: "Muted",
      rgb: [124, 92, 172],
      hex: "#7c5cac",
      population: 207,
      ratio: 29,
    };

    render(<VibrantColorSwatch swatch={swatch} />);
    expect(screen.getByText(/Muted/)).toBeInTheDocument();
    expect(screen.getByText(/124,92,172/)).toBeInTheDocument();
    expect(screen.getByText(/207/)).toBeInTheDocument();
    expect(screen.getByText(/29/)).toBeInTheDocument();
  });

  it("ratioは切り捨て", () => {
    const swatch: ColorSwatch = {
      label: "Muted",
      rgb: [124, 92, 172],
      hex: "#7c5cac",
      population: 207,
      ratio: 29.6,
    };

    render(<VibrantColorSwatch swatch={swatch} />);
    expect(screen.getByText(/29/)).toBeInTheDocument();
  });

  it("ratioは切り捨て", () => {
    const swatch: ColorSwatch = {
      label: "Muted",
      rgb: [124, 92, 172],
      hex: "#7c5cac",
      population: 207,
      ratio: 29.4,
    };

    render(<VibrantColorSwatch swatch={swatch} />);
    expect(screen.getByText(/29/)).toBeInTheDocument();
  });
});
