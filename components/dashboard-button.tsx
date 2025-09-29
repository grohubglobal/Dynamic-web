"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, ChevronDown, TrendingUp, Settings, LogOut } from "lucide-react"
import Image from "next/image"

interface UserData {
  id: string
  name: string
  email: string
  designation: string
  avatar: string
}

interface DashboardButtonProps {
  userData: UserData
  onViewFullDashboard: () => void
  onLogout: () => void
}

export default function DashboardButton({ userData, onViewFullDashboard, onLogout }: DashboardButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        className="relative p-1 hover:bg-purple-50 transition-colors duration-200 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
          {userData.avatar ? (
            <Image
              src={userData.avatar || "/placeholder.svg"}
              alt={userData.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <ChevronDown
          className={`w-3 h-3 ml-1 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] shadow-2xl border-0 z-50 animate-in slide-in-from-top-2 duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center overflow-hidden">
                {userData.avatar ? (
                  <Image
                    src={userData.avatar || "/placeholder.svg"}
                    alt={userData.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{userData.name}</CardTitle>
                <p className="text-sm text-gray-600">{userData.designation}</p>
              </div>
              <Badge className="bg-green-100 text-green-700 text-xs">Active</Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="px-6 py-4">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    setIsOpen(false)
                    onViewFullDashboard()
                  }}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                    setIsOpen(false)
                    onLogout()
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
