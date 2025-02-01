// Carousel.tsx;
import { ReactNode } from "react";
import CarouselSlide from "./CarouselSlide";

type Slide = {
  imgUrl?: string;
  description?: ReactNode;
  attribution?: ReactNode;
};

const Carousel = ({ slides }: { slides?: Slide[] }) => {
  return (
    <div data-testid="carousel">
      <CarouselSlide {...slides?.[0]} />
    </div>
  );
};

export default Carousel;
