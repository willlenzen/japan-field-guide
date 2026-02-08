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
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-[var(--keshizumi)] bg-[var(--ro)]/95 backdrop-blur-sm px-4 py-3 font-mono text-[14px]">
      <Link href="/" className="block" aria-label="Home">
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="24" fill="#FCFAF2" />
          <circle cx="18" cy="12" r="7.2" fill="#CB1B45" />
        </svg>
      </Link>
      <div className="flex items-center gap-6">
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
