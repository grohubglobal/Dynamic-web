"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Globe, Rocket } from "lucide-react";

export default function VisionSection() {
  const visionPoints = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description:
        "We constantly evolve our platform with cutting-edge learning technologies and methodologies.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description:
        "Every course is designed with clear objectives to help you achieve specific career milestones.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description:
        "Empowering learners worldwide to break barriers and create opportunities in the digital economy.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Rocket,
      title: "Future Ready",
      description:
        "Preparing you for tomorrow's challenges with today's most relevant and in-demand skills.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section
      id="vision"
      className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 border-purple-400/30">
            Our Vision
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Shaping the
            <span className="block bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Future of Learning
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            At Grohub, we envision a world where quality education is accessible
            to everyone, where learning is personalized, engaging, and directly
            applicable to real-world challenges. We're building the bridge
            between ambition and achievement.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {visionPoints.map((point, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-500 group hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${point.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    <point.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {point.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h3 className="text-2xl md:text-4xl font-bold text-white">
              Our Mission
            </h3>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              "To democratize high-quality education and empower individuals
              worldwide to unlock their full potential through innovative,
              practical, and accessible learning experiences that drive real
              career transformation."
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Accessibility
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Innovation
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Excellence
              </Badge>
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2">
                Impact
              </Badge>
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Looking Ahead
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                2025
              </div>
              <h4 className="text-lg font-semibold text-white">
                Global Expansion
              </h4>
              <p className="text-gray-300">
                Reaching 1 million learners across 50+ countries
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                2026
              </div>
              <h4 className="text-lg font-semibold text-white">
                AI Integration
              </h4>
              <p className="text-gray-300">
                Personalized learning paths powered by advanced AI
              </p>
            </div>
            <div className="space-y-4">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                2027
              </div>
              <h4 className="text-lg font-semibold text-white">
                Industry Partnerships
              </h4>
              <p className="text-gray-300">
                Direct job placement through Fortune 500 partnerships
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
