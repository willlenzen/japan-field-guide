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
      className="inline-flex items-center gap-1 h-7 px-3 text-[14px] text-[var(--ginnezumi)] hover:text-[var(--shironeri)] hover:bg-white/[0.08] transition-colors"
      style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}
    >
      Map
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M13 3L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        <path d="M3 5v8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </a>
  );
}
