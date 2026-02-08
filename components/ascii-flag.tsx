"use client";
import { useRef, useEffect, useCallback } from "react";

/*
  ASCII 日本国旗 — Interactive flag with undulation + cursor repulsion

  Renders a grid of characters via direct DOM mutation (useRef, no React state per cell).
  Desktop: 60×30 grid   Mobile: 40×20 grid
  Characters: ░ for white field, ● for red disc
  Animation: sine-wave undulation on opacity + cursor proximity repulsion on position
*/

const CHARS = { field: "░", disc: "●" };
const CELL_W = 8;
const CELL_H = 14;

function buildGrid(cols: number, rows: number) {
  const cx = cols / 2;
  const cy = rows / 2;
  const r = Math.min(cols, rows) * 0.28;
  const cells: { char: string; inDisc: boolean }[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const dx = x - cx;
      const dy = (y - cy) * (CELL_W / CELL_H); // aspect correction
      const dist = Math.sqrt(dx * dx + dy * dy);
      const inDisc = dist <= r;
      cells.push({ char: inDisc ? CHARS.disc : CHARS.field, inDisc });
    }
  }
  return cells;
}

export function AsciiFlag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<HTMLSpanElement[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);
  const dimsRef = useRef({ cols: 60, rows: 30 });

  const getSize = useCallback(() => {
    if (typeof window === "undefined") return { cols: 60, rows: 30 };
    return window.innerWidth < 640 ? { cols: 40, rows: 20 } : { cols: 60, rows: 30 };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { cols, rows } = getSize();
    dimsRef.current = { cols, rows };
    const grid = buildGrid(cols, rows);

    // Build DOM
    container.innerHTML = "";
    container.style.fontFamily = "var(--font-geist-mono), monospace";
    container.style.fontSize = "10px";
    container.style.lineHeight = `${CELL_H}px`;
    container.style.letterSpacing = "0px";
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${cols}, ${CELL_W}px)`;
    container.style.justifyContent = "center";
    container.style.userSelect = "none";

    spanRefs.current = [];
    grid.forEach((cell) => {
      const span = document.createElement("span");
      span.textContent = cell.char;
      span.style.display = "inline-block";
      span.style.width = `${CELL_W}px`;
      span.style.height = `${CELL_H}px`;
      span.style.textAlign = "center";
      span.style.color = cell.inDisc ? "var(--kurenai)" : "var(--keshizumi)";
      span.style.transition = "none";
      container.appendChild(span);
      spanRefs.current.push(span);
    });

    // Animation loop
    const startTime = performance.now();

    function animate() {
      const t = (performance.now() - startTime) / 1000;
      const spans = spanRefs.current;
      const { cols, rows } = dimsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const rect = container!.getBoundingClientRect();

      for (let i = 0; i < spans.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Undulation: slow sine wave
        const wave = Math.sin(col * 0.15 + row * 0.1 + t * 1.2) * 0.5 + 0.5;
        const baseOpacity = 0.4 + wave * 0.6;

        // Cursor repulsion
        const cellX = rect.left + col * CELL_W + CELL_W / 2;
        const cellY = rect.top + row * CELL_H + CELL_H / 2;
        const dx = cellX - mx;
        const dy = cellY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repelRadius = 80;
        let tx = 0;
        let ty = 0;
        let repelDim = 1;

        if (dist < repelRadius && dist > 0) {
          const force = (1 - dist / repelRadius) * 6;
          tx = (dx / dist) * force;
          ty = (dy / dist) * force;
          repelDim = 0.6 + (dist / repelRadius) * 0.4;
        }

        spans[i].style.opacity = String(baseOpacity * repelDim);
        spans[i].style.transform = `translate(${tx}px, ${ty}px)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [getSize]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden py-4"
      aria-label="Interactive ASCII art Japanese flag"
    />
  );
}
