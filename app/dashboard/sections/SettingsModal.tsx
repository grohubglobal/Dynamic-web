import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Palette, User, Download, Trash2 } from "lucide-react";
import { SettingsData } from "../utils/types";

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

export const SettingsModal = ({
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
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        {icon}
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="bg-[#7E30E1]/10 p-4 rounded-lg space-y-4">{children}</div>
    </div>
  );

  const renderSwitchSetting = (
    category: keyof SettingsData,
    field: string,
    label: string,
    description: string,
    checked: boolean
  ) => (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={(value) => onSettingsChange(category, field, value)}
      />
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
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <Select
        value={value}
        onValueChange={(newValue) =>
          onSettingsChange(category, field, newValue)
        }
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
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
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label
          className={`text-sm font-medium ${
            variant === "destructive" ? "text-red-600" : ""
          }`}
        >
          {label}
        </Label>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <Button onClick={onClick} variant={variant} size="sm">
        {icon && <span className="mr-2">{icon}</span>}
        {buttonText}
      </Button>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {renderSettingGroup(
            <Shield className="w-5 h-5 text-[#7E30E1]" />,
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
              <Separator />
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
            <Bell className="w-5 h-5 text-[#7E30E1]" />,
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
            <Palette className="w-5 h-5 text-[#7E30E1]" />,
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
            <User className="w-5 h-5 text-[#7E30E1]" />,
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
              <Separator />
              {renderButtonSetting(
                "Download Your Data",
                "Export all your profile data",
                "Download",
                onDataDownload,
                "outline",
                <Download className="w-4 h-4" />
              )}
              {renderButtonSetting(
                "Delete Account",
                "Permanently delete your account",
                "Delete",
                onDeleteAccount,
                "destructive",
                <Trash2 className="w-4 h-4" />
              )}
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onSave}
              className="flex-1 bg-[#7E30E1] hover:bg-[#49108B] text-white"
            >
              Save Settings
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
