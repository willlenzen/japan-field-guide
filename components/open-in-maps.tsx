"use client";
import { getMapsUrl } from "@/lib/platform";

interface OpenInMapsProps {
  lat: number;
  lng: number;
  name: string;
}

export function OpenInMaps({ lat, lng, name }: OpenInMapsProps) {
  return (
    <a
      href={getMapsUrl(lat, lng, name)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[var(--ginnezumi)] hover:text-[var(--shironeri)] transition-colors"
    >
      open in maps ↗
    </a>
  );
}
