"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Splash from "@/components/splash";
import Nav from "@/components/nav";
import BottomTabs from "@/components/bottom-tabs";
import PlanningView from "@/components/planning-view";
import SavedView from "@/components/saved-view";
import ForkModal, {
  ForkDesktopTrigger,
  ForkMobileTrigger,
} from "@/components/fork-modal";
import { useStarred } from "@/lib/use-starred";

const MapView = dynamic(() => import("@/components/map-view"), { ssr: false });

export default function Home() {
  const [tab, setTab] = useState("map");
  const [splashDone, setSplashDone] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [minTime, setMinTime] = useState(false);
  const firedRef = useRef(false);

  const { starred, toggle, isStarred, shareUrl, count } = useStarred();

  /* 1.5s minimum splash */
  useEffect(() => {
    const t = setTimeout(() => setMinTime(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const ready = mapReady && minTime;

  const onMapReady = useCallback(() => {
    if (!firedRef.current) {
      firedRef.current = true;
      setMapReady(true);
    }
  }, []);

  return (
    <ForkModal>
      <div className="min-h-screen bg-ro">
        {/* Splash */}
        {!splashDone && (
          <Splash isReady={ready} onDone={() => setSplashDone(true)} />
        )}

        {/* Main UI */}
        <div
          style={{
            opacity: splashDone ? 1 : 0,
            transition: "opacity 200ms ease 100ms",
          }}
        >
          <Nav
            activeTab={tab}
            onTabChange={setTab}
            starredCount={count}
            forkButton={<ForkDesktopTrigger />}
          />

          <main
            className="md:max-w-[760px] md:mx-auto"
            style={{
              paddingBottom:
                "calc(52px + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {tab === "map" && (
              <div
                className="md:px-[20px] md:pt-4"
                style={{
                  height:
                    "calc(100vh - 46px - env(safe-area-inset-bottom, 0px))",
                }}
              >
                <div className="h-full md:h-auto">
                  <MapView
                    isStarred={isStarred}
                    onToggleStar={toggle}
                    onMapReady={onMapReady}
                  />
                </div>
              </div>
            )}

            {tab === "planning" && <PlanningView />}

            {tab === "saved" && (
              <SavedView
                starred={starred}
                isStarred={isStarred}
                onToggleStar={toggle}
                shareUrl={shareUrl}
              />
            )}
          </main>

          <BottomTabs
            activeTab={tab}
            onTabChange={setTab}
            forkTrigger={<ForkMobileTrigger />}
          />
        </div>
      </div>
    </ForkModal>
  );
}
