import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";
const { min, max, floor, ceil } = Math;
const maxSize = 250;
const minSize = 5;

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  setSize: Dispatch<SetStateAction<number>>;
}

export const useSetZoom = ({ canvasRef, width, height, setSize }: Props) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = e.deltaY;
      const handleSize = (p: number) => {
        if (delta < 0) return min(floor(p * 1.25), maxSize);
        return max(ceil(p * 0.85), minSize);
      };
      setSize(handleSize);
    };

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    return () => canvas.removeEventListener("wheel", handleWheel);
  }, []);
};
