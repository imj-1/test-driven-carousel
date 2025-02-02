// Carousel.tsx;
import { ReactNode } from "react";
import CarouselButton from "./CarouselButton";
import CarouselSlide, { CarouselSlideProps } from "./CarouselSlide";
import { useSlideIndex } from "./useSlideIndex";

type Slide = {
  imgUrl?: string;
  description?: ReactNode;
  attribution?: ReactNode;
};

export type CarouselProps = {
  slides?: Slide[];
  slideIndex: number;
  onSlideIndexChange?: (newSlideIndex: number) => void;
  DefaultImgComponent?: CarouselSlideProps["ImgComponent"];
  defaultImgHeight?: CarouselSlideProps["imgHeight"];
};

const Carousel = ({
  slides,
  slideIndex: slideIndexProp,
  onSlideIndexChange,
  DefaultImgComponent,
  defaultImgHeight,
}: CarouselProps) => {
  const [slideIndex, decrementSlideIndex, incremementSlideIndex] =
    useSlideIndex(slides, slideIndexProp, onSlideIndexChange);
  return (
    <div data-testid="carousel">
      <CarouselSlide
        ImgComponent={DefaultImgComponent}
        imgHeight={defaultImgHeight}
        {...slides?.[slideIndex]}
      />
      <CarouselButton data-testid="prev-button" onClick={decrementSlideIndex}>
        Prev
      </CarouselButton>
      <CarouselButton data-testid="next-button" onClick={incremementSlideIndex}>
        Next
      </CarouselButton>
    </div>
  );
};

export default Carousel;
