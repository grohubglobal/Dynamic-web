"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Users, Award, BookOpen, TrendingUp } from "lucide-react"

export default function HeroSection() {
  return (
    <section id="home"  className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30 hover:bg-purple-500/30 transition-colors">
              <TrendingUp className="w-4 h-4 mr-2" />
              #1 Skill Development Platform
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Unlock Your
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Potential
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
                Transform your career with our comprehensive skill development platform. Learn from industry experts and
                build real-world projects.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-center">
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Active Learners</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-gray-400">Expert Courses</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/25 transform hover:scale-105 transition-all duration-200"
              >
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-8">
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-5 h-5" />
                <span className="text-sm">Join 50,000+ learners</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="w-5 h-5" />
                <span className="text-sm">Industry recognized</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">Lifetime access</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Video */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
              {/* Dashboard Preview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-white/30 rounded w-20 mb-1"></div>
                      <div className="h-2 bg-white/20 rounded w-16"></div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">Active</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-xs text-gray-300">Courses</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-xs text-gray-300">Progress</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Web Development</span>
                    <span className="text-sm text-gray-300">85%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Data Science</span>
                    <span className="text-sm text-gray-300">92%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3 shadow-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-3 shadow-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
