"use client";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

export function NavBar() {
  const { count, mounted } = useStarred();
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--keshizumi)] bg-[var(--ro)]/95 backdrop-blur-sm px-4 h-11 font-mono text-xs">
      <Link href="/" className="text-[var(--ginnezumi)] hover:text-[var(--shironeri)] transition-colors">
        ← Field Guide
      </Link>
      <Link href="/saved" className="text-[var(--ginnezumi)] hover:text-[var(--shironeri)] transition-colors">
        saved{mounted ? ` (${count})` : ""}
      </Link>
    </nav>
  );
}
