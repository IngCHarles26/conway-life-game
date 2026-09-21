import { useRef, useState, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

export const useGetSize = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const eye = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });
    eye.observe(element);

    return () => eye.disconnect();
  }, []);

  return { ref, size };
};
