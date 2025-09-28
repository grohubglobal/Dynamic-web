import type React from "react";
import { Card } from "@/components/ui/card";
import styles from "./TabContent.module.css";

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
    <div className={styles.container}>
      <div className={styles.grid}>
        {Array.from({ length: cardCount }, (_, index) => (
          <Card key={index} className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>DETAILS</h3>
            </div>
            <div className={styles.cardFooter} />
          </Card>
        ))}
      </div>
    </div>
  );
};
<div className="bg-gray-200 rounded-b-3xl h-20"></div>;
