"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/nav-bar";
import { CategoryFilters } from "@/components/category-filters";
import { LocationList } from "@/components/location-list";
import { LocationCard } from "@/components/location-card";
import { useStarred } from "@/lib/use-starred";
import type { Location, Category } from "@/data/locations";

const MapContainer = dynamic(() => import("@/components/map-container"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[50vh] sm:h-[520px] border-b border-[var(--keshizumi)] bg-[var(--ro)] flex items-center justify-center">
      <span className="font-mono text-[10px] text-[var(--keshizumi)]">loading map…</span>
    </div>
  ),
});

export default function MapPage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Location | null>(null);
  const { toggle, isStarred } = useStarred();

  const handleSelect = useCallback((loc: Location) => {
    setSelected((prev) => (prev?.id === loc.id ? null : loc));
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--ro)]">
      <NavBar />
      <MapContainer
        filter={filter}
        selectedId={selected?.id ?? null}
        onSelect={handleSelect}
      />
      <CategoryFilters active={filter} onChange={setFilter} />
      <LocationList
        filter={filter}
        selectedId={selected?.id ?? null}
        onSelect={handleSelect}
        isStarred={isStarred}
        onToggleStar={toggle}
      />
      {selected && (
        <LocationCard
          location={selected}
          starred={isStarred(selected.id)}
          onToggleStar={() => toggle(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
