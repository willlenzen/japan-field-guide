"use client";
import { useState } from "react";
import { categoryConfig, type Category } from "@/data/locations";
import { cn } from "@/lib/utils";

interface CategoryFiltersProps {
  active: Category | "all";
  onChange: (cat: Category | "all") => void;
}

const jpPrefix: Record<Category, string> = {
  base: "基",
  culture: "文",
  food: "食",
  shopping: "買",
};

const filters: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  ...Object.entries(categoryConfig).map(([key, val]) => ({
    key: key as Category,
    label: `${jpPrefix[key as Category]} ${val.label}`,
  })),
];

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  const [hovered, setHovered] = useState<Category | "all" | null>(null);

  return (
    <div className="flex gap-1.5 overflow-x-auto hide-scrollbar px-4 py-2">
      {filters.map(({ key, label }) => {
        const isActive = active === key;
        const catColor = key === "all" ? "var(--shironeri)" : categoryConfig[key].color;
        const isHovered = hovered === key && !isActive;
        const hoverBorder = key !== "all" && isHovered ? categoryConfig[key].color : undefined;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "shrink-0 font-mono text-[14px] px-2.5 py-1 border transition-colors cursor-pointer",
              isActive
                ? "border-current text-[var(--shironeri)]"
                : "border-[var(--keshizumi)] text-[var(--sunezumi)] hover:text-[var(--ginnezumi)]"
            )}
            style={
              isActive
                ? { color: catColor, borderColor: catColor }
                : hoverBorder
                  ? { borderColor: hoverBorder }
                  : undefined
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
