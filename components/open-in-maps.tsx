"use client";

import { getMapsUrl } from "@/lib/platform";

interface OpenInMapsProps {
  lat: number;
  lng: number;
  name: string;
  compact?: boolean;
}

export default function OpenInMaps({
  lat,
  lng,
  name,
  compact = false,
}: OpenInMapsProps) {
  return (
    <button
      type="button"
      onClick={() => window.open(getMapsUrl(lat, lng, name), "_blank")}
      className={`
        font-mono text-[11px] tracking-[.06em] uppercase
        border border-keshizumi bg-transparent text-ginnezumi
        hover:bg-aisumicha hover:text-shironeri
        transition-colors duration-150
        ${compact ? "px-3 py-2" : "w-full py-3 px-4"}
      `}
      style={{ borderRadius: "2px", minHeight: 44 }}
    >
      Open in Maps
    </button>
  );
}
