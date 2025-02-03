import { useEffect } from "react";

export const useTimeout = (delay: number | undefined, callback: () => void) => {
  useEffect(() => {
    if (!delay) return;
    const timeout = setTimeout(callback, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, callback]);
};
