import { useEffect, type RefObject } from "react";

const { ceil, floor } = Math;

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  size: number;
  offset: { x: number; y: number };
  cells: [number, number][];
}

export const useDrawTable = ({ canvasRef, width, height, size, offset, cells }: Props) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.width || !canvas.height) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);

    drawCells(ctx, width, height, size, offset, cells);
    drawTable(ctx, width, height, size, offset);

    ctx.stroke();
  }, [size, height, width, offset, cells]);
};

const drawTable = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  offset: { x: number; y: number },
) => {
  // [[x0,y0]   [xf,y0]]
  // [[x0,yf]   [xf,yf]]

  const _linesX = ceil(width / size);
  const linesX = _linesX % 2 === 0 ? _linesX : _linesX + 1;
  const offsetX = offset.x % size;
  const midX = floor(width / 2) + offsetX;

  const _linesY = ceil(height / size);
  const linesY = _linesY % 2 === 0 ? _linesY : _linesY + 1;
  const offsetY = offset.y % size;
  const midY = floor(height / 2) + offsetY;

  ctx.strokeStyle = "#4cd7f620";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, midY);
  ctx.lineTo(width, midY);
  ctx.moveTo(midX, 0);
  ctx.lineTo(midX, height);

  for (let lx = 1; lx < linesX / 2; lx++) {
    const posX1 = midX + lx * size;
    const posX2 = midX - lx * size;
    ctx.moveTo(posX1, 0);
    ctx.lineTo(posX1, height);
    ctx.moveTo(posX2, 0);
    ctx.lineTo(posX2, height);
  }
  for (let ly = 1; ly < linesY / 2; ly++) {
    const posY1 = midY + ly * size;
    const posY2 = midY - ly * size;
    ctx.moveTo(0, posY1);
    ctx.lineTo(width, posY1);
    ctx.moveTo(0, posY2);
    ctx.lineTo(width, posY2);
  }
};

const drawCells = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  offset: { x: number; y: number },
  cells: [number, number][],
) => {
  ctx.fillStyle = "#4edea3";
  for (const [cX, cY] of cells) {
    const posX = floor(width / 2) + cX * size + offset.x;
    const posY = floor(height / 2) - (cY + 1) * size + offset.y;
    if (posX > width || posY > height) continue;
    ctx.fillRect(posX, posY, size, size);
  }
};
