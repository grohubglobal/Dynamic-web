"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function StartLearningSection() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const learningPaths = [
    {
      id: "web-dev",
      title: "Full-Stack Web Developer",
      description:
        "Master both frontend and backend development with modern technologies",
      duration: "6-8 months",
      level: "Beginner to Advanced",
      students: 15420,
      rating: 4.9,
      courses: 12,
      projects: 8,
      skills: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
      color: "from-blue-500 to-cyan-500",
      popular: true,
      completion: 0,
    },
    {
      id: "data-science",
      title: "Data Science & Analytics",
      description:
        "Learn to analyze data, build models, and derive insights from complex datasets",
      duration: "5-7 months",
      level: "Beginner to Intermediate",
      students: 12890,
      rating: 4.8,
      courses: 10,
      projects: 6,
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Scikit-learn",
        "SQL",
      ],
      color: "from-purple-500 to-indigo-500",
      popular: false,
      completion: 0,
    },
    {
      id: "ui-ux",
      title: "UI/UX Designer",
      description:
        "Create beautiful, user-centered designs and prototypes for digital products",
      duration: "4-6 months",
      level: "Beginner to Advanced",
      students: 9650,
      rating: 4.9,
      courses: 8,
      projects: 10,
      skills: [
        "Figma",
        "Adobe XD",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
      color: "from-pink-500 to-rose-500",
      popular: false,
      completion: 0,
    },
    {
      id: "mobile-dev",
      title: "Mobile App Developer",
      description:
        "Build native and cross-platform mobile applications for iOS and Android",
      duration: "6-9 months",
      level: "Intermediate to Advanced",
      students: 8340,
      rating: 4.7,
      courses: 9,
      projects: 7,
      skills: [
        "React Native",
        "Flutter",
        "iOS",
        "Android",
        "Firebase",
        "API Integration",
      ],
      color: "from-green-500 to-emerald-500",
      popular: false,
      completion: 0,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Structured Curriculum",
      description:
        "Follow a carefully designed learning path with progressive difficulty",
    },
    {
      icon: Award,
      title: "Industry Certificates",
      description: "Earn recognized certificates upon completion of each path",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with peers and mentors throughout your journey",
    },
    {
      icon: TrendingUp,
      title: "Career Guidance",
      description:
        "Get personalized career advice and job placement assistance",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer at Google",
      path: "Full-Stack Web Developer",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "Grohub's structured approach helped me transition from marketing to tech in just 7 months!",
    },
    {
      name: "Michael Chen",
      role: "Data Scientist at Netflix",
      path: "Data Science & Analytics",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "The hands-on projects and real-world datasets made all the difference in my learning.",
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer at Airbnb",
      path: "UI/UX Designer",
      image: "/placeholder.svg?height=60&width=60",
      quote:
        "I loved the design thinking approach and the portfolio projects that got me hired!",
    },
  ];

  return (
    <section
      id="start-learning"
      className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            Start Your Journey
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Choose Your
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Path
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Follow our expertly crafted learning paths designed to take you from
            beginner to job-ready professional. Each path includes courses,
            projects, and career support.
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {learningPaths.map((path) => (
            <Card
              key={path.id}
              className={`cursor-pointer transition-all duration-300 group hover:scale-105 ${
                selectedPath === path.id
                  ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50"
                  : "bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15"
              }`}
              onClick={() =>
                setSelectedPath(selectedPath === path.id ? null : path.id)
              }
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                        {path.title}
                      </CardTitle>
                      {path.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{path.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{path.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{path.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {path.description}
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">
                      {path.courses}
                    </div>
                    <div className="text-xs text-gray-400">Courses</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {path.projects}
                    </div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {path.level.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-400">Level</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Progress</span>
                    <span className="text-gray-300">{path.completion}%</span>
                  </div>
                  <Progress value={path.completion} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {path.skills.slice(0, 4).map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-white/30 text-white/70 text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {path.skills.length > 4 && (
                    <Badge
                      variant="outline"
                      className="border-white/30 text-white/70 text-xs"
                    >
                      +{path.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                {selectedPath === path.id && (
                  <div className="pt-4 border-t border-white/20 space-y-4">
                    <h4 className="font-semibold text-white">
                      What you'll learn:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {path.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className={`w-full bg-gradient-to-r ${path.color} hover:opacity-90 text-white`}
                    >
                      Start This Path
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Why Choose Our Learning Paths?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-center"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            Success Stories
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                  <Badge
                    variant="outline"
                    className="border-white/30 text-white/70 text-xs"
                  >
                    {testimonial.path}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of learners who have transformed their careers with
              our structured learning paths. Start today and see where your new
              skills can take you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Learning Now
              </Button>
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Compare All Paths
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
