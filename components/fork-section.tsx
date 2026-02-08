"use client";
import { useState, useCallback } from "react";

const FORK_PROMPT = `Build me a personal travel field guide for [YOUR CITY]. Use a dark pixel aesthetic with a monospaced type system. Include locations organized by category (base, culture, food, shopping) with lat/lng coordinates, descriptions, budget ranges, and local tips. Make it a Next.js app with Leaflet maps, localStorage for saving favorites, and a shareable URL scheme. Design it to feel like a dev tool, not a tourist app.`;

export function ForkSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(FORK_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="border-t border-[var(--keshizumi)] px-4 py-6">
      <h2 className="font-mono text-[10px] uppercase tracking-wider text-[var(--sunezumi)] mb-3">
        Fork this guide
      </h2>
      <p className="text-xs text-[var(--ginnezumi)] leading-relaxed mb-4">
        Copy the prompt below and paste it into Claude to build your own city guide.
      </p>
      <div className="border border-[var(--keshizumi)] bg-[var(--sumi)] p-3 mb-3">
        <pre className="text-[10px] font-mono text-[var(--sunezumi)] whitespace-pre-wrap leading-relaxed">
          {FORK_PROMPT}
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="font-mono text-[10px] border border-[var(--keshizumi)] px-3 py-1.5 text-[var(--ginnezumi)] hover:text-[var(--shironeri)] hover:border-[var(--sunezumi)] transition-colors cursor-pointer"
      >
        {copied ? "copied ✓" : "copy prompt"}
      </button>
    </section>
  );
}
