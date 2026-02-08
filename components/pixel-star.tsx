"use client";

interface PixelStarProps {
  filled?: boolean;
  size?: number;
  onClick?: () => void;
  className?: string;
}

export default function PixelStar({
  filled = false,
  size = 16,
  onClick,
  className = "",
}: PixelStarProps) {
  const color = filled ? "var(--yamabuki)" : "var(--keshizumi)";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: 44,
        height: 44,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
      aria-label={filled ? "Unstar" : "Star"}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        style={{ display: "block" }}
      >
        <path
          d="M8 1L9.5 5.5H14L10.5 8.5L12 13L8 10L4 13L5.5 8.5L2 5.5H6.5L8 1Z"
          fill={filled ? color : "none"}
          stroke={color}
          strokeWidth="1"
          strokeLinejoin="miter"
          opacity={filled ? 1 : 0.6}
        />
      </svg>
    </button>
  );
}
