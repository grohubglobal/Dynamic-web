import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Linkedin,
  Instagram,
  Mail,
  Github,
  Edit3,
  Share2,
  Settings,
} from "lucide-react";
import { ProfileData } from "../utils/types";
import Image from "next/image";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";

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

  const skillsText = profileData.skills.map((skill) => ` ${skill} •`).join(" ");

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-[#2B0A75] via-[#4B1F9B] to-[#601EF2] py-8 px-4 shadow-lg">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/grohub-logo.png"
              width={160}
              height={160}
              alt="Grohub Logo"
              className="w-40 h-40 sm:w-36 sm:h-32 drop-shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Grohub.
            </h1>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 bg-black border-4 border-white flex-shrink-0">
                {profileData.profileImage ? (
                  <AvatarImage
                    src={profileData.profileImage}
                    alt={profileData.name}
                  />
                ) : (
                  <AvatarFallback className="bg-black text-white text-xl sm:text-2xl">
                    👤
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {profileData.name}
                </h2>
                <p className="text-base sm:text-lg text-white/80">
                  {profileData.designation}
                </p>

                <div className="flex justify-center sm:justify-start space-x-3 mt-4">
                  {SOCIAL_LINKS.map(({ key, icon: Icon, href, className }) => (
                    <a
                      key={key}
                      href={href(profileData)}
                      target={key !== "email" ? "_blank" : undefined}
                      rel={key !== "email" ? "noopener noreferrer" : undefined}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-colors shadow-lg ${className}`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-row lg:flex-col justify-center lg:justify-start space-x-6 lg:space-x-0 lg:space-y-4 w-full lg:w-auto">
              {ACTION_BUTTONS.map(({ label, icon: Icon, action }) => (
                <button
                  key={label}
                  onClick={actionHandlers[action]}
                  className="flex items-center space-x-2 hover:opacity-80 transition-colors text-white/80 hover:text-white"
                >
                  <span className="text-sm sm:text-lg font-bold">{label}</span>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden">
            <VelocityScroll
              defaultVelocity={1}
              className="text-white font-medium velocity-text bg-white/10 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/30 shadow-lg w-full"
              numRows={1}
            >
              {skillsText}
            </VelocityScroll>
          </div>
        </div>
      </div>
    </div>
  );
};
