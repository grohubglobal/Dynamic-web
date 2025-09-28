"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Code,
  Palette,
  BarChart3,
  Smartphone,
  Briefcase,
  Brain,
  Camera,
  Music,
  Gamepad2,
  Wrench,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

export default function InterestsSection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const interests = [
    {
      id: "web-dev",
      title: "Web Development",
      description: "Build modern websites and web applications",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
      courses: 45,
      learners: "12.5K",
      trending: true,
    },
    {
      id: "design",
      title: "UI/UX Design",
      description: "Create beautiful and user-friendly interfaces",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      courses: 32,
      learners: "8.2K",
      trending: false,
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Analyze data and build predictive models",
      icon: BarChart3,
      color: "from-purple-500 to-indigo-500",
      courses: 28,
      learners: "9.8K",
      trending: true,
    },
    {
      id: "mobile-dev",
      title: "Mobile Development",
      description: "Create iOS and Android applications",
      icon: Smartphone,
      color: "from-green-500 to-emerald-500",
      courses: 24,
      learners: "6.4K",
      trending: false,
    },
    {
      id: "business",
      title: "Business & Marketing",
      description: "Grow your business and marketing skills",
      icon: Briefcase,
      color: "from-orange-500 to-red-500",
      courses: 38,
      learners: "11.2K",
      trending: false,
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Build intelligent systems and algorithms",
      icon: Brain,
      color: "from-violet-500 to-purple-500",
      courses: 22,
      learners: "7.9K",
      trending: true,
    },
    {
      id: "photography",
      title: "Photography",
      description: "Master the art of visual storytelling",
      icon: Camera,
      color: "from-yellow-500 to-orange-500",
      courses: 18,
      learners: "4.3K",
      trending: false,
    },
    {
      id: "music",
      title: "Music Production",
      description: "Create and produce professional music",
      icon: Music,
      color: "from-teal-500 to-cyan-500",
      courses: 15,
      learners: "3.7K",
      trending: false,
    },
    {
      id: "game-dev",
      title: "Game Development",
      description: "Build engaging games and interactive experiences",
      icon: Gamepad2,
      color: "from-indigo-500 to-blue-500",
      courses: 19,
      learners: "5.1K",
      trending: true,
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      description: "Deploy and manage scalable applications",
      icon: Wrench,
      color: "from-gray-500 to-slate-500",
      courses: 26,
      learners: "8.6K",
      trending: true,
    },
  ]

  const toggleInterest = (interestId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interestId) ? prev.filter((id) => id !== interestId) : [...prev, interestId],
    )
  }

  const trendingInterests = interests.filter((interest) => interest.trending)

  return (
    <section id="interests" className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">Explore Interests</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            What Sparks Your
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Curiosity?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your passion and build expertise in the fields that excite you most. From cutting-edge technology
            to creative arts, we have something for everyone.
          </p>
        </div>

        {/* Trending Section */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-200 border-yellow-400/30 px-4 py-2">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending Now
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {trendingInterests.map((interest) => (
              <Card
                key={interest.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => toggleInterest(interest.id)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${interest.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <interest.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{interest.title}</h3>
                  <p className="text-xs text-gray-400">{interest.learners} learners</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Interests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {interests.map((interest) => (
            <Card
              key={interest.id}
              className={`cursor-pointer transition-all duration-300 group hover:scale-105 ${
                selectedInterests.includes(interest.id)
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50"
                  : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15"
              }`}
              onClick={() => toggleInterest(interest.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${interest.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <interest.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">{interest.title}</h3>
                      {interest.trending && (
                        <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-xs">
                          Trending
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{interest.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{interest.courses} courses</span>
                      <span>{interest.learners} learners</span>
                    </div>
                  </div>
                </div>

                {selectedInterests.includes(interest.id) && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30">✓ Selected</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Interests Summary */}
        {selectedInterests.length > 0 && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10 mb-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white">
                Great Choice! You've selected {selectedInterests.length} interest
                {selectedInterests.length !== 1 ? "s" : ""}
              </h3>
              <p className="text-gray-300">
                Based on your interests, we'll recommend personalized learning paths and courses just for you.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {selectedInterests.map((interestId) => {
                  const interest = interests.find((i) => i.id === interestId)
                  return interest ? (
                    <Badge key={interestId} className="bg-white/20 text-white border-white/30 px-3 py-1">
                      {interest.title}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {selectedInterests.length > 0
                ? "Perfect! Let's create a personalized learning path based on your selected interests."
                : "Choose your interests above and we'll recommend the perfect courses for you."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                disabled={selectedInterests.length === 0}
              >
                Get Personalized Recommendations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Browse All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
