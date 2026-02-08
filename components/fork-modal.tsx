"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const quickPicks = ["Seoul", "Lisbon", "Mexico City", "Paris"];

/* ── Fork icon used in both triggers ── */
function ForkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M5.5 2v3c0 1.5 2.5 2.5 2.5 4v5M10.5 2v3c0 1.5-2.5 2.5-2.5 4"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="5.5" cy="2" r="1.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="10.5" cy="2" r="1.2" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="14" r="1.2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/* Separate trigger components so Dialog can wrap the whole thing */

export function ForkDesktopTrigger() {
  return (
    <DialogTrigger asChild>
      <button
        type="button"
        className="px-3 py-1.5 font-sans text-[13px] text-sunezumi hover:text-ginnezumi transition-colors duration-150"
        style={{ minHeight: 44 }}
      >
        Fork
      </button>
    </DialogTrigger>
  );
}

export function ForkMobileTrigger() {
  return (
    <DialogTrigger asChild>
      <button
        type="button"
        className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150"
        style={{ color: "var(--sunezumi)", minHeight: 52 }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M7 3v4c0 2 3 3 3 5v5M13 3v4c0 2-3 3-3 5"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="7" cy="3" r="1.5" stroke="currentColor" strokeWidth="1" />
          <circle
            cx="13"
            cy="3"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle
            cx="10"
            cy="17"
            r="1.5"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="font-mono text-[9px] tracking-[.06em] uppercase">
          Fork
        </span>
      </button>
    </DialogTrigger>
  );
}

export default function ForkModal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [destination, setDestination] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          setSubmitted(false);
          setDestination("");
        }
      }}
    >
      {children}

      <DialogContent
        className="border border-keshizumi bg-sumi max-w-[360px]"
        style={{ borderRadius: "4px" }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-sans text-[15px] font-semibold text-shironeri">
            <ForkIcon />
            Fork this guide
          </DialogTitle>
        </DialogHeader>

        {!submitted ? (
          <div className="space-y-4 mt-2">
            <p className="font-sans text-[13px] text-ginnezumi leading-[1.5]">
              Create your own field guide. Claude generates tailored sections for
              your destination.
            </p>

            <Input
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-sumi border-keshizumi text-shironeri font-sans text-[13px] placeholder:text-sunezumi h-10"
              style={{ borderRadius: "2px" }}
            />

            <div className="flex flex-wrap gap-2">
              {quickPicks.map((city) => (
                <Badge
                  key={city}
                  variant="outline"
                  className="font-mono text-[10px] tracking-[.06em] uppercase cursor-pointer border-keshizumi text-ginnezumi hover:bg-aisumicha hover:text-shironeri transition-colors duration-150 px-2 py-1"
                  style={{ borderRadius: "1px" }}
                  onClick={() => setDestination(city)}
                >
                  {city}
                </Badge>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="w-full py-2.5 font-mono text-[11px] tracking-[.06em] uppercase text-shironeri transition-colors duration-150 hover:opacity-90"
              style={{
                background: "var(--kurenai)",
                borderRadius: "2px",
                minHeight: 44,
              }}
            >
              Generate my guide
            </button>
          </div>
        ) : (
          <div className="space-y-3 mt-2 text-center py-4">
            <p className="font-sans text-[13px] text-ginnezumi leading-[1.5]">
              Coming soon. Built with Claude, designed to be forked.
            </p>
            <a
              href="https://anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[11px] tracking-[.06em] text-kurenai hover:opacity-80 transition-opacity duration-150"
            >
              anthropic.com
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
