import type React from "react";
import { Button } from "@/components/ui/button";
import styles from "./NavigationTabs.module.css";

interface NavigationTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NAVIGATION_TABS = ["ACTIVITIES", "RESOURCES", "PROJECTS"] as const;

export const NavigationTabs = ({
  activeTab,
  onTabChange,
}: NavigationTabsProps) => (
  <div className={styles.container}>
    <div className={styles.tabContainer}>
      {NAVIGATION_TABS.map((tab) => (
        <Button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`${styles.tab} ${
            activeTab === tab ? styles.tabActive : styles.tabInactive
          }`}
        >
          <span className={styles.tabText}>{tab}</span>
        </Button>
      ))}
    </div>
  </div>
);
