"use client";

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  forkTrigger: React.ReactNode;
}

const tabDefs = [
  {
    id: "map",
    label: "Map",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M3 5l5-2 4 2 5-2v12l-5 2-4-2-5 2V5z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M8 3v12M12 5v12" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "planning",
    label: "Planning",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect
          x="3"
          y="3"
          width="14"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path d="M6 7h8M6 10h6M6 13h4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: "saved",
    label: "Saved",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 3h10v14l-5-3-5 3V3z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
];

export default function BottomTabs({
  activeTab,
  onTabChange,
  forkTrigger,
}: BottomTabsProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-keshizumi"
      style={{
        background: "rgba(12, 12, 12, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        height: "calc(52px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {tabDefs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors duration-150"
            style={{
              color: isActive ? "var(--kurenai)" : "var(--sunezumi)",
              minHeight: 52,
            }}
          >
            {tab.icon}
            <span className="font-mono text-[9px] tracking-[.06em] uppercase">
              {tab.label}
            </span>
          </button>
        );
      })}
      {/* Fork tab — renders DialogTrigger from parent */}
      {forkTrigger}
    </nav>
  );
}
