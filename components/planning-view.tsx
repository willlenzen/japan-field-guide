"use client";

import { useState } from "react";
import FlagCanvas from "@/components/flag-canvas";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useChecklist } from "@/lib/use-checklist";

/* ─── Reusable sub-components ─── */

function Section({
  icon,
  title,
  children,
  defaultOpen = true,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full flex items-center gap-2 py-3 group cursor-pointer">
        <span className="text-[15px]">{icon}</span>
        <span className="font-sans text-[15px] font-semibold text-shironeri tracking-[-0.03em] flex-1 text-left">
          {title}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="text-sunezumi transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </CollapsibleTrigger>
      <div
        className="border-t border-dashed"
        style={{ borderColor: "var(--keshizumi)" }}
      />
      <CollapsibleContent className="pt-3 pb-4">{children}</CollapsibleContent>
    </Collapsible>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-1.5 items-baseline">
      <span
        className="font-mono text-[10px] text-kurenai uppercase tracking-[.08em] shrink-0"
        style={{ minWidth: 72 }}
      >
        {label}
      </span>
      <span className="font-sans text-[13px] text-ginnezumi leading-[1.5]">
        {children}
      </span>
    </div>
  );
}

function Callout({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="font-sans text-[12px] text-ginnezumi leading-[1.5] my-3"
      style={{
        background: accent ? "var(--kurenai-glow)" : "var(--aisumicha)",
        borderLeft: `2px solid ${accent ? "var(--kurenai)" : "var(--keshizumi)"}`,
        padding: "8px 10px",
        borderRadius: "1px",
      }}
    >
      {children}
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 mb-2">
      <span className="font-mono text-[10px] text-sunezumi uppercase tracking-[.08em]">
        {children}
      </span>
    </div>
  );
}

/* ─── Checklist items ─── */

const CHECKLIST = [
  "Melatonin (3 mg)",
  "Eye mask + noise-canceling headphones",
  "Empty water bottle",
  "Neck pillow",
  "GF plane snacks (call United + backup)",
  "Phone charger + portable battery",
  "Passport",
  "GF translation card (Legal Nomads \u2014 print)",
  "Small bottle of tamari",
];

/* ─── Main component ─── */

