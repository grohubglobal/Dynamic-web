"use client";

import type React from "react";
import { useState } from "react";
import { useProfileData, useFormData, useSettings } from "./utils/hooks";
import { generateShareText } from "./utils/utils";
import { ProfileSection } from "./modules/ProfileSection/ProfileSection";
import { NavigationTabs } from "./modules/NavigationTabs/NavigationTabs";
import { TabContent } from "./modules/TabContent/TabContent";
import { Edit } from "./modules/Edit/Edit";
import { Share } from "./modules/Share/Share";
import { Settings } from "./modules/Settings/Settings";

const UPLOAD_DELAY = 1500;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ACTIVITIES");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { profileData, setProfileData } = useProfileData();
  const { settings, handleSettingsChange } = useSettings();
  const {
    formData,
    setFormData,
    formErrors,
    socialVerification,
    newSkill,
    setNewSkill,
    validateForm,
    handleInputChange,
  } = useFormData(profileData);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, UPLOAD_DELAY));
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !formData.skills.includes(trimmedSkill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSaveProfile = () => {
    if (!validateForm()) return;

    setProfileData(formData);
    setIsEditModalOpen(false);
    alert("Profile updated successfully!");
  };

  const handleCancelEdit = () => {
    setFormData(profileData);
    setIsEditModalOpen(false);
  };

  const handleSaveSettings = () => {
    setIsSettingsModalOpen(false);
    alert("Settings saved successfully!");
  };

  const handleDeleteAccount = () => {
    const isConfirmed = confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (isConfirmed) {
      alert(
        "Account deletion initiated. You will receive a confirmation email."
      );
    }
  };

  const handleDataDownload = () => {
    alert(
      "Your data export has been initiated. You will receive a download link via email."
    );
  };

  const handleShare = (platform: string) => {
    const shareText = generateShareText(profileData);
    const shareUrl = window.location.href;

    const shareActions = {
      copy: () => {
        navigator.clipboard.writeText(shareText);
        alert("Profile information copied to clipboard!");
      },
      twitter: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}&url=${encodeURIComponent(shareUrl)}`;
        window.open(twitterUrl, "_blank");
      },
      facebook: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(facebookUrl, "_blank");
      },
      linkedin: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        window.open(linkedinUrl, "_blank");
      },
    };

    const action = shareActions[platform as keyof typeof shareActions];
    if (action) action();
  };

  return (
    <div
      className="min-h-screen text-white transition-all duration-300"
      style={{
        background: "linear-gradient(135deg, #4D0E98 31%, #190532 100%)",
      }}
    >
      <ProfileSection
        profileData={profileData}
        onEditClick={() => setIsEditModalOpen(true)}
        onShareClick={() => setIsShareModalOpen(true)}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
      />

      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <TabContent activeTab={activeTab} />

      <Edit
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        formErrors={formErrors}
        socialVerification={socialVerification}
        newSkill={newSkill}
        isUploading={isUploading}
        onInputChange={handleInputChange}
        onSave={handleSaveProfile}
        onCancel={handleCancelEdit}
        onImageUpload={handleImageUpload}
        onAddSkill={handleAddSkill}
        onRemoveSkill={handleRemoveSkill}
        setNewSkill={setNewSkill}
        setFormData={setFormData}
        setIsUploading={setIsUploading}
      />

      <Share
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profileData={profileData}
        onShare={handleShare}
      />

      <Settings
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
        onSave={handleSaveSettings}
        onDeleteAccount={handleDeleteAccount}
        onDataDownload={handleDataDownload}
      />
    </div>
  );
}
