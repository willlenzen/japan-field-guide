"use client";

import FlagCanvas from "@/components/flag-canvas";

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  starredCount: number;
  forkButton: React.ReactNode;
}

export default function Nav({
  activeTab,
  onTabChange,
  starredCount,
  forkButton,
}: NavProps) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between h-[46px] px-[14px] md:px-[20px] border-b border-keshizumi"
      style={{
        background: "rgba(12, 12, 12, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Left: Flag + Title */}
      <div className="flex items-center gap-2">
        <FlagCanvas width={28} height={20} />
        <span className="font-sans text-[13px] font-semibold text-shironeri tracking-[-0.03em]">
          Field Guide
        </span>
        <span className="font-mono text-[11px] text-sunezumi ml-1">
          東京 &apos;26
        </span>
      </div>

      {/* Right: Desktop tabs */}
      <nav className="hidden md:flex items-center gap-1">
        {["map", "planning", "saved"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`px-3 py-1.5 font-sans text-[13px] capitalize transition-colors duration-150 ${
              activeTab === tab
                ? "text-shironeri"
                : "text-sunezumi hover:text-ginnezumi"
            }`}
            style={{ minHeight: 44 }}
          >
            {tab}
            {tab === "saved" && starredCount > 0 && (
              <span
                className="ml-1.5 inline-flex items-center justify-center font-mono text-[9px] rounded-[1px] px-[4px] py-[1px]"
                style={{
                  background: "var(--yamabuki)",
                  color: "var(--ro)",
                  minWidth: 16,
                }}
              >
                {starredCount}
              </span>
            )}
          </button>
        ))}
        <div className="w-px h-4 bg-keshizumi mx-1" />
        {forkButton}
      </nav>

      {/* Right: Mobile — just bookmark icon */}
      <div className="flex md:hidden items-center">
        <button
          type="button"
          onClick={() => onTabChange("saved")}
          className="relative inline-flex items-center justify-center text-sunezumi hover:text-shironeri transition-colors duration-150"
          style={{ width: 44, height: 44 }}
          aria-label="Saved"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 2h10v13l-5-3-5 3V2z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={starredCount > 0 ? "var(--yamabuki)" : "none"}
            />
          </svg>
          {starredCount > 0 && (
            <span
              className="absolute top-1 right-1 font-mono text-[8px] rounded-[1px] px-[3px] py-[0.5px]"
              style={{ background: "var(--yamabuki)", color: "var(--ro)" }}
            >
              {starredCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
