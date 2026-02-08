"use client";

import type { Location, Category } from "@/data/locations";
import { categoryConfig } from "@/data/locations";
import { Badge } from "@/components/ui/badge";
import PixelStar from "@/components/pixel-star";

interface LocationListProps {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
}

const catOrder: Category[] = ["base", "culture", "food", "shopping"];

export default function LocationList({
  locations: locs,
  selectedId,
  onSelect,
  isStarred,
  onToggleStar,
}: LocationListProps) {
  return (
    <div className="space-y-4 pb-4">
      {catOrder.map((cat) => {
        const items = locs.filter((l) => l.cat === cat);
        if (items.length === 0) return null;
        const cfg = categoryConfig[cat];

        /* Sub-group within category */
        const groups = new Map<string, Location[]>();
        items.forEach((loc) => {
          const g = loc.group || "Other";
          if (!groups.has(g)) groups.set(g, []);
          groups.get(g)!.push(loc);
        });

        return (
          <div key={cat}>
            {/* Category header */}
            <div className="flex items-center gap-2 px-[14px] md:px-0 mb-2">
              <span
                className="shrink-0"
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "1px",
                  background: cfg.cssColor,
                }}
              />
              <span className="font-mono text-[12px] font-semibold tracking-[.08em] uppercase text-shironezumi">
                {cfg.label}
              </span>
            </div>

            {[...groups.entries()].map(([group, gLocs]) => (
              <div key={group} className="mb-2">
                {group !== "Other" && (
                  <div className="px-[14px] md:px-0 mb-1">
                    <span className="font-sans text-[11px] text-sunezumi">
                      {group}
                    </span>
                  </div>
                )}

                {gLocs.map((loc) => {
                  const active = selectedId === loc.id;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => onSelect(loc.id)}
                      className={`
                        w-full flex items-center gap-2 px-[14px] md:px-2
                        transition-colors duration-150 text-left border-l-2
                        ${
                          active
                            ? "bg-aisumicha"
                            : "hover:bg-aisumicha/50 border-l-transparent"
                        }
                      `}
                      style={{
                        minHeight: 44,
                        borderLeftColor: active ? cfg.cssColor : "transparent",
                      }}
                    >
                      <div className="flex-1 min-w-0 py-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-sans text-[12px] font-medium text-shironezumi truncate">
                            {loc.icon && (
                              <span className="mr-0.5">{loc.icon}</span>
                            )}
                            {loc.name}
                          </span>
                          {loc.jp && (
                            <span className="font-sans text-[12px] opacity-45 shrink-0">
                              {loc.jp}
                            </span>
                          )}
                          {loc.tag && (
                            <Badge
                              variant="outline"
                              className="font-mono text-[9px] tracking-[.06em] uppercase px-[4px] py-0 h-[14px] rounded-[1px] shrink-0"
                              style={{
                                borderColor: cfg.cssColor,
                                color: cfg.cssColor,
                                background: "transparent",
                              }}
                            >
                              {loc.tag}
                            </Badge>
                          )}
                        </div>
                        {loc.budget && (
                          <span className="font-mono text-[10px] text-sunezumi">
                            {loc.budget}
                          </span>
                        )}
                      </div>

                      <PixelStar
                        filled={isStarred(loc.id)}
                        size={12}
                        onClick={() => onToggleStar(loc.id)}
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
