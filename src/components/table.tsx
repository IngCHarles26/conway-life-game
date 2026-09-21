import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useSetOffset } from "../hooks/useSetOffset";
import { useSetZoom } from "../hooks/useSetZoom";
import { useDrawTable } from "../hooks/useDrawTable";
import { useSetCells } from "../hooks/useSetCells";

interface Props {
  width: number;
  height: number;
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  cells: [number, number][];
  setCells: Dispatch<SetStateAction<[number, number][]>>;
  isRunning: boolean;
}

export const Table = ({ width, height, size, setSize, cells, setCells, isRunning }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMoving = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useSetZoom({ canvasRef, width, height, setSize });
  useSetOffset({ setOffset, startPos, isMoving, canvasRef });
  useDrawTable({ canvasRef, width, height, size, offset, cells });
  useSetCells({ setCells, canvasRef, width, height, offset, size, isRunning, isMoving });

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};
