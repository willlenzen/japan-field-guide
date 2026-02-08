"use client";

import type { Location } from "@/data/locations";
import { categoryConfig } from "@/data/locations";
import { Badge } from "@/components/ui/badge";
import PixelStar from "@/components/pixel-star";
import OpenInMaps from "@/components/open-in-maps";

interface LocationCardProps {
  location: Location;
  isStarred: boolean;
  onToggleStar: (id: string) => void;
  onClose?: () => void;
  showClose?: boolean;
}

export default function LocationCard({
  location,
  isStarred,
  onToggleStar,
  onClose,
  showClose = false,
}: LocationCardProps) {
  const cfg = categoryConfig[location.cat];

  return (
    <div
      className="relative border border-keshizumi bg-sumi"
      style={{
        borderLeftWidth: 2,
        borderLeftColor: cfg.cssColor,
        borderRadius: "2px",
        padding: "12px 14px",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans text-[14px] font-semibold text-shironeri leading-tight">
              {location.icon && <span className="mr-1">{location.icon}</span>}
              {location.name}
            </span>
            {location.jp && (
              <span className="font-sans text-[14px] opacity-45 ml-[2px]">
                {location.jp}
              </span>
            )}
            {location.tag && (
              <Badge
                variant="outline"
                className="font-mono text-[10px] tracking-[.06em] uppercase px-[6px] py-0 h-[18px] rounded-[1px]"
                style={{
                  borderColor: cfg.cssColor,
                  color: cfg.cssColor,
                  background: "transparent",
                }}
              >
                {location.tag}
              </Badge>
            )}
          </div>
          <p className="font-mono text-[11px] text-sunezumi mt-1 leading-snug">
            {location.sub}
          </p>
        </div>

        <div className="flex items-center shrink-0">
          <PixelStar
            filled={isStarred}
            size={14}
            onClick={() => onToggleStar(location.id)}
          />
          {showClose && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center text-sunezumi hover:text-shironeri transition-colors duration-150"
              style={{ width: 44, height: 44 }}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 2L12 12M12 2L2 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Description ── */}
      <p className="font-sans text-[13px] text-ginnezumi leading-[1.6] mt-2">
        {location.desc}
      </p>

      {/* ── Meta ── */}
      {(location.budget || location.time) && (
        <div className="flex items-center gap-3 mt-2">
          {location.budget && (
            <span className="font-mono text-[11px] text-sunezumi">
              {location.budget}
            </span>
          )}
          {location.time && (
            <span className="font-mono text-[11px] text-sunezumi">
              {location.time}
            </span>
          )}
        </div>
      )}

      {/* ── Tip callout ── */}
      {location.tip && (
        <div
          className="mt-3 font-sans text-[12px] text-ginnezumi leading-[1.5]"
          style={{
            background: "var(--kurenai-glow)",
            borderLeft: "2px solid var(--kurenai)",
            padding: "8px 10px",
            borderRadius: "1px",
          }}
        >
          {location.tip}
        </div>
      )}

      {/* ── Open in Maps ── */}
      <div className="mt-3">
        <OpenInMaps
          lat={location.lat}
          lng={location.lng}
          name={location.name}
        />
      </div>
    </div>
  );
}
