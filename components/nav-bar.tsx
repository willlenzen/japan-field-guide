"use client";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

const navLinks = [
  { href: "/map", label: "Map" },
  { href: "/planning", label: "Planning" },
  { href: "/saved", label: "Saved" },
] as const;

interface NavBarProps {
  current?: "/map" | "/planning" | "/saved";
}

export function NavBar({ current }: NavBarProps) {
  const { count, mounted } = useStarred();
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--keshizumi)] bg-[var(--ro)]/95 backdrop-blur-sm px-4 h-11 font-mono text-xs">
      <Link href="/" className="text-[var(--ginnezumi)] hover:text-[var(--shironeri)] transition-colors">
        ← Field Guide
      </Link>
      <div className="flex items-center gap-4">
        {navLinks
          .filter((link) => link.href !== current)
          .map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--ginnezumi)] hover:text-[var(--shironeri)] transition-colors"
            >
              {link.label === "Saved"
                ? `Saved${mounted ? ` (${count})` : ""}`
                : link.label}
            </Link>
          ))}
      </div>
    </nav>
  );
}
