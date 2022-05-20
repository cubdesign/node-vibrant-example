import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    const paletteImagesString =
      '[{"publicPath":"/images/max-zhang-gkdyrA_eOo8-unsplash.jpg","localPath":"/Users/takeo/Documents/cubdesign/node-vibrant-example/public/images/max-zhang-gkdyrA_eOo8-unsplash.jpg","palette":{"Vibrant":{"rgb":[224,112,57],"population":1051},"DarkVibrant":{"rgb":[121,50,17],"population":52},"LightVibrant":{"rgb":[248,167,105],"population":163},"Muted":{"rgb":[161,128,98],"population":53},"DarkMuted":{"rgb":[59,44,27],"population":851},"LightMuted":{"rgb":[146.17834394904457,67.2420382165605,6.821656050955412],"population":0}}},{"publicPath":"/images/zhang_d-cCatH3q6o9M-unsplash.jpg","localPath":"/Users/takeo/Documents/cubdesign/node-vibrant-example/public/images/zhang_d-cCatH3q6o9M-unsplash.jpg","palette":{"Vibrant":{"rgb":[29,154,198],"population":146},"DarkVibrant":{"rgb":[30,78,111],"population":253},"LightVibrant":{"rgb":[236,189,204],"population":427},"Muted":{"rgb":[181,110,97],"population":174},"DarkMuted":{"rgb":[56,66,71],"population":1109},"LightMuted":{"rgb":[202,151,162],"population":530}}},{"publicPath":"/images/david-clode-fT2qXggBlks-unsplash.jpg","localPath":"/Users/takeo/Documents/cubdesign/node-vibrant-example/public/images/david-clode-fT2qXggBlks-unsplash.jpg","palette":{"Vibrant":{"rgb":[201,48,72],"population":240},"DarkVibrant":{"rgb":[22,60,4],"population":10},"LightVibrant":{"rgb":[229.43855421686743,147.96144578313255,160.7421686746988],"population":0},"Muted":{"rgb":[164,114,131],"population":920},"DarkMuted":{"rgb":[55,74,48],"population":1270},"LightMuted":{"rgb":[185,208,168],"population":207}}}]';
    render(<Home paletteImagesString={paletteImagesString} />);
    expect(screen.getByText(/Welcome/)).toBeInTheDocument();
  });
});
