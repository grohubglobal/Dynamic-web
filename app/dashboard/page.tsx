"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Instagram,
  Mail,
  Github,
  Edit3,
  Share2,
  Settings,
  Upload,
  Check,
  X,
  Copy,
  Facebook,
  Twitter,
  Bell,
  Shield,
  Trash2,
  Download,
  User,
  Palette,
  Plus,
  Minus,
} from "lucide-react"

interface ProfileData {
  name: string
  designation: string
  profileImage: string
  bio: string
  skills: string[]
  socialLinks: {
    linkedin: string
    instagram: string
    email: string
    github: string
  }
}

interface FormErrors {
  name?: string
  designation?: string
  email?: string
  linkedin?: string
  instagram?: string
  github?: string
}

interface SocialVerification {
  linkedin: boolean | null
  instagram: boolean | null
  github: boolean | null
}

interface SettingsData {
  privacy: {
    profileVisibility: string
    showEmail: boolean
    showSocialLinks: boolean
    allowMessaging: boolean
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    profileViews: boolean
    newConnections: boolean
    weeklyDigest: boolean
  }
  appearance: {
    theme: string
    language: string
    colorScheme: string
  }
  account: {
    twoFactorAuth: boolean
    loginAlerts: boolean
    dataDownload: boolean
  }
}

