import type React from "react";
import { Card } from "@/components/ui/card";

interface TabContentProps {
  activeTab: string;
}

const TAB_CARD_COUNTS = {
  ACTIVITIES: 4,
  RESOURCES: 6,
  PROJECTS: 2,
} as const;

export const TabContent = ({ activeTab }: TabContentProps) => {
  const cardCount =
    TAB_CARD_COUNTS[activeTab as keyof typeof TAB_CARD_COUNTS] || 4;

  return (
    <div className="px-4 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: cardCount }, (_, index) => (
          <Card
            key={index}
            className="border-none rounded-3xl h-48 flex flex-col overflow-hidden shadow-lg bg-gradient-to-b from-purple-400 to-purple-600"
          >
            <div className="p-4 flex-1">
              <h3 className="text-black font-bold text-lg">DETAILS</h3>
            </div>
            <div className="bg-gray-200 rounded-b-3xl h-20" />
          </Card>
        ))}
      </div>
    </div>
  );
};
<div className="bg-gray-200 rounded-b-3xl h-20"></div>;
