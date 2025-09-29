import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, Bell, Palette, User, Download, Trash2 } from "lucide-react";
import { SettingsData } from "../../utils/types";
import styles from "./Settings.module.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: SettingsData;
  onSettingsChange: (
    category: keyof SettingsData,
    field: string,
    value: any
  ) => void;
  onSave: () => void;
  onDeleteAccount: () => void;
  onDataDownload: () => void;
}

export const Settings = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
  onSave,
  onDeleteAccount,
  onDataDownload,
}: SettingsModalProps) => {
  const renderSettingGroup = (
    icon: React.ReactNode,
    title: string,
    children: React.ReactNode
  ) => (
    <div className={styles.settingGroup}>
      <div className={styles.groupHeader}>
        <span className={styles.groupIcon}>{icon}</span>
        <h3 className={styles.groupTitle}>{title}</h3>
      </div>
      <div className={styles.groupContent}>{children}</div>
    </div>
  );

  const renderSwitchSetting = (
    category: keyof SettingsData,
    field: string,
    label: string,
    description: string,
    checked: boolean
  ) => (
    <div className={styles.settingItem}>
      <div className={styles.settingLabel}>
        <label className={styles.labelText}>{label}</label>
        <p className={styles.labelDescription}>{description}</p>
      </div>
      <div className={styles.settingControl}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={`${label}: ${checked ? "enabled" : "disabled"}`}
          onClick={() => onSettingsChange(category, field, !checked)}
          className={`${styles.switch} ${checked ? styles.switchChecked : ""}`}
        >
          <span className={styles.switchThumb}></span>
        </button>
      </div>
    </div>
  );

  const renderSelectSetting = (
    category: keyof SettingsData,
    field: string,
    label: string,
    description: string,
    value: string,
    options: Array<{ value: string; label: string }>
  ) => (
    <div className={styles.settingItem}>
      <div className={styles.settingLabel}>
        <label className={styles.labelText}>{label}</label>
        <p className={styles.labelDescription}>{description}</p>
      </div>
      <div className={styles.settingControl}>
        <select
          value={value}
          onChange={(e) => onSettingsChange(category, field, e.target.value)}
          className={styles.select}
          aria-label={label}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderButtonSetting = (
    label: string,
    description: string,
    buttonText: string,
    onClick: () => void,
    variant: "outline" | "destructive" = "outline",
    icon?: React.ReactNode
  ) => (
    <div className={styles.settingItem}>
      <div className={styles.settingLabel}>
        <label
          className={`${styles.labelText} ${
            variant === "destructive" ? styles.destructiveLabel : ""
          }`}
        >
          {label}
        </label>
        <p className={styles.labelDescription}>{description}</p>
      </div>
      <div className={styles.settingControl}>
        <button
          onClick={onClick}
          className={`${styles.button} ${
            variant === "destructive" ? styles.buttonDestructive : ""
          }`}
          aria-label={`${buttonText} - ${description}`}
        >
          {icon && <span className={styles.buttonIcon}>{icon}</span>}
          {buttonText}
        </button>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle className={styles.title}>Settings</DialogTitle>
        </DialogHeader>

        <div className={styles.content}>
          {renderSettingGroup(
            <Shield />,
            "Privacy & Security",
            <>
              {renderSelectSetting(
                "privacy",
                "profileVisibility",
                "Profile Visibility",
                "Control who can see your profile",
                settings.privacy.profileVisibility,
                [
                  { value: "public", label: "Public" },
                  { value: "private", label: "Private" },
                  { value: "connections", label: "Connections Only" },
                ]
              )}
              <div className={styles.separator}></div>
              {renderSwitchSetting(
                "privacy",
                "showEmail",
                "Show Email Address",
                "Display email on your profile",
                settings.privacy.showEmail
              )}
              {renderSwitchSetting(
                "privacy",
                "showSocialLinks",
                "Show Social Links",
                "Display social media links",
                settings.privacy.showSocialLinks
              )}
              {renderSwitchSetting(
                "privacy",
                "allowMessaging",
                "Allow Messaging",
                "Let others send you messages",
                settings.privacy.allowMessaging
              )}
            </>
          )}

          {renderSettingGroup(
            <Bell />,
            "Notifications",
            <>
              {renderSwitchSetting(
                "notifications",
                "emailNotifications",
                "Email Notifications",
                "Receive notifications via email",
                settings.notifications.emailNotifications
              )}
              {renderSwitchSetting(
                "notifications",
                "pushNotifications",
                "Push Notifications",
                "Receive push notifications",
                settings.notifications.pushNotifications
              )}
              {renderSwitchSetting(
                "notifications",
                "profileViews",
                "Profile Views",
                "Notify when someone views your profile",
                settings.notifications.profileViews
              )}
              {renderSwitchSetting(
                "notifications",
                "newConnections",
                "New Connections",
                "Notify about new connection requests",
                settings.notifications.newConnections
              )}
              {renderSwitchSetting(
                "notifications",
                "weeklyDigest",
                "Weekly Digest",
                "Receive weekly activity summary",
                settings.notifications.weeklyDigest
              )}
            </>
          )}

          {renderSettingGroup(
            <Palette />,
            "Appearance",
            <>
              {renderSelectSetting(
                "appearance",
                "theme",
                "Theme",
                "Choose your preferred theme",
                settings.appearance.theme,
                [
                  { value: "light", label: "Light" },
                  { value: "dark", label: "Dark" },
                  { value: "auto", label: "Auto" },
                ]
              )}
              {renderSelectSetting(
                "appearance",
                "language",
                "Language",
                "Select your language",
                settings.appearance.language,
                [
                  { value: "english", label: "English" },
                  { value: "spanish", label: "Spanish" },
                  { value: "french", label: "French" },
                  { value: "german", label: "German" },
                ]
              )}
              {renderSelectSetting(
                "appearance",
                "colorScheme",
                "Color Scheme",
                "Choose your color preference",
                settings.appearance.colorScheme,
                [
                  { value: "purple", label: "Purple" },
                  { value: "blue", label: "Blue" },
                  { value: "green", label: "Green" },
                  { value: "orange", label: "Orange" },
                ]
              )}
            </>
          )}

          {renderSettingGroup(
            <User />,
            "Account",
            <>
              {renderSwitchSetting(
                "account",
                "twoFactorAuth",
                "Two-Factor Authentication",
                "Add extra security to your account",
                settings.account.twoFactorAuth
              )}
              {renderSwitchSetting(
                "account",
                "loginAlerts",
                "Login Alerts",
                "Get notified of new login attempts",
                settings.account.loginAlerts
              )}
              <div className={styles.separator}></div>
              {renderButtonSetting(
                "Download Your Data",
                "Export all your profile data",
                "Download",
                onDataDownload,
                "outline",
                <Download />
              )}
              {renderButtonSetting(
                "Delete Account",
                "Permanently delete your account",
                "Delete",
                onDeleteAccount,
                "destructive",
                <Trash2 />
              )}
            </>
          )}

          <div className={styles.buttonGroup}>
            <button
              onClick={onSave}
              className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
            >
              Save Settings
            </button>
            <button
              onClick={onClose}
              className={`${styles.button} ${styles.buttonFull}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
