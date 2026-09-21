import { type Dispatch, type SetStateAction, type RefObject, useEffect } from "react";

const { floor } = Math;

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  setCells: Dispatch<SetStateAction<[number, number][]>>;
  width: number;
  height: number;
  offset: { x: number; y: number };
  size: number;
  isRunning: boolean;
  isMoving: RefObject<boolean>;
}

export const useSetCells = ({
  setCells,
  canvasRef,
  width,
  height,
  offset,
  size,
  isRunning,
  isMoving,
}: Props) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !width || !height || isRunning) return;

    const { top, left } = canvas.getBoundingClientRect();

    const handleClick = ({ clientX, clientY }: MouseEvent) => {
      const startX = clientX - left;
      const startY = clientY - top;

      const posX = floor((startX - width / 2 - offset.x) / size);
      const posY = floor((height / 2 - startY + offset.y) / size);
      setCells((prev) => {
        let exist = false;
        const ans: [number, number][] = [];
        for (const [x, y] of prev) {
          if (x === posX && y === posY) {
            exist = true;
            continue;
          }
          ans.push([x, y]);
        }
        if (!exist) ans.push([posX, posY]);
        return ans;
      });
    };

    canvas.addEventListener("click", handleClick);

    return () => {
      canvas.removeEventListener("click", handleClick);
    };
  }, [width, height, offset, size, isRunning, isMoving]);
};
