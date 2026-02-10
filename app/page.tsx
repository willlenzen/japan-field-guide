"use client";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

export default function Home() {
  const { count, mounted } = useStarred();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0C0C0C]">
      {/* Video — fullscreen background */}
      <video
        src="/flag.mp4"
        poster="/flag-poster.png"
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* vertical watermark */}
      <div
        className="fixed left-4 top-4 z-10 pointer-events-none hidden md:block"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
          fontSize: "56px",
          color: "var(--shironeri)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        日本のフィールドガイド
      </div>
      {/* vertical watermark — right */}
      <div
        className="fixed right-4 bottom-4 z-10 pointer-events-none hidden md:block"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "upright",
          fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace",
          fontSize: "56px",
          color: "var(--shironeri)",
          opacity: 0.05,
          lineHeight: 1,
        }}
      >
        東京2026年2月
      </div>

      {/* Spacer to push content down */}
      <div className="flex-1" />

      {/* Content — titles + buttons */}
      <div className="relative z-10 mb-[120px] px-4">
        <div className="text-center space-y-2">
          <h1 className="font-mono text-lg tracking-tight text-[var(--shironeri)]">
            日本のフィールドガイド
          </h1>
          <p className="text-sm tracking-tight text-white/80" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
            Japan Field Guide
          </p>
          <p className="font-mono text-[12px] text-[var(--sunezumi)] tracking-wider uppercase" style={{ paddingBottom: 40 }}>
            Tokyo · Feb 12–20, 2026
          </p>
        </div>

        {/* navigation */}
        <nav className="mt-6 mx-auto flex flex-col gap-2 w-full max-w-sm md:flex-row md:max-w-none md:w-auto md:gap-6 md:justify-center">
          <Link
            href="/map"
            className="flex items-center justify-between border border-white/80 px-4 py-3 hover:border-white hover:bg-white/[0.05] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Map
            </span>
            <span className="font-mono text-[12px] text-white/50">→</span>
          </Link>
          <Link
            href="/planning"
            className="flex items-center justify-between border border-white/80 px-4 py-3 hover:border-white hover:bg-white/[0.05] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Planning
            </span>
            <span className="font-mono text-[12px] text-white/50">→</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center justify-between border border-white/80 px-4 py-3 hover:border-white hover:bg-white/[0.05] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-white/80 group-hover:text-white transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Saved
            </span>
            <span className="font-mono text-[12px] text-white/50" style={{ fontVariantNumeric: "tabular-nums" }}>
              {mounted ? count : 0} →
            </span>
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-4 text-center">
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
    </div>
  );
}
