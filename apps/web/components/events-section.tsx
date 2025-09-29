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
import { Calendar, Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";

export default function EventsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  const events = [
    {
      id: 1,
      title: "AI & Machine Learning Bootcamp",
      description:
        "Dive deep into AI and ML fundamentals with hands-on projects and expert guidance.",
      type: "bootcamp",
      instructor: "Dr. Sarah Chen",
      date: "Dec 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Virtual Event",
      attendees: 245,
      maxAttendees: 300,
      price: "Free",
      rating: 4.9,
      isVirtual: true,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["AI", "Machine Learning", "Python"],
    },
    {
      id: 2,
      title: "Full-Stack Development Workshop",
      description:
        "Build a complete web application from scratch using modern technologies.",
      type: "workshop",
      instructor: "Mike Rodriguez",
      date: "Dec 18, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "San Francisco, CA",
      attendees: 89,
      maxAttendees: 120,
      price: "$49",
      rating: 4.8,
      isVirtual: false,
      isFeatured: false,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 3,
      title: "Career Growth Strategies Webinar",
      description:
        "Learn proven strategies to accelerate your career growth in tech.",
      type: "webinar",
      instructor: "Jennifer Park",
      date: "Dec 20, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "Online",
      attendees: 156,
      maxAttendees: 500,
      price: "Free",
      rating: 4.7,
      isVirtual: true,
      isFeatured: false,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Career", "Leadership", "Growth"],
    },
    {
      id: 4,
      title: "UX/UI Design Masterclass",
      description:
        "Master the art of user experience and interface design with industry experts.",
      type: "masterclass",
      instructor: "Alex Thompson",
      date: "Dec 22, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "New York, NY",
      attendees: 67,
      maxAttendees: 80,
      price: "$89",
      rating: 4.9,
      isVirtual: false,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Design", "UX", "UI", "Figma"],
    },
  ];

  const filters = [
    { id: "all", label: "All Events" },
    { id: "bootcamp", label: "Bootcamps" },
    { id: "workshop", label: "Workshops" },
    { id: "webinar", label: "Webinars" },
    { id: "masterclass", label: "Masterclasses" },
  ];

  const filteredEvents =
    activeFilter === "all"
      ? events
      : events.filter((event) => event.type === activeFilter);

  const getTypeColor = (type: string) => {
    const colors = {
      bootcamp: "from-purple-500 to-indigo-500",
      workshop: "from-blue-500 to-cyan-500",
      webinar: "from-green-500 to-emerald-500",
      masterclass: "from-orange-500 to-red-500",
    };
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600";
  };

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">
            Upcoming Events
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Join Our
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Learning Events
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with industry experts, learn cutting-edge skills, and
            network with fellow professionals in our interactive workshops,
            bootcamps, and webinars.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`${
                activeFilter === filter.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                  : "border-white/30 text-white hover:bg-white/10"
              } transition-all duration-200`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105 overflow-hidden"
            >
              <div className="relative">
                {/* Event Image */}
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {event.isFeatured && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    className={`absolute top-4 right-4 bg-gradient-to-r ${getTypeColor(
                      event.type
                    )} text-white border-0 capitalize`}
                  >
                    {event.type}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-white group-hover:text-purple-300 transition-colors">
                      {event.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{event.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {event.attendees}/{event.maxAttendees}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {event.price}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <span>{event.location}</span>
                    {event.isVirtual && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                        Virtual
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    by {event.instructor}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-white/30 text-white/70 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Don't Miss Out!
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Stay updated with our latest events and workshops. Join our
              community to get early access to exclusive learning opportunities.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              View All Events
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
