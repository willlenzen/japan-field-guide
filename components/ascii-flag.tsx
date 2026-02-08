"use client";
import { useRef, useEffect } from "react";

/*
  ASCII 日本国旗 — Rebuild

  - Real Japanese flag proportions (2:3 height:width)
  - Desktop: 50% viewport width, Mobile (<768): 90% viewport width
  - Japanese characters: 日本 日 白 ソフトウェア デザイン 作る (first char only for compounds)
  - White field = var(--shironeri), Red circle = var(--kurenai)
  - Circle diameter = 3/5 of flag height, centered
  - Undulation: sin wave on translate, diagonal cloth ripple
  - Cursor: particle scatter with lerp easing back
  - All DOM manipulation via refs, no React re-renders per frame
*/

const CHAR_POOL = ["日", "本", "白", "ソ", "デ", "作"];

const DESKTOP_FONT = 14;
const MOBILE_FONT = 12;
const BREAKPOINT = 768;

// Monospace char aspect ratio: width ≈ 0.6 * fontSize for CJK in Geist Mono
const CHAR_ASPECT = 0.6;

interface CellState {
  offsetX: number;
  offsetY: number;
}

function randomChar(): string {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)];
}

function computeGrid(viewportWidth: number) {
  const isMobile = viewportWidth < BREAKPOINT;
  const fontSize = isMobile ? MOBILE_FONT : DESKTOP_FONT;
  const charW = Math.round(fontSize * CHAR_ASPECT);
  const charH = fontSize; // line-height: 1

  // Flag pixel width: 50% desktop, 90% mobile
  const flagPxW = Math.floor(viewportWidth * (isMobile ? 0.9 : 0.5));
  // Japanese flag ratio is 2:3 (height:width)
  const flagPxH = Math.floor(flagPxW * (2 / 3));

  const cols = Math.floor(flagPxW / charW);
  const rows = Math.floor(flagPxH / charH);

  // Circle: diameter = 3/5 of flag height (in pixels), radius in grid units
  const circleDiameterPx = flagPxH * (3 / 5);
  const circleRadiusPx = circleDiameterPx / 2;

  // Center of grid in pixel coords
  const centerPxX = (cols * charW) / 2;
  const centerPxY = (rows * charH) / 2;

  return { cols, rows, charW, charH, circleRadiusPx, centerPxX, centerPxY, fontSize };
}

export function AsciiFlag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<CellState[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef(0);
  const timeRef = useRef(0);
  const gridRef = useRef({ cols: 0, rows: 0, charW: 0, charH: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vw = window.innerWidth;
    const { cols, rows, charW, charH, circleRadiusPx, centerPxX, centerPxY, fontSize } =
      computeGrid(vw);
    gridRef.current = { cols, rows, charW, charH };

    // Build DOM
    container.innerHTML = "";
    container.style.fontFamily = "var(--font-geist-mono), monospace";
    container.style.fontSize = `${fontSize}px`;
    container.style.lineHeight = "1";
    container.style.letterSpacing = "0.2em";
    container.style.display = "grid";
    container.style.gridTemplateColumns = `repeat(${cols}, ${charW}px)`;
    container.style.gridAutoRows = `${charH}px`;
    container.style.justifyContent = "center";
    container.style.userSelect = "none";
    container.style.overflow = "hidden";
    container.style.width = `${cols * charW}px`;
    container.style.margin = "0 auto";

    stateRef.current = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Cell center in pixel space
        const cellCenterX = col * charW + charW / 2;
        const cellCenterY = row * charH + charH / 2;
        const dx = cellCenterX - centerPxX;
        const dy = cellCenterY - centerPxY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const inCircle = dist <= circleRadiusPx;

        const span = document.createElement("span");
        span.textContent = randomChar();
        span.style.display = "flex";
        span.style.alignItems = "center";
        span.style.justifyContent = "center";
        span.style.width = `${charW}px`;
        span.style.height = `${charH}px`;
        span.style.color = inCircle ? "var(--kurenai)" : "var(--shironeri)";
        span.style.willChange = "transform";
        container.appendChild(span);

        stateRef.current.push({ offsetX: 0, offsetY: 0 });
      }
    }

    const children = container.children;
    let lastTime = performance.now();

    function animate(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      timeRef.current += 0.02; // fixed increment for consistent speed

      const t = timeRef.current;
      const { cols, rows, charW, charH } = gridRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const rect = container!.getBoundingClientRect();

      const states = stateRef.current;
      const lerpFactor = Math.min(1, 0.06 * (dt * 60)); // frame-rate independent lerp

      for (let i = 0; i < states.length; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Undulation — diagonal cloth wave
        const wave = Math.sin(t + col * 0.15 + row * 0.08);
        let targetX = wave * 3;
        let targetY = wave * 3;

        // Cursor repulsion
        const cellScreenX = rect.left + col * charW + charW / 2;
        const cellScreenY = rect.top + row * charH + charH / 2;
        const dx = cellScreenX - mx;
        const dy = cellScreenY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100 && dist > 0) {
          const force = (1 - dist / 100) * 35;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        // Lerp toward target
        states[i].offsetX += (targetX - states[i].offsetX) * lerpFactor;
        states[i].offsetY += (targetY - states[i].offsetY) * lerpFactor;

        (children[i] as HTMLElement).style.transform =
          `translate(${states[i].offsetX.toFixed(1)}px,${states[i].offsetY.toFixed(1)}px)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);

    // Input handlers
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-4"
      aria-label="Interactive ASCII art Japanese flag"
    />
  );
}
