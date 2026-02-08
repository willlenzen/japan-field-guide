"use client";
import Link from "next/link";
import { AsciiFlag } from "@/components/ascii-flag";
import { ForkButton } from "@/components/fork-section";
import { useStarred } from "@/lib/use-starred";

export default function Home() {
  const { count, mounted } = useStarred();
  return (
    <main className="relative min-h-dvh flex flex-col">
      {/* flag + title */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-4">
        <AsciiFlag />
        <div className="text-center mt-4 space-y-2">
          <h1 className="font-mono text-lg tracking-tight text-[var(--shironeri)]">
            Japan Field Guide
          </h1>
          <p className="font-mono text-[10px] text-[var(--sunezumi)] tracking-wider uppercase">
            Tokyo · Feb 12–20, 2026
          </p>
        </div>
      </div>

      {/* navigation */}
      <nav className="px-4 pb-6 space-y-2 max-w-sm mx-auto w-full">
        <Link
          href="/map"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Map
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">→</span>
        </Link>
        <Link
          href="/planning"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Planning
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">→</span>
        </Link>
        <Link
          href="/saved"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Saved
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">
            {mounted ? count : 0} →
          </span>
        </Link>
      </nav>

      <ForkButton />

      {/* footer */}
      <footer className="border-t border-[var(--keshizumi)] px-4 py-4 text-center">
        <p className="font-mono text-[9px] text-[var(--keshizumi)]">
          built with claude · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
