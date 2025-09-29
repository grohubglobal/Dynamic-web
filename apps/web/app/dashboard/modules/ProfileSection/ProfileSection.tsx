"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  Instagram,
  Mail,
  Github,
  Edit3,
  Share2,
  Settings,
} from "lucide-react";
import type { ProfileData } from "../../utils/types";
import Image from "next/image";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import styles from "./ProfileSection.module.css";

interface ProfileSectionProps {
  profileData: ProfileData;
  onEditClick: () => void;
  onShareClick: () => void;
  onSettingsClick: () => void;
}

const SOCIAL_LINKS = [
  {
    key: "linkedin" as const,
    icon: Linkedin,
    href: (data: ProfileData) => data.socialLinks.linkedin || "#",
    className: "bg-blue-600 hover:bg-blue-700",
  },
  {
    key: "instagram" as const,
    icon: Instagram,
    href: (data: ProfileData) => data.socialLinks.instagram || "#",
    className:
      "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
  },
  {
    key: "email" as const,
    icon: Mail,
    href: (data: ProfileData) => `mailto:${data.socialLinks.email}`,
    className: "bg-blue-500 hover:bg-blue-600",
  },
  {
    key: "github" as const,
    icon: Github,
    href: (data: ProfileData) => data.socialLinks.github || "#",
    className: "bg-gray-800 hover:bg-gray-700",
  },
];

const ACTION_BUTTONS = [
  { label: "EDIT", icon: Edit3, action: "onEditClick" as const },
  { label: "SHARE", icon: Share2, action: "onShareClick" as const },
  { label: "SETTINGS", icon: Settings, action: "onSettingsClick" as const },
];

export const ProfileSection = ({
  profileData,
  onEditClick,
  onShareClick,
  onSettingsClick,
}: ProfileSectionProps) => {
  const actionHandlers = { onEditClick, onShareClick, onSettingsClick };
  const skillsText =
    profileData.skills
      .map((skill) => skill.trim())
      .join("\u00A0   •   \u00A0") + "\u00A0   •   ";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Image
              src="/grohub-logo.png"
              width={160}
              height={160}
              alt="Grohub Logo"
              className={styles.logo}
            />
            <h1 className={styles.title}>Grohub.</h1>
          </div>
        </div>
      </div>

      <div className={styles.profileCard}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <div className={styles.mainContent}>
              <div className={styles.profileInfo}>
                <Avatar className={styles.avatar}>
                  {profileData.profileImage ? (
                    <AvatarImage
                      src={profileData.profileImage || "/placeholder.svg"}
                      alt={profileData.name}
                    />
                  ) : (
                    <AvatarFallback className={styles.avatarFallback}>
                      👤
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className={styles.userInfo}>
                  <h2 className={styles.userName}>{profileData.name}</h2>
                  <p className={styles.userDesignation}>
                    {profileData.designation}
                  </p>

                  <div className={styles.socialLinks}>
                    {SOCIAL_LINKS.map(
                      ({ key, icon: Icon, href, className }) => (
                        <a
                          key={key}
                          href={href(profileData)}
                          target={key !== "email" ? "_blank" : undefined}
                          rel={
                            key !== "email" ? "noopener noreferrer" : undefined
                          }
                          className={`${styles.socialLink} ${styles[key]}`}
                        >
                          <Icon className={styles.socialIcon} />
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.actionButtons}>
                {ACTION_BUTTONS.map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={actionHandlers[action]}
                    className={styles.actionButton}
                  >
                    <Icon className={styles.actionIcon} />
                    <span className={styles.actionLabel}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className={styles.skillsSection}>
        <div className={styles.skillsContainer}>
          <VelocityScroll
            defaultVelocity={1}
            className={styles.velocityScroll}
            numRows={1}
          >
            {skillsText}
          </VelocityScroll>
        </div>
      </div>
    </div>
  );
};
