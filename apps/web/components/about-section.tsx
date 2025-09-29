"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, BookOpen, TrendingUp, Target, Zap } from "lucide-react";

export default function AboutSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with real-world experience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Community Learning",
      description:
        "Connect with peers and learn together in our vibrant community",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Industry Certificates",
      description:
        "Earn recognized certificates that boost your career prospects",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Target,
      title: "Practical Projects",
      description:
        "Build real-world projects that showcase your skills to employers",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description:
        "Track your progress and accelerate your professional development",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Zap,
      title: "Flexible Learning",
      description: "Learn at your own pace with lifetime access to all content",
      color: "from-pink-500 to-rose-500",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Active Learners", icon: Users },
    { number: "200+", label: "Expert Courses", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Award },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
      <div className="absolute top-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            About Grohub
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Why Choose
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Grohub?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're not just another learning platform. We're your partner in
            professional growth, offering personalized learning paths and
            real-world skills that matter.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-center"
            >
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105"
            >
              <CardContent className="p-8 text-center space-y-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Career?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who have already accelerated their
              careers with Grohub. Start your journey today and see the
              difference expert guidance makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105">
                Explore Courses
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
