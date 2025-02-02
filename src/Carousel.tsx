// Carousel.tsx;
import { ReactNode, useState } from "react";
import CarouselButton from "./CarouselButton";
import CarouselSlide, { CarouselSlideProps } from "./CarouselSlide";

type Slide = {
  imgUrl?: string;
  description?: ReactNode;
  attribution?: ReactNode;
};

export type CarouselProps = {
  slides: Slide[];
  DefaultImgComponent?: CarouselSlideProps["ImgComponent"];
  defaultImgHeight?: CarouselSlideProps["imgHeight"];
};

const Carousel = ({
  slides,
  DefaultImgComponent,
  defaultImgHeight,
}: CarouselProps) => {
  const [slideIndex, setSlideIndex] = useState(0);
  return (
    <div data-testid="carousel">
      <CarouselSlide
        ImgComponent={DefaultImgComponent}
        imgHeight={defaultImgHeight}
        {...slides?.[slideIndex]}
      />
      <CarouselButton
        data-testid="prev-button"
        onClick={() => {
          if (!slides) return;
          setSlideIndex((i) => (i + slides.length - 1) % slides.length);
        }}
      >
        Prev
      </CarouselButton>
      <CarouselButton
        data-testid="next-button"
        onClick={() => {
          if (!slides) return;
          setSlideIndex((i) => (i + 1) % slides.length);
        }}
      >
        Next
      </CarouselButton>
    </div>
  );
};

export default Carousel;
