// Carousel.test.tsx;
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "./Carousel";

describe("Carousel", () => {
  const slides = [
    {
      imgUrl: "https://example.com/slide1.png",
      description: "Slide 1",
      attribution: "Uno Pizzeria",
    },
    {
      imgUrl: "https://example.com/slide2.png",
      description: "Slide 2",
      attribution: "Dos Equis",
    },
    {
      imgUrl: "https://example.com/slide3.png",
      description: "Slide 3",
      attribution: "Three Amigos",
    },
  ];

  it("renders a <div>", () => {
    render(<Carousel />);
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("renders the first slide by default", () => {
    render(<Carousel slides={slides} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", slides[0].imgUrl);
  });

  it("reverses the slide when the Prev button is clicked", async () => {
    render(<Carousel slides={slides} />);
    const img = screen.getByRole("img");
    const prevButton = screen.getByTestId("prev-button");
    const user = userEvent.setup();

    await user.click(prevButton);
    expect(img).toHaveAttribute("src", slides[2].imgUrl);
    await user.click(prevButton);
    expect(img).toHaveAttribute("src", slides[1].imgUrl);
    await user.click(prevButton);
    expect(img).toHaveAttribute("src", slides[0].imgUrl);
  });

  it("advances the slide when the Next button is clicked", async () => {
    render(<Carousel slides={slides} />);
    const img = screen.getByRole("img");
    const nextButton = screen.getByTestId("next-button");
    const user = userEvent.setup();

    await user.click(nextButton);
    expect(img).toHaveAttribute("src", slides[1].imgUrl);
    await user.click(nextButton);
    expect(img).toHaveAttribute("src", slides[2].imgUrl);
    await user.click(nextButton);
    expect(img).toHaveAttribute("src", slides[0].imgUrl);
  });
});
