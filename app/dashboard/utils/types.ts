export interface ProfileData {
  name: string;
  designation: string;
  profileImage: string;
  bio: string;
  skills: string[];
  socialLinks: {
    linkedin: string;
    instagram: string;
    email: string;
    github: string;
  };
}

export interface FormErrors {
  name?: string;
  designation?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
}

export interface SocialVerification {
  linkedin: boolean | null;
  instagram: boolean | null;
  github: boolean | null;
}

export interface SettingsData {
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showSocialLinks: boolean;
    allowMessaging: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    profileViews: boolean;
    newConnections: boolean;
    weeklyDigest: boolean;
  };
  appearance: {
    theme: string;
    language: string;
    colorScheme: string;
  };
  account: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
    dataDownload: boolean;
  };
}
