import { ComponentPropsWithRef, ReactNode } from "react";

// CarouselSlide.tsx;
const CarouselSlide = ({
  imgUrl,
  description,
  attribution,
  ...rest
}: {
  imgUrl?: string;
  description?: ReactNode;
  attribution?: ReactNode;
} & ComponentPropsWithRef<"figure">) => (
  <figure {...rest}>
    <img src={imgUrl} />
    <figcaption data-testid="caption">
      <strong>{description}</strong> {attribution}
    </figcaption>
  </figure>
);

export default CarouselSlide;
