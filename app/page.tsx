"use client";
import Link from "next/link";
import { AsciiFlag } from "@/components/ascii-flag";

import { useStarred } from "@/lib/use-starred";

export default function Home() {
  const { count, mounted } = useStarred();
  return (
    <>
      {/* vertical watermark */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 z-0 pointer-events-none hidden md:block"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
          fontSize: "88px",
          color: "var(--shironeri)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        日本のフィールドガイド
      </div>
    <main className="relative z-1 min-h-dvh flex flex-col">
      {/* flag + title */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-8 pb-4">
        <AsciiFlag />
        <div className="text-center mt-4 space-y-2">
          <h1 className="font-mono text-lg tracking-tight text-[var(--shironeri)]">
            日本のフィールドガイド
          </h1>
          <p className="text-sm tracking-tight text-white/80" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
            Japan Field Guide
          </p>
          <p className="font-mono text-[10px] text-[var(--sunezumi)] tracking-wider uppercase">
            Tokyo · Feb 12–20, 2026
          </p>
        </div>
      </div>

      {/* navigation */}
      <nav className="mt-10 px-4 pb-6 mx-auto flex flex-col gap-2 w-full max-w-sm md:flex-row md:max-w-none md:w-auto md:gap-6 md:justify-center">
        <Link
          href="/map"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Map
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">→</span>
        </Link>
        <Link
          href="/planning"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Planning
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">→</span>
        </Link>
        <Link
          href="/saved"
          className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
        >
          <span className="font-mono text-xs text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors">
            Saved
          </span>
          <span className="font-mono text-[10px] text-[var(--keshizumi)]">
            {mounted ? count : 0} →
          </span>
        </Link>
      </nav>

      <a
        href="https://github.com/willlenzen/japan-field-guide"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-[14px] right-[14px] z-10 flex items-center gap-1.5 font-mono text-[11px] text-[var(--sunezumi)] hover:text-[var(--shironeri)] transition-colors no-underline"
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Clone
      </a>

      {/* footer */}
      <footer className="px-4 py-4 text-center">
        <p className="font-mono text-[9px] text-[var(--keshizumi)]">
          built by{" "}
          <a
            href="https://willl.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--sunezumi)] no-underline hover:text-[var(--shironeri)] transition-colors"
          >
            will lenzen
          </a>
          {" "}with claude · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
    </>
  );
}
