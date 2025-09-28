import { useState } from "react";
import {
  ProfileData,
  FormErrors,
  SocialVerification,
  SettingsData,
} from "./types";
import {
  validateEmail,
  validateLinkedIn,
  validateInstagram,
  validateGitHub,
} from "./utils";

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "NAME",
    designation: "Designation",
    profileImage: "",
    bio: "Welcome to my profile! I'm passionate about technology and innovation.",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "UI/UX Design",
      "Machine Learning",
      "Cloud Computing",
      "DevOps",
    ],
    socialLinks: {
      linkedin: "",
      instagram: "",
      email: "",
      github: "",
    },
  });

  return { profileData, setProfileData };
};

export const useFormData = (profileData: ProfileData) => {
  const [formData, setFormData] = useState<ProfileData>(profileData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [socialVerification, setSocialVerification] =
    useState<SocialVerification>({
      linkedin: null,
      instagram: null,
      github: null,
    });
  const [newSkill, setNewSkill] = useState("");

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!formData.designation.trim()) {
      errors.designation = "Designation is required";
    }

    if (
      formData.socialLinks.email &&
      !validateEmail(formData.socialLinks.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (
      formData.socialLinks.linkedin &&
      !validateLinkedIn(formData.socialLinks.linkedin)
    ) {
      errors.linkedin = "Please enter a valid LinkedIn profile URL";
    }

    if (
      formData.socialLinks.instagram &&
      !validateInstagram(formData.socialLinks.instagram)
    ) {
      errors.instagram = "Please enter a valid Instagram profile URL";
    }

    if (
      formData.socialLinks.github &&
      !validateGitHub(formData.socialLinks.github)
    ) {
      errors.github = "Please enter a valid GitHub profile URL";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const verifySocialMedia = async (platform: string, url: string) => {
    if (!url) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let isValid = false;
      switch (platform) {
        case "linkedin":
          isValid = validateLinkedIn(url);
          break;
        case "instagram":
          isValid = validateInstagram(url);
          break;
        case "github":
          isValid = validateGitHub(url);
          break;
      }

      setSocialVerification((prev) => ({
        ...prev,
        [platform]: isValid,
      }));
    } catch (error) {
      setSocialVerification((prev) => ({
        ...prev,
        [platform]: false,
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("social.")) {
      const socialField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }));

      if (socialField !== "email") {
        setSocialVerification((prev) => ({
          ...prev,
          [socialField]: null,
        }));

        if (value.trim()) {
          verifySocialMedia(socialField, value);
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    socialVerification,
    setSocialVerification,
    newSkill,
    setNewSkill,
    validateForm,
    handleInputChange,
  };
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsData>({
    privacy: {
      profileVisibility: "public",
      showEmail: true,
      showSocialLinks: true,
      allowMessaging: true,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      profileViews: false,
      newConnections: true,
      weeklyDigest: true,
    },
    appearance: {
      theme: "dark",
      language: "english",
      colorScheme: "purple",
    },
    account: {
      twoFactorAuth: false,
      loginAlerts: true,
      dataDownload: false,
    },
  });

  const handleSettingsChange = (
    category: keyof SettingsData,
    field: string,
    value: any
  ) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return { settings, setSettings, handleSettingsChange };
};
