// Carousel.test.tsx;
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Carousel from "./Carousel";
import slides from "./example/slides";

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

  it("passes DefaultImgComponent to the CarouselSlide", () => {
    const DefaultImgComponent = () => <img data-testid="Test image" />;
    render(
      <Carousel slides={slides} DefaultImgComponent={DefaultImgComponent} />
    );
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("data-testid", "Test image");
  });

  it("passes DefaultImgHeight to the CarouselSlide", () => {
    const defaultImgHeight = 1234;
    render(<Carousel slides={slides} defaultImgHeight={defaultImgHeight} />);
    const img = screen.getByRole("img");
    expect(img).toHaveStyleRule("height", "1234px");
  });
});

describe("with contorlled slideIndex", () => {
  const onSlideIndexChange = vi.fn();
  const renderCarouselWithSlideIndex = () =>
    render(
      <Carousel
        slides={slides}
        slideIndex={1}
        onSlideIndexChange={onSlideIndexChange}
      />
    );

  beforeEach(() => {
    onSlideIndexChange.mockReset();
  });

  it("shows the slide corresponding to slideIndex", () => {
    renderCarouselWithSlideIndex();
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", slides[1].imgUrl);
  });

  it("calls onSlideIndexChange when Pprev is clicked", async () => {
    renderCarouselWithSlideIndex();
    const img = screen.getByRole("img");
    const prevButton = screen.getByTestId("prev-button");
    const user = userEvent.setup();

    await user.click(prevButton);
    expect(img).toHaveAttribute("src", slides[1].imgUrl);
    expect(onSlideIndexChange).toHaveBeenCalledWith(0);
  });

  it("calls onSlideIndexChange when Next is clicked", async () => {
    renderCarouselWithSlideIndex();
    const img = screen.getByRole("img");
    const nextButton = screen.getByTestId("next-button");
    const user = userEvent.setup();

    await user.click(nextButton);
    expect(img).toHaveAttribute("src", slides[1].imgUrl);
    expect(onSlideIndexChange).toHaveBeenCalledWith(2);
  });
});
