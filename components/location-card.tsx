"use client";
import { categoryConfig, type Location } from "@/data/locations";
import { PixelStar } from "./pixel-star";
import { OpenInMaps } from "./open-in-maps";

interface LocationCardProps {
  location: Location;
  starred: boolean;
  onToggleStar: () => void;
  onClose: () => void;
}

export function LocationCard({ location, starred, onToggleStar, onClose }: LocationCardProps) {
  const cat = categoryConfig[location.cat];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--keshizumi)] bg-[var(--sumi)]">
      <div className="max-w-[800px] mx-auto p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        {/* header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 shrink-0" style={{ backgroundColor: cat.color }} />
              {location.icon && <span className="text-[16px]">{location.icon}</span>}
              <h3
                className="text-[16px] font-medium text-[var(--shironeri)] truncate"
                style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
              >
                {location.name}
              </h3>
              {location.jp && (
                <span className="text-[13px] text-[var(--sunezumi)] font-mono">{location.jp}</span>
              )}
            </div>
            <p className="text-[12px] text-[var(--sunezumi)] mt-0.5 ml-1.5">{location.sub}</p>
          </div>
          <div className="flex items-center gap-2">
            <PixelStar filled={starred} onClick={onToggleStar} size={16} />
            <button
              onClick={onClose}
              className="text-[var(--sunezumi)] hover:text-[var(--shironeri)] font-mono text-[14px] cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* body */}
        <p className="text-[14px] text-[var(--ginnezumi)] leading-relaxed mb-3">{location.desc}</p>

        {/* meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-mono text-[var(--sunezumi)] mb-3">
          {location.budget && <span>¥ {location.budget}</span>}
          {location.time && <span>⏱ {location.time}</span>}
          {location.tip && <span className="text-[var(--yamabuki)]">★ {location.tip}</span>}
        </div>

        <OpenInMaps lat={location.lat} lng={location.lng} name={location.name} />
      </div>
    </div>
  );
}
