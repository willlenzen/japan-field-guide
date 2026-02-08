"use client";

import { useState } from "react";
import { locations } from "@/data/locations";
import LocationCard from "@/components/location-card";

interface SavedViewProps {
  starred: Set<string>;
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
  shareUrl: () => void;
}

export default function SavedView({
  starred,
  isStarred,
  onToggleStar,
  shareUrl,
}: SavedViewProps) {
  const [toast, setToast] = useState(false);
  const saved = locations.filter((l) => starred.has(l.id));

  const handleShare = () => {
    shareUrl();
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="max-w-[760px] mx-auto px-[14px] md:px-[20px] pb-24 md:pb-8 pt-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1L9.5 5.5H14L10.5 8.5L12 13L8 10L4 13L5.5 8.5L2 5.5H6.5L8 1Z"
            fill="var(--yamabuki)"
            stroke="var(--yamabuki)"
            strokeWidth="0.5"
          />
        </svg>
        <span className="font-sans text-[15px] font-semibold text-shironeri tracking-[-0.03em]">
          Saved
        </span>
        {saved.length > 0 && (
          <span
            className="font-mono text-[9px] rounded-[1px] px-[4px] py-[1px]"
            style={{ background: "var(--yamabuki)", color: "var(--ro)" }}
          >
            {saved.length}
          </span>
        )}
      </div>

      {saved.length > 0 ? (
        <div className="space-y-3">
          {saved.map((loc) => (
            <LocationCard
              key={loc.id}
              location={loc}
              isStarred={isStarred(loc.id)}
              onToggleStar={onToggleStar}
            />
          ))}

          <button
            type="button"
            onClick={handleShare}
            className="w-full py-3 font-mono text-[11px] tracking-[.06em] uppercase text-ginnezumi border border-keshizumi hover:bg-aisumicha hover:text-shironeri transition-colors duration-150"
            style={{ borderRadius: "2px", minHeight: 44 }}
          >
            Share my picks
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="font-sans text-[13px] text-sunezumi text-center">
            Star places on the map to build your shortlist.
          </p>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[200] font-mono text-[11px] text-shironeri px-4 py-2 border border-keshizumi"
          style={{ background: "var(--sumi)", borderRadius: "2px" }}
        >
          Link copied
        </div>
      )}
    </div>
  );
}