export default function PlanningView() {
  const { isChecked, toggle } = useChecklist();

  return (
    <div className="max-w-[760px] mx-auto px-[14px] md:px-[20px] pb-24 md:pb-8">
      {/* ══ Hero ══ */}
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="block md:hidden">
          <FlagCanvas width={280} height={190} />
        </div>
        <div className="hidden md:block">
          <FlagCanvas width={340} height={230} />
        </div>
        <h1
          className="font-sans font-bold text-shironeri tracking-[-0.03em] mt-6"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2.25rem)" }}
        >
          Japan Field Guide
        </h1>
        <p className="font-mono text-[13px] text-sunezumi mt-2">
          東京 · February 12\u201320, 2026 · $1,000 budget
        </p>
        <div
          className="w-full max-w-[200px] h-px mt-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--keshizumi), transparent)",
          }}
        />
      </div>

      {/* ══ Sections ══ */}
      <div className="space-y-2">
        {/* ── Trip Overview ── */}
        <Section icon="🧭" title="Trip Overview">
          <Row label="OUTBOUND">
            UA 131 · EWR 9:40 AM Feb 12 → HND 2:20 PM Feb 13
          </Row>
          <Row label="RETURN">
            UA 130 · HND 6:25 PM Feb 20 → EWR ~5:20 PM Feb 20
          </Row>
          <Row label="HOTEL">10-16 Maruyamachō, Shibuya</Row>
          <Row label="CONFERENCE">
            Tokyo Design Forum · Feb 16\u201318 · Trunk Hotel, Cat Street
          </Row>
          <Row label="BUDGET">$1,000 total in Japan</Row>

          <Sub>Suggested Itinerary</Sub>
          <div className="space-y-1.5">
            {(
              [
                ["Feb 13 Thu PM", "Settle in. Walk Maruyamachō. Dinner by 6:30. Early bed."],
                ["Feb 14 Fri", "Kamakura \u2014 temples, walking pace, budget-friendly."],
                ["Feb 15 Sat", "Kawagoe morning + Yanaka/Jimbocho afternoon"],
                ["Feb 16\u201318", "Conference. Evenings: Shimokitazawa, Daikanyama, jazz kissa"],
                ["Feb 19 Thu", "Flexible Tokyo \u2014 Kagurazaka, revisit favorites"],
                ["Feb 20 Fri", "Morning shopping, Haneda by ~3:30 PM"],
              ] as const
            ).map(([d, t]) => (
              <div key={d} className="flex gap-2 items-baseline">
                <span className="font-sans text-[13px] font-semibold text-shironezumi shrink-0">
                  {d}
                </span>
                <span className="font-sans text-[13px] text-ginnezumi">
                  \u2014 {t}
                </span>
              </div>
            ))}
          </div>

          <Callout accent>
            A single temple visited with attention is worth more than five
            photographed on the run.
          </Callout>
        </Section>

        {/* ── Jet Lag Plan ── */}
        <Section icon="⏱" title="Jet Lag Plan">
          <Callout>
            14 time zones east. At landing (2:20 PM Tokyo), your body thinks
            it&apos;s 12:20 AM.
          </Callout>

          <Row label="FEB 10">
            Wake 1.5 hrs early. Sunlight. Caffeine cutoff 1 PM. Melatonin 8 PM.
            Bed 9 PM.
          </Row>
          <Row label="FEB 11">
            Wake 3 hrs early. Big breakfast. Caffeine cutoff 11 AM. Dinner 5 PM.
            Melatonin 7 PM. Bed 8 PM.
          </Row>
          <Row label="FEB 12">
            Wake 4 AM. Leave Stamford ~6 AM. EWR Terminal C.
          </Row>
          <Row label="PLANE">
            Sleep first 5\u20136 hrs (mask, headphones, skip meal). Wake ~5:30 AM
            JST. Eat. Stay awake.
          </Row>
          <Row label="FEB 13">
            Shower. Outside by 5 PM. Dinner 6:30. Melatonin 9 PM. Bed 10 PM.
          </Row>
          <Row label="FEB 14">
            7 AM alarm. Morning sun. Wall at 2\u20133 PM \u2014 don&apos;t nap.
            Bed 10 PM.
          </Row>

          <Sub>Rules</Sub>
          <div className="space-y-1.5">
            <p className="font-sans text-[13px] text-ginnezumi">
              <strong className="text-shironezumi">Hydration:</strong> 500 ml / 2
              hrs on flight. No alcohol.
            </p>
            <p className="font-sans text-[13px] text-ginnezumi">
              <strong className="text-shironezumi">Melatonin:</strong> 3 mg,
              30\u201345 min before bed. First 3 nights 9 PM JST, then stop.
            </p>
            <p className="font-sans text-[13px] text-ginnezumi">
              <strong className="text-shironezumi">Light:</strong> Morning sun by
              7 AM. Dim screens after 8 PM first 2 nights.
            </p>
            <p className="font-sans text-[13px] text-ginnezumi">
              <strong className="text-shironezumi">Don&apos;t:</strong> Nap at 4
              PM. Stay up past midnight. Caffeine past noon JST.
            </p>
          </div>
        </Section>

        {/* ── Day Trips ── */}
        <Section icon="🚃" title="Day Trips">
          <div className="space-y-3">
            <Card
              className="bg-sumi border-keshizumi p-0 overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <div style={{ borderLeft: "2px solid var(--yamabuki)" }} className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-[14px] font-semibold text-shironeri">
                    Kamakura
                  </span>
                  <span className="font-sans text-[14px] opacity-45">鎌倉</span>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] tracking-[.06em] uppercase px-[6px] py-0 h-[18px] rounded-[1px]"
                    style={{
                      borderColor: "var(--yamabuki)",
                      color: "var(--yamabuki)",
                      background: "transparent",
                    }}
                  >
                    Recommended
                  </Badge>
                </div>
                <p className="font-mono text-[11px] text-sunezumi mb-2">
                  ~1 hr · JR Yokosuka · ~¥920 each way · $27\u201333 total
                </p>
                <p className="font-sans text-[13px] text-ginnezumi leading-[1.5] mb-2">
                  First samurai capital (1185\u20131333). 65+ temples. February:
                  off-season quiet.
                </p>
                <Callout>
                  Kita-Kamakura → Engakuji → Kencho-ji → Hachimangu → Hokokuji
                  (bamboo) → Hasedera → Great Buddha → train back.
                </Callout>
              </div>
            </Card>

            <Card
              className="bg-sumi border-keshizumi p-0 overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              <div style={{ borderLeft: "2px solid var(--kuchiba)" }} className="p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-[14px] font-semibold text-shironeri">
                    Kawagoe
                  </span>
                  <span className="font-sans text-[14px] opacity-45">川越</span>
                </div>
                <p className="font-mono text-[11px] text-sunezumi mb-2">
                  ~45 min · Tokyu direct · ~¥500 each way · $15\u201317
                </p>
                <p className="font-sans text-[13px] text-ginnezumi leading-[1.5]">
                  &apos;Little Edo.&apos; Merchant warehouses, 1600s bell tower,
                  candy street, sake vending machines.
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* ── Celiac Quick Ref ── */}
        <Section icon="🍽" title="Celiac Quick Ref">
          <Callout accent>
            Soy sauce = wheat. Carry Legal Nomads card + tamari.
          </Callout>

          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <span className="font-mono text-[10px] text-wakatake uppercase tracking-[.08em] block mb-2">
                Safe
              </span>
              <ul className="space-y-1">
                {[
                  "Rice",
                  "Sashimi (no soy)",
                  "Onigiri (check)",
                  "Shio-yaki",
                  "Edamame",
                  "Tofu",
                  "Mochi",
                  "Tamago",
                ].map((i) => (
                  <li key={i} className="font-sans text-[12px] text-ginnezumi">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-mono text-[10px] text-kurenai uppercase tracking-[.08em] block mb-2">
                Not Safe
              </span>
              <ul className="space-y-1">
                {[
                  "Tempura",
                  "Soba (usually wheat)",
                  "Imitation crab",
                  "Curry roux",
                  "Gyoza",
                  "Tonkatsu",
                  'Anything with "sauce"',
                ].map((i) => (
                  <li key={i} className="font-sans text-[12px] text-ginnezumi">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Sub>Key Phrases</Sub>
          <div className="space-y-3 mt-2">
            {(
              [
                ["小麦アレルギーがあります", "I have a wheat allergy"],
                ["グルテンフリーですか？", "Is this gluten-free?"],
                ["醤油は使っていますか？", "Contains soy sauce?"],
                ["塩だけで焼いてもらえますか？", "Grill with salt only?"],
              ] as const
            ).map(([jp, en]) => (
              <div key={jp}>
                <p className="font-sans text-[14px] text-shironeri">{jp}</p>
                <p className="font-sans text-[11px] text-sunezumi mt-0.5">
                  {en}
                </p>
              </div>
            ))}
          </div>

          <Sub>Daily Budget</Sub>
          <div className="mt-2">
            {(
              [
                ["Breakfast (konbini)", "~¥400"],
                ["Lunch", "~¥1,000\u20131,500"],
                ["Dinner", "~¥1,500\u20132,500"],
                ["Jazz kissa", "~¥1,000\u20131,500"],
              ] as const
            ).map(([item, cost]) => (
              <div
                key={item}
                className="flex justify-between py-1.5 border-b border-dashed"
                style={{ borderColor: "var(--keshizumi)" }}
              >
                <span className="font-mono text-[11px] text-ginnezumi">
                  {item}
                </span>
                <span className="font-mono text-[11px] text-ginnezumi">
                  {cost}
                </span>
              </div>
            ))}
            <div className="flex justify-between py-1.5">
              <span className="font-mono text-[11px] font-semibold text-shironeri">
                7-day total
              </span>
              <span className="font-mono text-[11px] font-semibold text-kurenai">
                $190\u2013280
              </span>
            </div>
          </div>
        </Section>

        {/* ── Temple & Shrine Etiquette ── */}
        <Section icon="⛩" title="Temple & Shrine Etiquette">
          <div className="space-y-3">
            <div>
              <span className="font-sans text-[13px] font-semibold text-shironezumi">
                Shrines:
              </span>
              <p className="font-sans text-[13px] text-ginnezumi leading-[1.5] mt-0.5">
                Bow at torii. Temizu: left, right, rinse mouth. Coin (¥5), bow
                2×, clap 2×, bow 1×.
              </p>
            </div>
            <div>
              <span className="font-sans text-[13px] font-semibold text-shironezumi">
                Temples:
              </span>
              <p className="font-sans text-[13px] text-ginnezumi leading-[1.5] mt-0.5">
                Bow at gate. Incense, waft smoke. Bow, coin, palms together, bow.
              </p>
            </div>
          </div>
          <Callout>
            February: 3\u201310°C. Coat, scarf, gloves. Cold keeps crowds thin.
          </Callout>
        </Section>

        {/* ── Budget ── */}
        <Section icon="💰" title="Budget">
          <Row label="FOOD">$190\u2013280 (7 days)</Row>
          <Row label="TRANSPORT">$60\u201380 (no Kyoto)</Row>
          <Row label="SHOPPING">$320\u2013900 (watch + art are variables)</Row>
          <div
            className="flex gap-3 py-1.5 items-baseline border-t border-dashed mt-1 pt-2"
            style={{ borderColor: "var(--keshizumi)" }}
          >
            <span
              className="font-mono text-[10px] text-kurenai uppercase tracking-[.08em] shrink-0 font-bold"
              style={{ minWidth: 72 }}
            >
              TOTAL
            </span>
            <span className="font-sans text-[13px] text-kurenai font-bold">
              $570\u20131,430
            </span>
          </div>
        </Section>

        {/* ── Pre-Flight Checklist ── */}
        <Section icon="✅" title="Pre-Flight Checklist">
          <div className="space-y-0">
            {CHECKLIST.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 py-2 cursor-pointer"
                style={{ minHeight: 44 }}
              >
                <Checkbox
                  checked={isChecked(item)}
                  onCheckedChange={() => toggle(item)}
                />
                <span
                  className={`font-sans text-[13px] transition-colors duration-150 ${
                    isChecked(item)
                      ? "text-sunezumi line-through"
                      : "text-ginnezumi"
                  }`}
                >
                  {item}
                </span>
              </label>
            ))}
          </div>
        </Section>
      </div>

      {/* ══ Footer ══ */}
      <div className="text-center mt-12 mb-8">
        <p className="font-sans text-[12px] italic text-sunezumi">
          Japan rewards slowness.
        </p>
        <p className="font-mono text-[10px] text-sunezumi opacity-35 mt-2">
          Built with Claude · Designed to be forked
        </p>
      </div>
    </div>
  );
}
