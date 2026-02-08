"use client";
import { locations, categoryConfig, type Location, type Category } from "@/data/locations";
import { LocationRow } from "./location-row";

interface LocationListProps {
  filter: Category | "all";
  selectedId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (loc: Location) => void;
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
  isChecked: (id: string) => boolean;
  onToggleCheck: (id: string) => void;
}

export function LocationList({ filter, selectedId, onHover, onSelect, isStarred, onToggleStar, isChecked, onToggleCheck }: LocationListProps) {
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
        // Sort: unchecked first, checked last (preserve original order within each group)
        const sorted = [...items].sort((a, b) => {
          const ac = isChecked(a.id) ? 1 : 0;
          const bc = isChecked(b.id) ? 1 : 0;
          return ac - bc;
        });
        return (
          <div key={cat}>
            <div className="sticky top-0 z-10 bg-[var(--ro)] border-b border-[var(--keshizumi)]/50 px-4" style={{ paddingTop: 20, paddingBottom: 12 }}>
              <span className="font-mono text-[12px] uppercase tracking-wider" style={{ color: cfg.color }}>
                {cfg.label}
              </span>
              <span className="font-mono text-[12px] text-[var(--keshizumi)] ml-2">{items.length}</span>
            </div>
            {sorted.map((loc) => (
              <LocationRow
                key={loc.id}
                location={loc}
                starred={isStarred(loc.id)}
                onToggleStar={() => onToggleStar(loc.id)}
                checked={isChecked(loc.id)}
                onToggleCheck={() => onToggleCheck(loc.id)}
                onSelect={() => onSelect(loc)}
                selected={selectedId === loc.id}
                onMouseEnter={() => onHover(loc.id)}
                onMouseLeave={() => onHover(null)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
