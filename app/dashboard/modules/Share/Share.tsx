import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Copy, Twitter, Facebook, Linkedin } from "lucide-react";
import { ProfileData } from "../../utils/types";
import { generateShareText } from "../../utils/utils";
import styles from "./Share.module.css";
import Image from "next/image";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onShare: (platform: string) => void;
}

const SHARE_PLATFORMS = [
  { id: "copy", label: "Copy", icon: Copy },
  { id: "twitter", label: "Twitter", icon: Twitter },
  { id: "facebook", label: "Facebook", icon: Facebook },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
];

export const Share = ({
  isOpen,
  onClose,
  profileData,
  onShare,
}: ShareModalProps) => {
  const shareText = generateShareText(profileData);

  const getButtonClass = (id: string) => {
    const baseClass = styles.shareButton;
    switch (id) {
      case "copy":
        return `${baseClass} ${styles.copyButton}`;
      case "twitter":
        return `${baseClass} ${styles.twitterButton}`;
      case "facebook":
        return `${baseClass} ${styles.facebookButton}`;
      case "linkedin":
        return `${baseClass} ${styles.linkedinButton}`;
      default:
        return baseClass;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle className={styles.title}>Share Profile</DialogTitle>
        </DialogHeader>

        <div className={styles.content}>
          <div className={styles.preview}>
            <div className={styles.profileSection}>
              <div className={styles.avatar}>
                {profileData.profileImage ? (
                  <Image
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className={styles.avatarImage}
                  />
                ) : (
                  "👤"
                )}
              </div>

              <div className={styles.profileInfo}>
                <h3>{profileData.name}</h3>
                <p>{profileData.designation}</p>
              </div>
            </div>
          </div>

          <div className={styles.messageSection}>
            <label className={styles.label}>Share Message</label>
            <textarea
              value={shareText}
              readOnly
              className={styles.textarea}
            />
          </div>

          <div className={styles.shareSection}>
            <label className={styles.label}>Share via</label>
            <div className={styles.buttonGrid}>
              {SHARE_PLATFORMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onShare(id)}
                  className={getButtonClass(id)}
                >
                  <Icon className={styles.buttonIcon} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

