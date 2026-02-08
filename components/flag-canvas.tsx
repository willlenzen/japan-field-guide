"use client";

import { useRef, useEffect } from "react";

interface FlagCanvasProps {
  width: number;
  height: number;
  className?: string;
}

export default function FlagCanvas({ width, height, className }: FlagCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const aspect = 3 / 2;
    const flagW = width;
    const flagH = width / aspect;
    const oY = (height - flagH) / 2;

    function draw() {
      if (!ctx) return;
      timeRef.current += 0.01;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      /* White rectangle with subtle rounded corners */
      ctx.save();
      const r = 3;
      ctx.beginPath();
      ctx.moveTo(r, oY);
      ctx.lineTo(flagW - r, oY);
      ctx.quadraticCurveTo(flagW, oY, flagW, oY + r);
      ctx.lineTo(flagW, oY + flagH - r);
      ctx.quadraticCurveTo(flagW, oY + flagH, flagW - r, oY + flagH);
      ctx.lineTo(r, oY + flagH);
      ctx.quadraticCurveTo(0, oY + flagH, 0, oY + flagH - r);
      ctx.lineTo(0, oY + r);
      ctx.quadraticCurveTo(0, oY, r, oY);
      ctx.closePath();
      ctx.clip();

      /* Background */
      ctx.fillStyle = "#FCFAF2";
      ctx.fillRect(0, oY, flagW, flagH);

      const cx = flagW / 2;
      const cy = oY + flagH / 2;
      const cR = flagH * 0.3;
      const glitch = Math.sin(t * 3.7) > 0.92;

      if (glitch) {
        /* Draw base circle */
        ctx.fillStyle = "#CB1B45";
        ctx.beginPath();
        ctx.arc(cx, cy, cR, 0, Math.PI * 2);
        ctx.fill();

        /* Horizontal slice displacement */
        const sliceY = cy - cR + Math.random() * cR * 2;
        const sliceH = 3 + Math.random() * 5;
        const shift = (Math.random() - 0.5) * 4;

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, sliceY, flagW, sliceH);
        ctx.clip();
        ctx.clearRect(0, sliceY, flagW, sliceH);
        ctx.fillStyle = "#FCFAF2";
        ctx.fillRect(0, sliceY, flagW, sliceH);
        ctx.fillStyle = "#CB1B45";
        ctx.beginPath();
        ctx.arc(cx + shift, cy, cR, 0, Math.PI * 2);
        ctx.fill();

        /* Channel bleed */
        ctx.globalAlpha = 0.15;
        ctx.fillStyle = "#CB1B45";
        ctx.beginPath();
        ctx.arc(cx + shift + 2, cy, cR, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.restore();

        /* Noise dots */
        for (let i = 0; i < 2; i++) {
          ctx.fillStyle = Math.random() > 0.5 ? "#CB1B45" : "#434343";
          ctx.fillRect(Math.random() * flagW, oY + Math.random() * flagH, 1, 1);
        }
      } else {
        ctx.fillStyle = "#CB1B45";
        ctx.beginPath();
        ctx.arc(cx, cy, cR, 0, Math.PI * 2);
        ctx.fill();
      }

      /* CRT scanlines */
      ctx.fillStyle = "rgba(0,0,0,0.035)";
      for (let y = oY; y < oY + flagH; y += 2) {
        ctx.fillRect(0, y, flagW, 1);
      }

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width, height, display: "block" }}
    />
  );
}
