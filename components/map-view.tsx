"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, type Location, type Category, categoryConfig } from "@/data/locations";
import LocationCard from "@/components/location-card";
import LocationList from "@/components/location-list";
import { Sheet, SheetContent } from "@/components/ui/sheet";

/* ─── Square Markers ─── */

function SquareMarkers({
  filtered,
  selectedId,
  onSelect,
}: {
  filtered: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    filtered.forEach((loc) => {
      const cfg = categoryConfig[loc.cat];
      const isBase = loc.cat === "base";
      const isSel = selectedId === loc.id;

      let sz = 8,
        bw = 1,
        bc = "rgba(0,0,0,0.5)",
        shadow = "none",
        fill = cfg.cssColor;

      if (isBase) {
        sz = 14;
        bw = 2;
        bc = "#FCFAF2";
        fill = "#CB1B45";
        shadow = "0 0 12px rgba(203,27,69,0.25)";
      } else if (isSel) {
        sz = 12;
        bw = 2;
        bc = "#FCFAF2";
        shadow = `0 0 10px ${cfg.glow}`;
      }

      const inner =
        isBase && loc.icon
          ? `<span style="font-size:${sz * 0.55}px;line-height:1">${loc.icon}</span>`
          : "";

      const html = `<div style="
        width:${sz}px;height:${sz}px;
        background:${fill};
        border:${bw}px solid ${bc};
        border-radius:1px;
        box-shadow:${shadow};
        display:flex;align-items:center;justify-content:center;
      ">${inner}</div>`;

      const icon = L.divIcon({
        html,
        className: "",
        iconSize: [sz, sz],
        iconAnchor: [sz / 2, sz / 2],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .on("click", () => onSelect(loc.id));

      marker.bindTooltip(loc.name, {
        className: "pixel-tooltip",
        direction: "top",
        offset: [0, -(sz / 2) - 4],
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [filtered, selectedId, map, onSelect]);

  return null;
}

/* ─── Helpers ─── */

function InvalidateSize() {
  const map = useMap();
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(t);
  }, [map]);
  return null;
}

function TileLoadDetector({ onLoad }: { onLoad: () => void }) {
  const map = useMap();
  const fired = useRef(false);
  useEffect(() => {
    const handler = () => {
      if (!fired.current) {
        fired.current = true;
        onLoad();
      }
    };
    map.on("tileload", handler);
    // safety
    const t = setTimeout(handler, 4000);
    return () => {
      map.off("tileload", handler);
      clearTimeout(t);
    };
  }, [map, onLoad]);
  return null;
}

function PanTo({ loc }: { loc: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (loc) map.panTo([loc.lat, loc.lng], { animate: true, duration: 0.4 });
  }, [loc, map]);
  return null;
}

/* ─── Main export ─── */

interface MapViewProps {
  isStarred: (id: string) => boolean;
  onToggleStar: (id: string) => void;
  onMapReady: () => void;
}

export default function MapView({
  isStarred,
  onToggleStar,
  onMapReady,
}: MapViewProps) {
  const [filters, setFilters] = useState<Set<Category>>(
    new Set(["culture", "food", "shopping"]),
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showList, setShowList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const chk = () => setIsMobile(window.innerWidth < 768);
    chk();
    window.addEventListener("resize", chk);
    return () => window.removeEventListener("resize", chk);
  }, []);

  const filtered = locations.filter(
    (l) => l.cat === "base" || filters.has(l.cat),
  );
  const selected = selectedId
    ? locations.find((l) => l.id === selectedId) ?? null
    : null;

  const toggleFilter = (cat: Category) =>
    setFilters((p) => {
      const n = new Set(p);
      if (n.has(cat)) n.delete(cat);
      else n.add(cat);
      return n;
    });

  const handleSelect = useCallback((id: string) => {
    setSelectedId((p) => (p === id ? null : id));
    setShowList(false);
  }, []);

  const filterCats: Category[] = ["culture", "food", "shopping"];

  return (
    <div className="flex flex-col h-full">
      {/* ── Filter row ── */}
      <div
        className="flex items-center gap-2 px-[14px] md:px-0 py-2 overflow-x-auto hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {filterCats.map((cat) => {
          const cfg = categoryConfig[cat];
          const on = filters.has(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggleFilter(cat)}
              className="flex items-center gap-1.5 px-3 shrink-0 font-mono text-[11px] tracking-[.06em] uppercase transition-colors duration-150"
              style={{
                scrollSnapAlign: "start",
                minHeight: 44,
                height: 34,
                borderRadius: "2px",
                border: `1px solid ${on ? cfg.cssColor : "var(--keshizumi)"}`,
                background: on ? cfg.glow : "transparent",
                color: on ? cfg.cssColor : "var(--sunezumi)",
              }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "1px",
                  background: on ? cfg.cssColor : "var(--sunezumi)",
                }}
              />
              {cfg.label}
            </button>
          );
        })}

        <span className="font-mono text-[10px] text-sunezumi shrink-0 ml-auto pl-2">
          {filtered.length} places
        </span>

        {/* List / Map toggle (mobile only) */}
        <button
          type="button"
          onClick={() => setShowList((p) => !p)}
          className="md:hidden shrink-0 font-mono text-[10px] tracking-[.06em] uppercase text-sunezumi border border-keshizumi px-2 hover:text-ginnezumi transition-colors duration-150"
          style={{ height: 28, borderRadius: "2px", minWidth: 44 }}
        >
          {showList ? "Map" : "List"}
        </button>
      </div>

      {/* ── Map or List ── */}
      {showList ? (
        <div className="flex-1 overflow-y-auto">
          <LocationList
            locations={filtered}
            selectedId={selectedId}
            onSelect={handleSelect}
            isStarred={isStarred}
            onToggleStar={onToggleStar}
          />
        </div>
      ) : (
        <div className="flex-1 relative">
          <div
            className="w-full h-full overflow-hidden border border-keshizumi"
            style={{ borderRadius: "8px" }}
          >
            <MapContainer
              center={[35.685, 139.72]}
              zoom={13}
              style={{ width: "100%", height: "100%" }}
              zoomControl
              attributionControl
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png"
                subdomains="abcd"
                attribution='&copy; <a href="https://carto.com">CARTO</a>'
                maxZoom={19}
              />
              <SquareMarkers
                filtered={filtered}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
              <InvalidateSize />
              <TileLoadDetector onLoad={onMapReady} />
              <PanTo loc={selected} />
            </MapContainer>
          </div>
        </div>
      )}

      {/* ── Detail: Sheet (mobile) or Card (desktop) ── */}
      {isMobile ? (
        <Sheet
          open={!!selected}
          onOpenChange={(o) => {
            if (!o) setSelectedId(null);
          }}
        >
          <SheetContent
            side="bottom"
            showCloseButton={false}
            className="border-t border-keshizumi bg-sumi p-0 rounded-t-[8px]"
            style={{ height: "60vh", maxHeight: "60vh" }}
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-8 h-1 rounded-full bg-keshizumi" />
            </div>
            <div
              className="px-[14px] pb-4 overflow-y-auto"
              style={{ maxHeight: "calc(60vh - 24px)" }}
            >
              {selected && (
                <LocationCard
                  location={selected}
                  isStarred={isStarred(selected.id)}
                  onToggleStar={onToggleStar}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        selected && (
          <div className="mt-4">
            <LocationCard
              location={selected}
              isStarred={isStarred(selected.id)}
              onToggleStar={onToggleStar}
              showClose
              onClose={() => setSelectedId(null)}
            />
          </div>
        )
      )}

      {/* ── Desktop: full list below map ── */}
      <div className="hidden md:block mt-4">
        <LocationList
          locations={filtered}
          selectedId={selectedId}
          onSelect={handleSelect}
          isStarred={isStarred}
          onToggleStar={onToggleStar}
        />
      </div>
    </div>
  );
}
