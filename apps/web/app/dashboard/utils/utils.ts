import { SettingsData }  from "./types";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateLinkedIn = (url: string): boolean => {
  const linkedinRegex =
    /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
  return linkedinRegex.test(url);
};

export const validateInstagram = (url: string): boolean => {
  const instagramRegex =
    /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;
  return instagramRegex.test(url);
};

export const validateGitHub = (url: string): boolean => {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/;
  return githubRegex.test(url);
};


export const generateShareText = (profileData: any) => {
  return `Check out ${profileData.name}'s profile on Grohub!\n\n${
    profileData.designation
  }\n\nConnect with me:\n${
    profileData.socialLinks.linkedin
      ? `LinkedIn: ${profileData.socialLinks.linkedin}\n`
      : ""
  }${
    profileData.socialLinks.github
      ? `GitHub: ${profileData.socialLinks.github}\n`
      : ""
  }${
    profileData.socialLinks.instagram
      ? `Instagram: ${profileData.socialLinks.instagram}\n`
      : ""
  }${
    profileData.socialLinks.email
      ? `Email: ${profileData.socialLinks.email}`
      : ""
  }`;
};
