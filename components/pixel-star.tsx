"use client";
import { cn } from "@/lib/utils";

interface PixelStarProps {
  filled: boolean;
  onClick: () => void;
  size?: number;
  className?: string;
}

export function PixelStar({ filled, onClick, size = 16, className }: PixelStarProps) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={cn("shrink-0 cursor-pointer transition-colors", className)}
      aria-label={filled ? "Remove from saved" : "Add to saved"}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 4-pointed pixel star */}
        <rect x="7" y="0" width="2" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="5" y="2" width="6" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="3" y="4" width="10" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="0" y="6" width="16" height="4" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="3" y="10" width="10" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="5" y="12" width="2" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="9" y="12" width="2" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="3" y="14" width="2" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
        <rect x="11" y="14" width="2" height="2" fill={filled ? "var(--yamabuki)" : "var(--keshizumi)"} />
      </svg>
    </button>
  );
}
