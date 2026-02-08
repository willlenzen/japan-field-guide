"use client";
import { categoryConfig, type Category } from "@/data/locations";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  active: Category | "all";
  onChange: (cat: Category | "all") => void;
}

const filters: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(categoryConfig).map(([key, val]) => ({
    key: key as Category,
    label: val.label,
  })),
];

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-2">
      {filters.map(({ key, label }) => {
        const isActive = active === key;
        const color = key === "all" ? "var(--shironeri)" : categoryConfig[key].color;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              "shrink-0 font-mono text-[10px] px-2.5 py-1 border transition-colors cursor-pointer",
              isActive
                ? "border-current text-[var(--shironeri)]"
                : "border-[var(--keshizumi)] text-[var(--sunezumi)] hover:text-[var(--ginnezumi)]"
            )}
            style={isActive ? { color, borderColor: color } : undefined}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
