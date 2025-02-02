import { useState } from "react";

const decrement = (length: number) => (i: number) => (i + length - 1) % length;
const increment = (length: number) => (i: number) => (i + 1) % length;

export const useSlideIndex = (
  slides?: unknown[],
  slideIndexProp?: number,
  onSlideIndexChange?: (newSlideIndex: number) => void
) => {
  const [slideIndexState, setSlideIndexState] = useState(0);

  // Controllable pattern: Theprop takes rpecedence over the state.
  const slideIndex = slideIndexProp ?? slideIndexState;

  const decrementSlideIndex = () => {
    if (!slides) return;
    setSlideIndexState(decrement(slides.length));
    onSlideIndexChange?.(decrement(slides.length)(slideIndex));
  };

  const incrementSlideIndex = () => {
    if (!slides) return;
    setSlideIndexState(increment(slides.length));
    onSlideIndexChange?.(increment(slides.length)(slideIndex));
  };
  return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const;
};
