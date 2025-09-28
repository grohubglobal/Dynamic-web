"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Edit, Share2, Award, Calendar, FileText, Video } from "lucide-react"
import Image from "next/image"

interface UserData {
  id: string
  name: string
  email: string
  designation: string
  avatar: string
}

interface DashboardProps {
  userData: UserData
  onLogout: () => void
}

export default function UserDashboard({ userData, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("activities")

  const stats = {
    coursesEnrolled: 8,
    coursesCompleted: 3,
    certificatesEarned: 3,
    hoursLearned: 127,
    currentStreak: 15,
    totalPoints: 2450,
  }

  const recentActivities = [
    {
      id: 1,
      type: "course_completed",
      title: "Completed: Web Development Bootcamp",
      description: "Earned certificate and 500 points",
      timestamp: "2 hours ago",
      icon: Award,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "lesson_watched",
      title: "Watched: React Hooks Deep Dive",
      description: "Lesson 12 of Advanced React Course",
      timestamp: "1 day ago",
      icon: Video,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "project_submitted",
      title: "Submitted: E-commerce Website Project",
      description: "Final project for Full-Stack Development",
      timestamp: "3 days ago",
      icon: FileText,
      color: "text-purple-600",
    },
  ]

  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      description: "Full-stack e-commerce platform with React and Node.js",
      status: "Completed",
      progress: 100,
      dueDate: "Dec 15, 2024",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard using D3.js and Python",
      status: "In Progress",
      progress: 65,
      dueDate: "Dec 30, 2024",
      technologies: ["Python", "D3.js", "Flask"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">Grohub.</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={onLogout}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {userData.avatar ? (
                    <Image
                      src={userData.avatar || "/placeholder.svg"}
                      alt={userData.name}
                      width={96}
                      height={96}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white/70" />
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
                <p className="text-white/80 mb-4">{userData.designation}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.coursesCompleted}</div>
                    <div className="text-sm text-white/70">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.certificatesEarned}</div>
                    <div className="text-sm text-white/70">Certificates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.hoursLearned}</div>
                    <div className="text-sm text-white/70">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.currentStreak}</div>
                    <div className="text-sm text-white/70">Day Streak</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  EDIT
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  SHARE
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 backdrop-blur-lg border-white/20">
            <TabsTrigger
              value="activities"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              ACTIVITIES
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/70"
            >
              PROJECTS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activities">
            <div className="grid md:grid-cols-2 gap-6">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center ${activity.color}`}
                      >
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{activity.title}</h3>
                        <p className="text-white/70 text-sm mb-2">{activity.description}</p>
                        <p className="text-white/50 text-xs">{activity.timestamp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{project.title}</h3>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            project.status === "Completed"
                              ? "bg-green-600/20 text-green-300"
                              : "bg-blue-600/20 text-blue-300"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <Calendar className="w-4 h-4 text-white/50" />
                    </div>

                    <p className="text-white/70 text-sm mb-4">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-white/70 mb-1">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1 bg-white/20" />
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-white/30 text-white/60 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white/50 text-xs">Due: {project.dueDate}</span>
                      <Button size="sm" variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                        DETAILS
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
