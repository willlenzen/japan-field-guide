"use client";
import { locations, categoryConfig, type Location, type Category } from "@/data/locations";
import { LocationRow } from "./location-row";

interface LocationListProps {
  filter: Category | "all";
  selectedId: string | null;
  onSelect: (loc: Location) => void;
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
}

export function LocationList({ filter, selectedId, onSelect, isStarred, onToggleStar }: LocationListProps) {
  const filtered = filter === "all" ? locations : locations.filter((l) => l.cat === filter);

  // group by category
  const grouped = filtered.reduce<Record<string, Location[]>>((acc, loc) => {
    const key = loc.cat;
    if (!acc[key]) acc[key] = [];
    acc[key].push(loc);
    return acc;
  }, {});

  const catOrder: Category[] = ["base", "culture", "food", "shopping"];

  return (
    <div className="flex-1 overflow-y-auto">
      {catOrder.map((cat) => {
        const items = grouped[cat];
        if (!items || items.length === 0) return null;
        const cfg = categoryConfig[cat];
        return (
          <div key={cat}>
            <div className="sticky top-0 z-10 bg-[var(--ro)] border-b border-[var(--keshizumi)]/50 px-4 py-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: cfg.color }}>
                {cfg.label}
              </span>
              <span className="font-mono text-[10px] text-[var(--keshizumi)] ml-2">{items.length}</span>
            </div>
            {items.map((loc) => (
              <LocationRow
                key={loc.id}
                location={loc}
                starred={isStarred(loc.id)}
                onToggleStar={() => onToggleStar(loc.id)}
                onSelect={() => onSelect(loc)}
                selected={selectedId === loc.id}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
