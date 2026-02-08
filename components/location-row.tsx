"use client";
import { categoryConfig, type Location } from "@/data/locations";
import { PixelStar } from "./pixel-star";

interface LocationRowProps {
  location: Location;
  starred: boolean;
  onToggleStar: () => void;
  onSelect: () => void;
  selected?: boolean;
}

export function LocationRow({ location, starred, onToggleStar, onSelect, selected }: LocationRowProps) {
  const cat = categoryConfig[location.cat];
  return (
    <button
      onClick={onSelect}
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
          {location.icon && <span className="text-xs">{location.icon}</span>}
          <span className="text-xs font-medium text-[var(--shironeri)] truncate">
            {location.name}
          </span>
          {location.jp && (
            <span className="text-[10px] text-[var(--sunezumi)] font-mono">{location.jp}</span>
          )}
          {location.tag && (
            <span className="text-[9px] font-mono text-[var(--sunezumi)] border border-[var(--keshizumi)] px-1">
              {location.tag}
            </span>
          )}
        </div>
        <p className="text-[10px] text-[var(--sunezumi)] mt-0.5 truncate">{location.sub}</p>
      </div>
      <PixelStar
        filled={starred}
        onClick={onToggleStar}
        size={14}
      />
    </button>
  );
}
