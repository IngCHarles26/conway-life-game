import { useEffect, type Dispatch, type RefObject, type SetStateAction } from "react";

interface Props {
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>;
  startPos: RefObject<{ x: number; y: number }>;
  isMoving: RefObject<boolean>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

export const useSetOffset = ({ setOffset, startPos, isMoving, canvasRef }: Props) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleUp = () => {
      isMoving.current = false;
      canvas.style.cursor = "default";
    };
    const handleDown = (e: MouseEvent) => {
      isMoving.current = true;
      startPos.current = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = "grab";
    };
    const handleMove = (e: MouseEvent) => {
      if (!isMoving.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startPos.current = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener("mousedown", handleDown);
    canvas.addEventListener("mouseup", handleUp);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleUp);

    return () => {
      canvas.removeEventListener("mousedown", handleDown);
      canvas.removeEventListener("mouseup", handleUp);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleUp);
    };
  }, []);
};
