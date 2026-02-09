"use client";
import { useEffect, useRef, useState } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const dismiss = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        dismiss();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* card */}
      <div
        ref={panelRef}
        className="pointer-events-auto absolute bottom-5 left-5 right-5 mx-auto max-w-[760px] border border-[var(--keshizumi)] bg-[var(--sumi)]"
        style={{
          boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 200ms ease-out, transform 200ms ease-out",
        }}
      >
        <div className="px-4 py-5">
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
            <div className="flex items-center gap-3">
              <PixelStar filled={starred} onClick={onToggleStar} size={16} />
              <OpenInMaps lat={location.lat} lng={location.lng} name={location.name} />
              <button
                onClick={dismiss}
                className="flex items-center justify-center w-7 h-7 text-[18px] text-[var(--sunezumi)] hover:text-[var(--shironeri)] hover:bg-white/[0.08] cursor-pointer transition-colors leading-none"
                style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
              >
                X
              </button>
            </div>
          </div>

          {/* body */}
          <p className="text-[14px] text-white leading-relaxed mb-3">{location.desc}</p>

          {/* meta */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-mono text-[var(--sunezumi)]">
            {location.budget && <span>¥ {location.budget}</span>}
            {location.time && <span>⏱ {location.time}</span>}
            {location.tip && <span className="text-[var(--yamabuki)]">★ {location.tip}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
