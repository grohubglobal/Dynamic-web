import type React from "react";
import { Button } from "@/components/ui/button";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAVIGATION_TABS = ["ACTIVITIES", "RESOURCES", "PROJECTS"] as const;

export const NavigationTabs = ({
  activeTab,
  onTabChange,
}: NavigationTabsProps) => (
  <div className="px-4 mb-6">
    <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex max-w-full overflow-hidden shadow-lg border border-white/20">
      {NAVIGATION_TABS.map((tab) => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-1 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 ${
            activeTab === tab
              ? "bg-gradient-to-r from-[#2B0A75] via-[#4B1F9B] to-[#601EF2] text-white hover:from-[#1F0555] hover:via-[#3A1A85] hover:to-[#5015D2]"
              : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab}
        </Button>
      ))}
    </div>
  </div>
);