export default function Component() {
  const [activeTab, setActiveTab] = useState("ACTIVITIES")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  })

  const [formData, setFormData] = useState<ProfileData>(profileData)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [socialVerification, setSocialVerification] = useState<SocialVerification>({
    linkedin: null,
    instagram: null,
    github: null,
  })

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
  })

  // Theme colors based on settings
  const getThemeColors = () => {
    const isDark = settings.appearance.theme === "dark"
    const isAuto = settings.appearance.theme === "auto"
    const systemDark = isAuto && window.matchMedia("(prefers-color-scheme: dark)").matches
    const darkMode = isDark || systemDark

    if (darkMode) {
      return {
        background: "bg-gradient-to-b from-[#3D1A8B] via-[#5B2FAB] to-[#7040F2]",
        cardBg: "bg-gradient-to-b from-purple-400 to-purple-600",
        cardBottom: "bg-gray-200",
        textPrimary: "text-white",
        textSecondary: "text-white/80",
        buttonBg: "bg-gray-200 text-black hover:bg-gray-300",
        tabBg: "bg-gray-200",
        tabActive: "bg-white text-black",
        tabInactive: "bg-transparent text-black hover:bg-gray-300",
      }
    } else {
      return {
        background: "bg-gradient-to-b from-[#E8E0FF] via-[#F0E8FF] to-[#F8F0FF]",
        cardBg: "bg-white",
        cardBottom: "bg-purple-100",
        textPrimary: "text-gray-900",
        textSecondary: "text-gray-600",
        buttonBg: "bg-[#7E30E1] text-white hover:bg-[#49108B]",
        tabBg: "bg-white/90 backdrop-blur-sm shadow-lg",
        tabActive: "bg-[#7E30E1] text-white",
        tabInactive: "bg-transparent text-[#49108B] hover:bg-purple-50",
      }
    }
  }

  const themeColors = getThemeColors()

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateLinkedIn = (url: string): boolean => {
    const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/
    return linkedinRegex.test(url)
  }

  const validateInstagram = (url: string): boolean => {
    const instagramRegex = /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/
    return instagramRegex.test(url)
  }

  const validateGitHub = (url: string): boolean => {
    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/
    return githubRegex.test(url)
  }

  // Social media verification
  const verifySocialMedia = async (platform: string, url: string) => {
    if (!url) return

    try {
      // Simulate API call for verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let isValid = false
      switch (platform) {
        case "linkedin":
          isValid = validateLinkedIn(url)
          break
        case "instagram":
          isValid = validateInstagram(url)
          break
        case "github":
          isValid = validateGitHub(url)
          break
      }

      setSocialVerification((prev) => ({
        ...prev,
        [platform]: isValid,
      }))
    } catch (error) {
      setSocialVerification((prev) => ({
        ...prev,
        [platform]: false,
      }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("social.")) {
      const socialField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialField]: value,
        },
      }))

      // Clear previous verification and verify new URL
      if (socialField !== "email") {
        setSocialVerification((prev) => ({
          ...prev,
          [socialField]: null,
        }))

        if (value.trim()) {
          verifySocialMedia(socialField, value)
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    // Clear error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const handleSettingsChange = (category: keyof SettingsData, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters"
    }

    // Designation validation
    if (!formData.designation.trim()) {
      errors.designation = "Designation is required"
    }

    // Email validation
    if (formData.socialLinks.email && !validateEmail(formData.socialLinks.email)) {
      errors.email = "Please enter a valid email address"
    }

    // LinkedIn validation
    if (formData.socialLinks.linkedin && !validateLinkedIn(formData.socialLinks.linkedin)) {
      errors.linkedin = "Please enter a valid LinkedIn profile URL"
    }

    // Instagram validation
    if (formData.socialLinks.instagram && !validateInstagram(formData.socialLinks.instagram)) {
      errors.instagram = "Please enter a valid Instagram profile URL"
    }

    // GitHub validation
    if (formData.socialLinks.github && !validateGitHub(formData.socialLinks.github)) {
      errors.github = "Please enter a valid GitHub profile URL"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create object URL for preview
      const imageUrl = URL.createObjectURL(file)
      setFormData((prev) => ({
        ...prev,
        profileImage: imageUrl,
      }))
    } catch (error) {
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleSaveProfile = () => {
    if (!validateForm()) {
      return
    }

    setProfileData(formData)
    setIsEditModalOpen(false)

    // Show success message
    alert("Profile updated successfully!")
  }

  const handleCancelEdit = () => {
    setFormData(profileData)
    setFormErrors({})
    setSocialVerification({
      linkedin: null,
      instagram: null,
      github: null,
    })
    setIsEditModalOpen(false)
  }

  const handleSaveSettings = () => {
    setIsSettingsModalOpen(false)
    alert("Settings saved successfully!")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.")
    }
  }

  const handleDataDownload = () => {
    alert("Your data export has been initiated. You will receive a download link via email.")
  }

  const generateShareText = () => {
    return `Check out ${profileData.name}'s profile on Grohub!\n\n${profileData.designation}\n\nConnect with me:\n${profileData.socialLinks.linkedin ? `LinkedIn: ${profileData.socialLinks.linkedin}\n` : ""}${profileData.socialLinks.github ? `GitHub: ${profileData.socialLinks.github}\n` : ""}${profileData.socialLinks.instagram ? `Instagram: ${profileData.socialLinks.instagram}\n` : ""}${profileData.socialLinks.email ? `Email: ${profileData.socialLinks.email}` : ""}`
  }

  const handleShare = (platform: string) => {
    const shareText = generateShareText()
    const shareUrl = window.location.href

    switch (platform) {
      case "copy":
        navigator.clipboard.writeText(shareText)
        alert("Profile information copied to clipboard!")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
          "_blank",
        )
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
        break
    }
  }

  const renderTabContent = () => {
    const getCardCount = () => {
      switch (activeTab) {
        case "ACTIVITIES":
          return 4
        case "RESOURCES":
          return 6
        case "PROJECTS":
          return 2
        default:
          return 4
      }
    }

    const cardCount = getCardCount()

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: cardCount }, (_, index) => (
          <Card
            key={index}
            className="border-none rounded-3xl h-48 flex flex-col overflow-hidden shadow-lg bg-gradient-to-b from-purple-400 to-purple-600"
          >
            <div className="p-4 flex-1">
              <h3 className="text-black font-bold text-lg">DETAILS</h3>
            </div>
            <div className="bg-gray-200 rounded-b-3xl h-20"></div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${themeColors.background} ${themeColors.textPrimary} transition-all duration-300`}>
      {/* Header Container with Gradient */}
      <div className="bg-gradient-to-r from-[#2B0A75] via-[#4B1F9B] to-[#601EF2] py-8 px-4 shadow-lg">
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-4">
            <img src="/grohub-logo.png" alt="Grohub Logo" className="w-40 h-40 sm:w-36 sm:h-32 drop-shadow-lg" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Grohub.</h1>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-4 py-6">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 bg-black border-4 border-white flex-shrink-0">
              {profileData.profileImage ? (
                <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt={profileData.name} />
              ) : (
                <AvatarFallback className="bg-black text-white text-xl sm:text-2xl">👤</AvatarFallback>
              )}
            </Avatar>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">{profileData.name}</h2>
              <p className={`text-base sm:text-lg ${themeColors.textSecondary}`}>{profileData.designation}</p>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start space-x-3 mt-4">
                <a
                  href={profileData.socialLinks.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
                <a
                  href={profileData.socialLinks.instagram || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors shadow-lg"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
                <a
                  href={`mailto:${profileData.socialLinks.email}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
                <a
                  href={profileData.socialLinks.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Menu */}
          <div className="flex flex-row lg:flex-col justify-center lg:justify-start space-x-6 lg:space-x-0 lg:space-y-4 w-full lg:w-auto">
            {/* Edit Dialog */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <button className={`flex items-center space-x-2 hover:opacity-80 transition-colors`}>
                  <span className="text-sm sm:text-lg font-bold">EDIT</span>
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Profile Picture Upload */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Profile Picture</h3>

                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 bg-gray-200">
                        {formData.profileImage ? (
                          <AvatarImage src={formData.profileImage || "/placeholder.svg"} alt="Profile" />
                        ) : (
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">👤</AvatarFallback>
                        )}
                      </Avatar>

                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="bg-[#7E30E1] hover:bg-[#49108B] text-white"
                        >
                          {isUploading ? (
                            <>Uploading...</>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Photo
                            </>
                          )}
                        </Button>

                        {formData.profileImage && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormData((prev) => ({ ...prev, profileImage: "" }))}
                          >
                            Remove
                          </Button>
                        )}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />

                      <p className="text-xs text-gray-500 text-center">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>

                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your name"
                        className={`w-full ${formErrors.name ? "border-red-500" : ""}`}
                      />
                      {formErrors.name && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.name}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation" className="text-sm font-medium">
                        Designation *
                      </Label>
                      <Input
                        id="designation"
                        value={formData.designation}
                        onChange={(e) => handleInputChange("designation", e.target.value)}
                        placeholder="Enter your designation"
                        className={`w-full ${formErrors.designation ? "border-red-500" : ""}`}
                      />
                      {formErrors.designation && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.designation}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        placeholder="Tell us about yourself..."
                        className="w-full h-20 resize-none"
                      />
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Skills</h3>

                    <div className="space-y-3">
                      <div className="flex space-x-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill..."
                          className="flex-1"
                          onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                        />
                        <Button
                          onClick={handleAddSkill}
                          size="sm"
                          className="bg-[#7E30E1] hover:bg-[#49108B] text-white"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-[#7E30E1]/10 text-[#7E30E1] border-[#7E30E1]/20 flex items-center gap-1"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 hover:text-red-500 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Social Links</h3>

                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        LinkedIn Profile URL
                        {socialVerification.linkedin === true && <Check className="w-4 h-4 text-green-500" />}
                        {socialVerification.linkedin === false && <X className="w-4 h-4 text-red-500" />}
                      </Label>
                      <Input
                        id="linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleInputChange("social.linkedin", e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className={`w-full ${formErrors.linkedin ? "border-red-500" : ""}`}
                      />
                      {formErrors.linkedin && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.linkedin}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="instagram" className="text-sm font-medium flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-pink-600" />
                        Instagram Profile URL
                        {socialVerification.instagram === true && <Check className="w-4 h-4 text-green-500" />}
                        {socialVerification.instagram === false && <X className="w-4 h-4 text-red-500" />}
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleInputChange("social.instagram", e.target.value)}
                        placeholder="https://instagram.com/yourprofile"
                        className={`w-full ${formErrors.instagram ? "border-red-500" : ""}`}
                      />
                      {formErrors.instagram && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.instagram}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-500" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.socialLinks.email}
                        onChange={(e) => handleInputChange("social.email", e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full ${formErrors.email ? "border-red-500" : ""}`}
                      />
                      {formErrors.email && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.email}</AlertDescription>
                        </Alert>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                        <Github className="w-4 h-4 text-gray-800" />
                        GitHub Profile URL
                        {socialVerification.github === true && <Check className="w-4 h-4 text-green-500" />}
                        {socialVerification.github === false && <X className="w-4 h-4 text-red-500" />}
                      </Label>
                      <Input
                        id="github"
                        value={formData.socialLinks.github}
                        onChange={(e) => handleInputChange("social.github", e.target.value)}
                        placeholder="https://github.com/yourprofile"
                        className={`w-full ${formErrors.github ? "border-red-500" : ""}`}
                      />
                      {formErrors.github && (
                        <Alert className="border-red-500 bg-red-50">
                          <X className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700">{formErrors.github}</AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSaveProfile} className="flex-1 bg-[#7E30E1] hover:bg-[#49108B] text-white">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Share Dialog */}
            <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
              <DialogTrigger asChild>
                <button className={`flex items-center space-x-2 hover:opacity-80 transition-colors`}>
                  <span className="text-sm sm:text-lg font-bold">SHARE</span>
                  <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black max-w-md w-full mx-4">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">Share Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Profile Preview */}
                  <div className="bg-gradient-to-r from-[#49108B] to-[#7E30E1] p-4 rounded-lg text-white">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="w-12 h-12">
                        {profileData.profileImage ? (
                          <AvatarImage src={profileData.profileImage || "/placeholder.svg"} alt={profileData.name} />
                        ) : (
                          <AvatarFallback className="bg-white/20 text-white">👤</AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="font-bold">{profileData.name}</h3>
                        <p className="text-sm text-white/80">{profileData.designation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Share Text */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Share Message</Label>
                    <Textarea value={generateShareText()} readOnly className="w-full h-32 resize-none bg-gray-50" />
                  </div>

                  {/* Share Options */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Share via</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => handleShare("copy")}
                        variant="outline"
                        className="flex items-center justify-center space-x-2"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </Button>

                      <Button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Twitter className="w-4 h-4" />
                        <span>Twitter</span>
                      </Button>

                      <Button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Facebook className="w-4 h-4" />
                        <span>Facebook</span>
                      </Button>

                      <Button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white"
                      >
                        <Linkedin className="w-4 h-4" />
                        <span>LinkedIn</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Settings Dialog */}
            <Dialog open={isSettingsModalOpen} onOpenChange={setIsSettingsModalOpen}>
              <DialogTrigger asChild>
                <button className={`flex items-center space-x-2 hover:opacity-80 transition-colors`}>
                  <span className="text-sm sm:text-lg font-bold">SETTINGS</span>
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-white text-black max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-center">Settings</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-[#7E30E1]" />
                      <h3 className="font-semibold text-lg">Privacy & Security</h3>
                    </div>
                    <div className="bg-[#7E30E1]/10 p-4 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Profile Visibility</Label>
                          <p className="text-xs text-gray-600">Control who can see your profile</p>
                        </div>
                        <Select
                          value={settings.privacy.profileVisibility}
                          onValueChange={(value) => handleSettingsChange("privacy", "profileVisibility", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="connections">Connections Only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Show Email Address</Label>
                          <p className="text-xs text-gray-600">Display email on your profile</p>
                        </div>
                        <Switch
                          checked={settings.privacy.showEmail}
                          onCheckedChange={(checked) => handleSettingsChange("privacy", "showEmail", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Show Social Links</Label>
                          <p className="text-xs text-gray-600">Display social media links</p>
                        </div>
                        <Switch
                          checked={settings.privacy.showSocialLinks}
                          onCheckedChange={(checked) => handleSettingsChange("privacy", "showSocialLinks", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Allow Messaging</Label>
                          <p className="text-xs text-gray-600">Let others send you messages</p>
                        </div>
                        <Switch
                          checked={settings.privacy.allowMessaging}
                          onCheckedChange={(checked) => handleSettingsChange("privacy", "allowMessaging", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-5 h-5 text-[#7E30E1]" />
                      <h3 className="font-semibold text-lg">Notifications</h3>
                    </div>
                    <div className="bg-[#7E30E1]/10 p-4 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Email Notifications</Label>
                          <p className="text-xs text-gray-600">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={settings.notifications.emailNotifications}
                          onCheckedChange={(checked) =>
                            handleSettingsChange("notifications", "emailNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Push Notifications</Label>
                          <p className="text-xs text-gray-600">Receive push notifications</p>
                        </div>
                        <Switch
                          checked={settings.notifications.pushNotifications}
                          onCheckedChange={(checked) =>
                            handleSettingsChange("notifications", "pushNotifications", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Profile Views</Label>
                          <p className="text-xs text-gray-600">Notify when someone views your profile</p>
                        </div>
                        <Switch
                          checked={settings.notifications.profileViews}
                          onCheckedChange={(checked) => handleSettingsChange("notifications", "profileViews", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">New Connections</Label>
                          <p className="text-xs text-gray-600">Notify about new connection requests</p>
                        </div>
                        <Switch
                          checked={settings.notifications.newConnections}
                          onCheckedChange={(checked) =>
                            handleSettingsChange("notifications", "newConnections", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Weekly Digest</Label>
                          <p className="text-xs text-gray-600">Receive weekly activity summary</p>
                        </div>
                        <Switch
                          checked={settings.notifications.weeklyDigest}
                          onCheckedChange={(checked) => handleSettingsChange("notifications", "weeklyDigest", checked)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appearance Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Palette className="w-5 h-5 text-[#7E30E1]" />
                      <h3 className="font-semibold text-lg">Appearance</h3>
                    </div>
                    <div className="bg-[#7E30E1]/10 p-4 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Theme</Label>
                          <p className="text-xs text-gray-600">Choose your preferred theme</p>
                        </div>
                        <Select
                          value={settings.appearance.theme}
                          onValueChange={(value) => handleSettingsChange("appearance", "theme", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Language</Label>
                          <p className="text-xs text-gray-600">Select your language</p>
                        </div>
                        <Select
                          value={settings.appearance.language}
                          onValueChange={(value) => handleSettingsChange("appearance", "language", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Color Scheme</Label>
                          <p className="text-xs text-gray-600">Choose your color preference</p>
                        </div>
                        <Select
                          value={settings.appearance.colorScheme}
                          onValueChange={(value) => handleSettingsChange("appearance", "colorScheme", value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="orange">Orange</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-[#7E30E1]" />
                      <h3 className="font-semibold text-lg">Account</h3>
                    </div>
                    <div className="bg-[#7E30E1]/10 p-4 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                          <p className="text-xs text-gray-600">Add extra security to your account</p>
                        </div>
                        <Switch
                          checked={settings.account.twoFactorAuth}
                          onCheckedChange={(checked) => handleSettingsChange("account", "twoFactorAuth", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Login Alerts</Label>
                          <p className="text-xs text-gray-600">Get notified of new login attempts</p>
                        </div>
                        <Switch
                          checked={settings.account.loginAlerts}
                          onCheckedChange={(checked) => handleSettingsChange("account", "loginAlerts", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium">Download Your Data</Label>
                          <p className="text-xs text-gray-600">Export all your profile data</p>
                        </div>
                        <Button onClick={handleDataDownload} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="text-sm font-medium text-red-600">Delete Account</Label>
                          <p className="text-xs text-gray-600">Permanently delete your account</p>
                        </div>
                        <Button onClick={handleDeleteAccount} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSaveSettings} className="flex-1 bg-[#7E30E1] hover:bg-[#49108B] text-white">
                      Save Settings
                    </Button>
                    <Button onClick={() => setIsSettingsModalOpen(false)} variant="outline" className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 mb-6">
        <div className={`${themeColors.tabBg} rounded-full p-1 flex max-w-full overflow-hidden shadow-lg`}>
          {["ACTIVITIES", "RESOURCES", "PROJECTS"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-full font-bold text-xs sm:text-sm transition-all duration-200 ${activeTab === tab ? themeColors.tabActive : themeColors.tabInactive
                }`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 pb-8">{renderTabContent()}</div>
    </div>
  )
}
