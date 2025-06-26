import type React from "react";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { ProfileData, FormErrors, SocialVerification } from "../utils/types";

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

export const EditModal = ({
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
      onAddSkill();
    }
  };

  const renderVerificationIcon = (status: boolean | null) => {
    if (status === true) return <Check className="w-4 h-4 text-green-500" />;
    if (status === false) return <X className="w-4 h-4 text-red-500" />;
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
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onInputChange(id, e.target.value)}
        placeholder={placeholder}
        className={`w-full ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <Alert className="border-red-500 bg-red-50">
          <X className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
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
    <div className="space-y-2">
      <Label
        htmlFor={platform}
        className="text-sm font-medium flex items-center gap-2"
      >
        {icon}
        {label}
        {renderVerificationIcon(
          socialVerification[platform as keyof SocialVerification]
        )}
      </Label>
      <Input
        id={platform}
        value={value}
        onChange={(e) => onInputChange(`social.${platform}`, e.target.value)}
        placeholder={placeholder}
        className={`w-full ${error ? "border-red-500" : ""}`}
      />
      {error && (
        <Alert className="border-red-500 bg-red-50">
          <X className="h-4 w-4 text-red-500" />
          <AlertDescription className="text-red-700">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">
              Profile Picture
            </h3>
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24 bg-gray-200">
                {formData.profileImage ? (
                  <AvatarImage src={formData.profileImage} alt="Profile" />
                ) : (
                  <AvatarFallback className="bg-gray-200 text-gray-600 text-2xl">
                    👤
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="flex space-x-2">
                <Button
                  type="button"
                  onClick={handleFileUpload}
                  disabled={isUploading}
                  className="bg-[#7E30E1] hover:bg-[#49108B] text-white"
                >
                  {isUploading ? (
                    "Uploading..."
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
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </Button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />

              <p className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">
              Basic Information
            </h3>

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

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-sm font-medium">
                Bio
              </Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => onInputChange("bio", e.target.value)}
                placeholder="Tell us about yourself..."
                className="w-full h-20 resize-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Skills</h3>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill..."
                  className="flex-1"
                  onKeyPress={handleSkillKeyPress}
                />
                <Button
                  onClick={onAddSkill}
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
                      onClick={() => onRemoveSkill(skill)}
                      className="ml-1 hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">
              Social Links
            </h3>

            {renderSocialField(
              "linkedin",
              <Linkedin className="w-4 h-4 text-blue-600" />,
              "LinkedIn Profile URL",
              "https://linkedin.com/in/yourprofile",
              formData.socialLinks.linkedin,
              formErrors.linkedin
            )}

            {renderSocialField(
              "instagram",
              <Instagram className="w-4 h-4 text-pink-600" />,
              "Instagram Profile URL",
              "https://instagram.com/yourprofile",
              formData.socialLinks.instagram,
              formErrors.instagram
            )}

            {renderSocialField(
              "email",
              <Mail className="w-4 h-4 text-blue-500" />,
              "Email Address",
              "your.email@example.com",
              formData.socialLinks.email,
              formErrors.email
            )}

            {renderSocialField(
              "github",
              <Github className="w-4 h-4 text-gray-800" />,
              "GitHub Profile URL",
              "https://github.com/yourprofile",
              formData.socialLinks.github,
              formErrors.github
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onSave}
              className="flex-1 bg-[#7E30E1] hover:bg-[#49108B] text-white"
            >
              Save Changes
            </Button>
            <Button onClick={onCancel} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
