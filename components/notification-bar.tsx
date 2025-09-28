"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  X,
  Calendar,
  BookOpen,
  Award,
  MessageSquare,
  Settings,
  Trash2,
  BookMarkedIcon as MarkAsUnreadIcon,
  CheckCircle,
  AlertCircle,
  Info,
  Gift,
} from "lucide-react"

interface Notification {
  id: string
  type: "event" | "course" | "achievement" | "message" | "system" | "promotion"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
  actionText?: string
}

export default function NotificationBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Sample notifications data
  useEffect(() => {
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        type: "event",
        title: "New Event: AI Bootcamp",
        message: "Join our upcoming AI & Machine Learning Bootcamp starting Dec 15. Early bird discount available!",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
        priority: "high",
        actionUrl: "#events",
        actionText: "Register Now",
      },
      {
        id: "2",
        type: "course",
        title: "Course Completed!",
        message: "Congratulations! You've successfully completed 'Introduction to Web Development'.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        priority: "medium",
        actionUrl: "#",
        actionText: "View Certificate",
      },
      {
        id: "3",
        type: "achievement",
        title: "Achievement Unlocked!",
        message: "You've earned the 'Fast Learner' badge for completing 3 courses this month.",
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        priority: "medium",
      },
      {
        id: "4",
        type: "message",
        title: "New Message from Instructor",
        message: "Dr. Sarah Chen has responded to your question in the AI Bootcamp discussion.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: false,
        priority: "medium",
        actionUrl: "#",
        actionText: "View Message",
      },
      {
        id: "5",
        type: "system",
        title: "Profile Update Required",
        message: "Please update your learning preferences to get better course recommendations.",
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        read: true,
        priority: "low",
        actionUrl: "#",
        actionText: "Update Profile",
      },
      {
        id: "6",
        type: "promotion",
        title: "Limited Time Offer!",
        message: "Get 50% off on all premium courses. Offer valid until Dec 31st.",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        read: true,
        priority: "high",
        actionUrl: "#",
        actionText: "View Offers",
      },
    ]
    setNotifications(sampleNotifications)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length
  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return <Calendar className="w-4 h-4" />
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "achievement":
        return <Award className="w-4 h-4" />
      case "message":
        return <MessageSquare className="w-4 h-4" />
      case "system":
        return <Settings className="w-4 h-4" />
      case "promotion":
        return <Gift className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getNotificationColor = (type: Notification["type"], priority: Notification["priority"]) => {
    if (priority === "high") return "from-red-500 to-pink-500"
    switch (type) {
      case "event":
        return "from-blue-500 to-cyan-500"
      case "course":
        return "from-green-500 to-teal-500"
      case "achievement":
        return "from-yellow-500 to-orange-500"
      case "message":
        return "from-purple-500 to-pink-500"
      case "system":
        return "from-gray-500 to-slate-500"
      case "promotion":
        return "from-indigo-500 to-purple-500"
      default:
        return "from-gray-500 to-slate-500"
    }
  }

  const getPriorityIcon = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-3 h-3 text-red-500" />
      case "medium":
        return <Info className="w-3 h-3 text-blue-500" />
      case "low":
        return <CheckCircle className="w-3 h-3 text-green-500" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return timestamp.toLocaleDateString()
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2 hover:bg-purple-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className={`w-5 h-5 transition-all duration-200 ${isOpen ? "text-purple-600" : "text-gray-600"}`} />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Dropdown */}
      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-96 max-w-[90vw] shadow-2xl border-0 z-50 animate-in slide-in-from-top-2 duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="p-1 h-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <Button
                variant={filter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("all")}
                className={`flex-1 text-xs ${
                  filter === "all" ? "bg-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                All ({notifications.length})
              </Button>
              <Button
                variant={filter === "unread" ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter("unread")}
                className={`flex-1 text-xs ${
                  filter === "unread" ? "bg-white shadow-sm" : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                Unread ({unreadCount})
              </Button>
            </div>

            {/* Action Buttons */}
            {notifications.length > 0 && (
              <div className="flex space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="flex-1 text-xs border-purple-200 hover:bg-purple-50"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Mark All Read
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllNotifications}
                  className="flex-1 text-xs border-red-200 hover:bg-red-50 text-red-600"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-0">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">{filter === "unread" ? "No unread notifications" : "No notifications yet"}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {filter === "unread"
                    ? "All caught up! Check back later for updates."
                    : "We'll notify you when something important happens."}
                </p>
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className="space-y-1">
                  {filteredNotifications.map((notification, index) => (
                    <div key={notification.id}>
                      <div
                        className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                        onClick={() => !notification.read && markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${getNotificationColor(
                              notification.type,
                              notification.priority,
                            )} rounded-lg flex items-center justify-center flex-shrink-0 text-white`}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  !notification.read ? "text-gray-900" : "text-gray-700"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {getPriorityIcon(notification.priority)}
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                              )}
                            </div>

                            <p className="text-xs text-gray-600 leading-relaxed mb-2">{notification.message}</p>

                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-400">{formatTimestamp(notification.timestamp)}</span>

                              {notification.actionText && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                >
                                  {notification.actionText}
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsRead(notification.id)
                                }}
                                className="p-1 h-auto text-gray-400 hover:text-blue-600"
                                title="Mark as read"
                              >
                                <MarkAsUnreadIcon className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteNotification(notification.id)
                              }}
                              className="p-1 h-auto text-gray-400 hover:text-red-600"
                              title="Delete notification"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < filteredNotifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  View All Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
