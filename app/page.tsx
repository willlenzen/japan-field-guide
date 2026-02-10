"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useStarred } from "@/lib/use-starred";

export default function Home() {
  const { count, mounted } = useStarred();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div
      className="relative min-h-dvh"
      style={{
        background: "url('/bkgd.png') center / cover no-repeat fixed",
      }}
    >
      {/* video background layer */}
      <div className="absolute inset-x-0 top-6 sm:top-10 z-0 flex justify-center pointer-events-none">
        <div className="relative w-full h-[400px] sm:h-[700px] overflow-hidden">
          {/* poster image — shown immediately */}
          <img
            src="/flag-poster.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: videoReady ? 0 : 1 }}
          />
          {/* video — fades in when ready */}
          <video
            ref={videoRef}
            src="/flag.mp4"
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: videoReady ? 1 : 0 }}
          />
        </div>
      </div>

      {/* vertical watermark */}
      <div
        className="fixed left-4 top-4 z-0 pointer-events-none hidden md:block"
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
        className="fixed right-4 bottom-4 z-0 pointer-events-none hidden md:block"
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

      {/* content layer — on top of video */}
      <main className="relative z-10 min-h-dvh flex flex-col">
        {/* title */}
        <div className="flex flex-col items-center px-4 pt-4">
          {/* spacer to push title below the video area */}
          <div className="h-[420px] sm:h-[720px]" />
          <div className="text-center space-y-2" style={{ marginTop: 40 }}>
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
        </div>

        {/* navigation */}
        <nav className="mt-16 md:mt-6 px-4 pb-6 mx-auto flex flex-col gap-2 w-full max-w-sm md:flex-row md:max-w-none md:w-auto md:gap-6 md:justify-center">
          <Link
            href="/map"
            className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Map
            </span>
            <span className="font-mono text-[12px] text-[var(--keshizumi)]">→</span>
          </Link>
          <Link
            href="/planning"
            className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Planning
            </span>
            <span className="font-mono text-[12px] text-[var(--keshizumi)]">→</span>
          </Link>
          <Link
            href="/saved"
            className="flex items-center justify-between border border-[var(--keshizumi)] px-4 py-3 hover:border-[var(--sunezumi)] transition-colors group md:w-[136px]"
          >
            <span className="text-[14px] text-[var(--ginnezumi)] group-hover:text-[var(--shironeri)] transition-colors" style={{ fontFamily: "var(--font-geist-pixel-square), var(--font-geist-mono), monospace" }}>
              Saved
            </span>
            <span className="font-mono text-[12px] text-[var(--keshizumi)]" style={{ fontVariantNumeric: "tabular-nums" }}>
              {mounted ? count : 0} →
            </span>
          </Link>
        </nav>

        {/* footer */}
        <footer className="mt-auto px-4 py-4 text-center">
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
    </div>
  );
}
