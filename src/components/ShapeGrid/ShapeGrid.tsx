"use client";

import { useRef, useEffect } from "react";
import "./ShapeGrid.css";

type Direction = "diagonal" | "up" | "right" | "down" | "left";
type Shape = "square" | "hexagon" | "circle" | "triangle";

type TrailCell = {
  x: number;
  y: number;
  bornAt: number;
};

type ShapeGridProps = {
  direction?: Direction;
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
  shape?: Shape;
  hoverTrailAmount?: number;
  trailFadeMs?: number;
  className?: string;
};

const smoothFadeOut = (t: number) => 1 - t * t * (3 - 2 * t);

const ShapeGrid = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
  shape = "square",
  hoverTrailAmount = 80,
  trailFadeMs = 1000,
  className = "",
}: ShapeGridProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const lastTrailCell = useRef<{ x: number; y: number } | null>(null);
  const trailCells = useRef<TrailCell[]>([]);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isHex = shape === "hexagon";
    const isTri = shape === "triangle";
    const hexHoriz = squareSize * 1.5;
    const hexVert = squareSize * Math.sqrt(3);

    const resizeCanvas = () => {
      const { width, height } = root.getBoundingClientRect();
      if (width < 1 || height < 1) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      sizeRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildOpacityMap = () => {
      const map = new Map<string, number>();
      const now = performance.now();

      for (const cell of trailCells.current) {
        const age = now - cell.bornAt;
        if (age >= trailFadeMs) continue;

        const t = age / trailFadeMs;
        const opacity = smoothFadeOut(t);
        const key = `${cell.x},${cell.y}`;
        const prev = map.get(key) ?? 0;
        if (opacity > prev) map.set(key, opacity);
      }

      return map;
    };

    const pruneTrail = () => {
      const now = performance.now();
      trailCells.current = trailCells.current.filter(
        (cell) => now - cell.bornAt < trailFadeMs,
      );
    };

    const pushTrailCell = (col: number, row: number) => {
      const last = lastTrailCell.current;
      if (last?.x === col && last?.y === row) return;

      lastTrailCell.current = { x: col, y: row };
      trailCells.current.unshift({ x: col, y: row, bornAt: performance.now() });

      if (hoverTrailAmount > 0 && trailCells.current.length > hoverTrailAmount) {
        trailCells.current.length = hoverTrailAmount;
      }
    };

    const drawHex = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const vx = cx + size * Math.cos(angle);
        const vy = cy + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      }
      ctx.closePath();
    };

    const drawCircle = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.closePath();
    };

    const drawTriangle = (
      cx: number,
      cy: number,
      size: number,
      flip: boolean,
    ) => {
      ctx.beginPath();
      if (flip) {
        ctx.moveTo(cx, cy + size / 2);
        ctx.lineTo(cx + size / 2, cy - size / 2);
        ctx.lineTo(cx - size / 2, cy - size / 2);
      } else {
        ctx.moveTo(cx, cy - size / 2);
        ctx.lineTo(cx + size / 2, cy + size / 2);
        ctx.lineTo(cx - size / 2, cy + size / 2);
      }
      ctx.closePath();
    };

    const drawGrid = () => {
      const { width, height } = sizeRef.current;
      if (width < 1 || height < 1) return;

      ctx.clearRect(0, 0, width, height);
      const opacityMap = buildOpacityMap();

      const paintFill = (col: number, row: number, drawShape: () => void) => {
        const alpha = opacityMap.get(`${col},${row}`) ?? 0;
        if (alpha <= 0.01) return;

        ctx.save();
        ctx.globalAlpha = alpha;
        drawShape();
        ctx.fillStyle = hoverFillColor;
        ctx.fill();
        ctx.restore();
      };

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;

        const cols = Math.ceil(width / hexHoriz) + 3;
        const rows = Math.ceil(height / hexVert) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * hexHoriz + offsetX;
            const cy =
              row * hexVert +
              ((col + colShift) % 2 !== 0 ? hexVert / 2 : 0) +
              offsetY;

            paintFill(col, row, () => drawHex(cx, cy, squareSize));
            drawHex(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (isTri) {
        const halfW = squareSize / 2;
        const colShift = Math.floor(gridOffset.current.x / halfW);
        const rowShift = Math.floor(gridOffset.current.y / squareSize);
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(width / halfW) + 4;
        const rows = Math.ceil(height / squareSize) + 4;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * halfW + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;
            const flip =
              ((col + colShift + row + rowShift) % 2 + 2) % 2 !== 0;

            paintFill(col, row, () =>
              drawTriangle(cx, cy, squareSize, flip),
            );
            drawTriangle(cx, cy, squareSize, flip);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const cx = col * squareSize + squareSize / 2 + offsetX;
            const cy = row * squareSize + squareSize / 2 + offsetY;

            paintFill(col, row, () => drawCircle(cx, cy, squareSize));
            drawCircle(cx, cy, squareSize);
            ctx.strokeStyle = borderColor;
            ctx.stroke();
          }
        }
      } else {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const cols = Math.ceil(width / squareSize) + 3;
        const rows = Math.ceil(height / squareSize) + 3;

        for (let col = -2; col < cols; col++) {
          for (let row = -2; row < rows; row++) {
            const sx = col * squareSize + offsetX;
            const sy = row * squareSize + offsetY;

            paintFill(col, row, () => {
              ctx.beginPath();
              ctx.rect(sx, sy, squareSize, squareSize);
            });
            ctx.strokeStyle = borderColor;
            ctx.strokeRect(sx, sy, squareSize, squareSize);
          }
        }
      }
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      const wrapX = isHex ? hexHoriz * 2 : squareSize;
      const wrapY = isHex ? hexVert : isTri ? squareSize * 2 : squareSize;

      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + wrapX) % wrapX;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + wrapY) % wrapY;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + wrapX) % wrapX;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + wrapY) % wrapY;
          break;
        default:
          break;
      }

      pruneTrail();
      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (isHex) {
        const colShift = Math.floor(gridOffset.current.x / hexHoriz);
        const offsetX = ((gridOffset.current.x % hexHoriz) + hexHoriz) % hexHoriz;
        const offsetY = ((gridOffset.current.y % hexVert) + hexVert) % hexVert;
        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.round(adjustedX / hexHoriz);
        const rowOffset = (col + colShift) % 2 !== 0 ? hexVert / 2 : 0;
        const row = Math.round((adjustedY - rowOffset) / hexVert);

        pushTrailCell(col, row);
      } else if (isTri) {
        const halfW = squareSize / 2;
        const offsetX = ((gridOffset.current.x % halfW) + halfW) % halfW;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.round(adjustedX / halfW);
        const row = Math.floor(adjustedY / squareSize);

        pushTrailCell(col, row);
      } else if (shape === "circle") {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.round(adjustedX / squareSize);
        const row = Math.round(adjustedY / squareSize);

        pushTrailCell(col, row);
      } else {
        const offsetX =
          ((gridOffset.current.x % squareSize) + squareSize) % squareSize;
        const offsetY =
          ((gridOffset.current.y % squareSize) + squareSize) % squareSize;

        const adjustedX = mouseX - offsetX;
        const adjustedY = mouseY - offsetY;

        const col = Math.floor(adjustedX / squareSize);
        const row = Math.floor(adjustedY / squareSize);

        pushTrailCell(col, row);
      }
    };

    const handleMouseLeave = () => {
      lastTrailCell.current = null;
    };

    const ro = new ResizeObserver(() => {
      resizeCanvas();
    });
    ro.observe(root);
    resizeCanvas();

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      ro.disconnect();
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      trailCells.current = [];
      lastTrailCell.current = null;
    };
  }, [
    direction,
    speed,
    borderColor,
    hoverFillColor,
    squareSize,
    shape,
    hoverTrailAmount,
    trailFadeMs,
  ]);

  return (
    <div ref={rootRef} className={`shapegrid-root ${className}`.trim()}>
      <canvas ref={canvasRef} className="shapegrid-canvas" aria-hidden />
    </div>
  );
};

export default ShapeGrid;
