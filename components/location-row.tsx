"use client";
import { categoryConfig, type Location } from "@/data/locations";
import { PixelStar } from "./pixel-star";

interface LocationRowProps {
  location: Location;
  starred: boolean;
  onToggleStar: () => void;
  onSelect: () => void;
  selected?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function LocationRow({ location, starred, onToggleStar, onSelect, selected, onMouseEnter, onMouseLeave }: LocationRowProps) {
  const cat = categoryConfig[location.cat];
  return (
    <button
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`w-full text-left flex items-start gap-3 px-4 py-2.5 border-b border-[var(--keshizumi)]/50 transition-colors cursor-pointer ${
        selected ? "bg-[var(--sumi)]" : "hover:bg-[var(--sumi)]/60"
      }`}
    >
      <div
        className="w-0.5 shrink-0 self-stretch mt-0.5"
        style={{ backgroundColor: cat.color }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {location.icon && <span className="text-[14px]">{location.icon}</span>}
          <span
            className="text-[14px] font-medium text-[var(--shironeri)] truncate"
            style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
          >
            {location.name}
          </span>
          {location.jp && (
            <span className="text-[12px] text-[var(--sunezumi)] font-mono">{location.jp}</span>
          )}
          {location.tag && (
            <span className="text-[11px] font-mono text-[var(--sunezumi)] border border-[var(--keshizumi)] px-1">
              {location.tag}
            </span>
          )}
        </div>
        <p className="text-[12px] text-[var(--sunezumi)] mt-0.5 truncate">{location.sub}</p>
      </div>
      <PixelStar
        filled={starred}
        onClick={onToggleStar}
        size={14}
      />
    </button>
  );
}
