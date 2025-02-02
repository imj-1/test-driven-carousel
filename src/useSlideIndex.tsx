import { useState } from "react";

export const useSlideIndex = (slides?: unknown[]) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const decrementSlideIndex = () => {
    if (!slides) return;
    setSlideIndex((i) => (i + slides.length - 1) % slides.length);
  };

  const incrementSlideIndex = () => {
    if (!slides) return;
    setSlideIndex((i) => (i + 1) % slides.length);
  };
  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const;
};
