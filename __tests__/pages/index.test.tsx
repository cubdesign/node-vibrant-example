import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const posts: any[] = [];
    render(
      <Home
        imagePath="/images/david-clode-fT2qXggBlks-unsplash.jpg"
        paletteString='{"Vibrant":{"rgb":[201,48,72],"population":240},"DarkVibrant":{"rgb":[22,60,4],"population":10},"LightVibrant":{"rgb":[229.43855421686743,147.96144578313255,160.7421686746988],"population":0},"Muted":{"rgb":[164,114,131],"population":920},"DarkMuted":{"rgb":[55,74,48],"population":1270},"LightMuted":{"rgb":[185,208,168],"population":207}}'
      />
    );
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
