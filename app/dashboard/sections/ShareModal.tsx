import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, Twitter, Facebook, Linkedin } from "lucide-react";
import { ProfileData } from "../utils/types";
import { generateShareText } from "../utils/utils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: ProfileData;
  onShare: (platform: string) => void;
}

const SHARE_PLATFORMS = [
  { id: "copy", label: "Copy", icon: Copy, className: "border" },
  {
    id: "twitter",
    label: "Twitter",
    icon: Twitter,
    className: "bg-blue-500 hover:bg-blue-600 text-white",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: Facebook,
    className: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: Linkedin,
    className: "bg-blue-700 hover:bg-blue-800 text-white",
  },
];

export const ShareModal = ({
  isOpen,
  onClose,
  profileData,
  onShare,
}: ShareModalProps) => {
  const shareText = generateShareText(profileData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black max-w-md w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Share Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-gradient-to-r from-[#49108B] to-[#7E30E1] p-4 rounded-lg text-white">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                {profileData.profileImage ? (
                  <AvatarImage
                    src={profileData.profileImage}
                    alt={profileData.name}
                  />
                ) : (
                  <AvatarFallback className="bg-white/20 text-white">
                    👤
                  </AvatarFallback>
                )}
              </Avatar>

              <div>
                <h3 className="font-bold">{profileData.name}</h3>
                <p className="text-sm text-white/80">
                  {profileData.designation}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Share Message</Label>
            <Textarea
              value={shareText}
              readOnly
              className="w-full h-32 resize-none bg-gray-50"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">Share via</Label>
            <div className="grid grid-cols-2 gap-3">
              {SHARE_PLATFORMS.map(({ id, label, icon: Icon, className }) => (
                <Button
                  key={id}
                  onClick={() => onShare(id)}
                  variant={id === "copy" ? "outline" : "default"}
                  className={`flex items-center justify-center space-x-2 ${className}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
