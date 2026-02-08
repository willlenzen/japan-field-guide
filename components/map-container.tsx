"use client";
import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, categoryConfig, type Location, type Category } from "@/data/locations";

interface MapContainerProps {
  filter: Category | "all";
  selectedId: string | null;
  onSelect: (loc: Location) => void;
}

const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
const CENTER: L.LatLngExpression = [35.6762, 139.6503];

function markerIcon(cat: Category, selected: boolean): L.DivIcon {
  const size = selected ? 12 : 8;
  const css = categoryConfig[cat].css;
  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div style="width:${size}px;height:${size}px;background:${css};border:1px solid ${css};${selected ? `box-shadow:0 0 6px ${css}` : ""}"></div>`,
  });
}

export default function MapContainer({ filter, selectedId, onSelect }: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: CENTER,
      zoom: 12,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR, maxZoom: 18 }).addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Manage markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const filtered = filter === "all" ? locations : locations.filter((l) => l.cat === filter);
    const filteredIds = new Set(filtered.map((l) => l.id));

    // Remove markers not in current filter
    markersRef.current.forEach((marker, id) => {
      if (!filteredIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    // Add or update markers
    filtered.forEach((loc) => {
      const existing = markersRef.current.get(loc.id);
      const icon = markerIcon(loc.cat, loc.id === selectedId);

      if (existing) {
        existing.setIcon(icon);
      } else {
        const marker = L.marker([loc.lat, loc.lng], { icon })
          .addTo(map)
          .bindTooltip(loc.name, {
            className: "pixel-tooltip",
            direction: "top",
            offset: [0, -6],
          });
        marker.on("click", () => onSelect(loc));
        markersRef.current.set(loc.id, marker);
      }
    });
  }, [filter, selectedId, onSelect]);

  // Pan to selected
  useEffect(() => {
    if (!selectedId || !mapRef.current) return;
    const loc = locations.find((l) => l.id === selectedId);
    if (loc) mapRef.current.panTo([loc.lat, loc.lng], { animate: true, duration: 0.3 });
  }, [selectedId]);

  return (
    <div
      ref={containerRef}
      className="sticky top-[48px] z-30 w-full h-[50vh] sm:h-[520px] border-b border-[var(--keshizumi)]"
    />
  );
}
