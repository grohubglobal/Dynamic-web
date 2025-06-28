"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Instagram, Mail, Github, Edit3, Share2, Settings } from "lucide-react"
import type { ProfileData } from "../utils/types"
import Image from "next/image"
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity"

interface ProfileSectionProps {
  profileData: ProfileData
  onEditClick: () => void
  onShareClick: () => void
  onSettingsClick: () => void
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
    className: "bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
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
]

const ACTION_BUTTONS = [
  { label: "EDIT", icon: Edit3, action: "onEditClick" as const },
  { label: "SHARE", icon: Share2, action: "onShareClick" as const },
  { label: "SETTINGS", icon: Settings, action: "onSettingsClick" as const },
]

export const ProfileSection = ({ profileData, onEditClick, onShareClick, onSettingsClick }: ProfileSectionProps) => {
  const actionHandlers = { onEditClick, onShareClick, onSettingsClick }
  const skillsText = profileData.skills.map((skill) => skill.trim()).join("\u00A0   •   \u00A0") + "\u00A0   •   "

  return (
    <div className="relative">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#2B0A75] via-[#4B1F9B] to-[#601EF2] pt-8 pb-16 px-4 shadow-lg">
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-4">
            <Image
              src="/grohub-logo.png"
              width={160}
              height={160}
              alt="Grohub Logo"
              className="w-40 h-40 sm:w-36 sm:h-32 drop-shadow-lg"
            />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Grohub.</h1>
          </div>
        </div>
      </div>

      {/* Profile Card - Overlapping the header */}
      <div className="relative -mt-8 mx-4 mb-8">
        <Card className="text-white font-medium bg-gradient-to-b from-[#b980ff] to-[#d189f8] shadow-xl border border-white/10 w-full px-4 py-2 sm:px-6 sm:py-3">


          <CardContent className="p-6 sm:p-8 bg-transparent opacity-100">
            <div className="flex flex-col lg:flex-row items-start justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Info Section */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 flex-1">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg flex-shrink-0">
                  {profileData.profileImage ? (
                    <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt={profileData.name} />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-[#2B0A75] to-[#601EF2] text-white text-2xl sm:text-3xl">
                      👤
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{profileData.name}</h2>
                  <p className="text-lg sm:text-xl text-gray-600 mb-4">{profileData.designation}</p>

                  {/* Social Links */}
                  <div className="flex justify-center sm:justify-start space-x-3">
                    {SOCIAL_LINKS.map(({ key, icon: Icon, href, className }) => (
                      <a
                        key={key}
                        href={href(profileData)}
                        target={key !== "email" ? "_blank" : undefined}
                        rel={key !== "email" ? "noopener noreferrer" : undefined}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg ${className}`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="flex flex-row lg:flex-col justify-center lg:justify-start space-x-3 sm:space-x-4 lg:space-x-0 lg:space-y-3 w-full lg:w-auto">
                {ACTION_BUTTONS.map(({ label, icon: Icon, action }) => (
                  <button
                    key={label}
                    onClick={actionHandlers[action]}
                    className="group flex items-center justify-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
                 bg-gradient-to-r from-[#6a11cb] to-[#2575fc] hover:from-[#5b0eae] hover:to-[#1a6cff]
                 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg border border-white/20"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <span className="text-sm sm:text-base font-semibold text-white">{label}</span>
                  </button>
                ))}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Scrolling Section */}
      <div className="px-4 pb-8">
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
  )
}
