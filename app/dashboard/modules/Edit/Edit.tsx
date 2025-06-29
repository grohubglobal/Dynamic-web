import type React from "react";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Upload,
  Check,
  X,
  Plus,
  Minus,
  Linkedin,
  Instagram,
  Mail,
  Github,
} from "lucide-react";
import { ProfileData, FormErrors, SocialVerification } from "../../utils/types";
import styles from "./Edit.module.css";
import Image from "next/image";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: ProfileData;
  formErrors: FormErrors;
  socialVerification: SocialVerification;
  newSkill: string;
  isUploading: boolean;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
  setNewSkill: (skill: string) => void;
  setFormData: (data: any) => void;
  setIsUploading: (uploading: boolean) => void;
}

export const Edit = ({
  isOpen,
  onClose,
  formData,
  formErrors,
  socialVerification,
  newSkill,
  isUploading,
  onInputChange,
  onSave,
  onCancel,
  onImageUpload,
  onAddSkill,
  onRemoveSkill,
  setNewSkill,
  setFormData,
}: EditModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: "" }));
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddSkill();
    }
  };

  const renderVerificationIcon = (status: boolean | null) => {
    if (status === true)
      return <Check className={styles.verificationIconGreen} />;
    if (status === false) return <X className={styles.verificationIconRed} />;
    return null;
  };

  const renderFormField = (
    id: string,
    label: string,
    value: string,
    placeholder: string,
    error?: string,
    type: string = "text"
  ) => (
    <div className={styles.formField}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onInputChange(id, e.target.value)}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && (
        <div className={styles.alert}>
          <X className={styles.alertIcon} />
          <p className={styles.alertText}>{error}</p>
        </div>
      )}
    </div>
  );

  const renderSocialField = (
    platform: string,
    icon: React.ReactNode,
    label: string,
    placeholder: string,
    value: string,
    error?: string
  ) => (
    <div className={styles.formField}>
      <label htmlFor={platform} className={styles.label}>
        <span className={styles.labelContent}>
          {icon}
          <span className={styles.labelText}>{label}</span>
          {renderVerificationIcon(
            socialVerification[platform as keyof SocialVerification]
          )}
        </span>
      </label>
      <input
        id={platform}
        value={value}
        onChange={(e) => onInputChange(`social.${platform}`, e.target.value)}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && (
        <div className={styles.alert}>
          <X className={styles.alertIcon} />
          <p className={styles.alertText}>{error}</p>
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.modal}>
        <DialogHeader className={styles.header}>
          <DialogTitle className={styles.title}>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Profile Picture</h3>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>
                {formData.profileImage ? (
                  <Image
                    src={formData.profileImage}
                    alt="Profile"
                    className={styles.avatarImage}
                  />
                ) : (
                  <span className={styles.avatarPlaceholder}>👤</span>
                )}
              </div>

              <div className={styles.avatarButtons}>
                <button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className={`${styles.button} ${styles.buttonPrimary}`}
                >
                  {isUploading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className={styles.buttonIcon} />
                      <span className={styles.buttonText}>Upload Photo</span>
                    </>
                  )}
                </button>

                {formData.profileImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className={styles.button}
                  >
                    Remove
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className={styles.hiddenInput}
              />

              <p className={styles.uploadInfo}>
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Basic Information</h3>

            {renderFormField(
              "name",
              "Name *",
              formData.name,
              "Enter your name",
              formErrors.name
            )}
            {renderFormField(
              "designation",
              "Designation *",
              formData.designation,
              "Enter your designation",
              formErrors.designation
            )}

            <div className={styles.formField}>
              <label htmlFor="bio" className={styles.label}>
                Bio
              </label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => onInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className={styles.textarea}
              />
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills</h3>
            <div className={styles.skillsContainer}>
              <div className={styles.skillsInputRow}>
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className={`${styles.input} ${styles.skillsInput}`}
                  onKeyPress={handleSkillKeyPress}
                />
                <button
                  onClick={onAddSkill}
                  className={`${styles.button} ${styles.buttonPrimary} ${styles.addButton}`}
                  type="button"
                >
                  <Plus className={styles.buttonIcon} />
                </button>
              </div>

              <div className={styles.skillsList}>
                {formData.skills.map((skill, index) => (
                  <div key={index} className={styles.skillBadge}>
                    <span className={styles.skillText}>{skill}</span>
                    <button
                      onClick={() => onRemoveSkill(skill)}
                      className={styles.skillRemove}
                      type="button"
                    >
                      <Minus className={styles.skillRemoveIcon} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Social Links</h3>

            {renderSocialField(
              "linkedin",
              <Linkedin className={styles.linkedinIcon} />,
              "LinkedIn Profile URL",
              "https://linkedin.com/in/yourprofile",
              formData.socialLinks.linkedin,
              formErrors.linkedin
            )}

            {renderSocialField(
              "instagram",
              <Instagram className={styles.instagramIcon} />,
              "Instagram Profile URL",
              "https://instagram.com/yourprofile",
              formData.socialLinks.instagram,
              formErrors.instagram
            )}

            {renderSocialField(
              "email",
              <Mail className={styles.emailIcon} />,
              "Email Address",
              "your.email@example.com",
              formData.socialLinks.email,
              formErrors.email
            )}

            {renderSocialField(
              "github",
              <Github className={styles.githubIcon} />,
              "GitHub Profile URL",
              "https://github.com/yourprofile",
              formData.socialLinks.github,
              formErrors.github
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              onClick={onSave}
              className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
            >
              Save Changes
            </button>
            <button
              onClick={onCancel}
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
