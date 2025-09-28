"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Video, BookOpen, Download, Search, Star, Clock, Eye, ArrowRight } from "lucide-react"

export default function ResourcesSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")

  const resources = [
    {
      id: 1,
      title: "Complete React Developer Guide",
      description: "Comprehensive guide covering React fundamentals, hooks, context, and advanced patterns.",
      type: "guide",
      category: "Web Development",
      format: "PDF",
      pages: 156,
      downloads: 12500,
      rating: 4.9,
      readTime: "45 min",
      isNew: true,
      isFree: true,
      author: "Sarah Johnson",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Python Data Science Cheat Sheet",
      description: "Quick reference for pandas, numpy, matplotlib, and scikit-learn functions.",
      type: "cheatsheet",
      category: "Data Science",
      format: "PDF",
      pages: 8,
      downloads: 8900,
      rating: 4.8,
      readTime: "10 min",
      isNew: false,
      isFree: true,
      author: "Dr. Michael Chen",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "UI/UX Design Principles Masterclass",
      description: "Video series covering design thinking, user research, prototyping, and testing.",
      type: "video",
      category: "Design",
      format: "MP4",
      duration: "3h 45m",
      views: 15600,
      rating: 4.9,
      readTime: "225 min",
      isNew: true,
      isFree: false,
      author: "Emma Rodriguez",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "JavaScript ES6+ Features Handbook",
      description: "Modern JavaScript features explained with practical examples and use cases.",
      type: "ebook",
      category: "Web Development",
      format: "EPUB",
      pages: 89,
      downloads: 6700,
      rating: 4.7,
      readTime: "30 min",
      isNew: false,
      isFree: true,
      author: "Alex Thompson",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Machine Learning Algorithm Templates",
      description: "Ready-to-use code templates for common ML algorithms in Python and R.",
      type: "template",
      category: "AI/ML",
      format: "ZIP",
      files: 25,
      downloads: 4200,
      rating: 4.8,
      readTime: "60 min",
      isNew: true,
      isFree: false,
      author: "Dr. Lisa Wang",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Mobile App Development Roadmap",
      description: "Step-by-step learning path for iOS and Android development with resources.",
      type: "roadmap",
      category: "Mobile Development",
      format: "Interactive",
      steps: 12,
      followers: 9800,
      rating: 4.9,
      readTime: "15 min",
      isNew: false,
      isFree: true,
      author: "James Park",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filters = [
    { id: "all", label: "All Resources" },
    { id: "guide", label: "Guides" },
    { id: "video", label: "Videos" },
    { id: "ebook", label: "E-books" },
    { id: "cheatsheet", label: "Cheat Sheets" },
    { id: "template", label: "Templates" },
    { id: "roadmap", label: "Roadmaps" },
  ]

  const categories = ["Web Development", "Data Science", "Design", "AI/ML", "Mobile Development", "Business"]

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "all" || resource.type === activeFilter
    return matchesSearch && matchesFilter
  })

  const getTypeIcon = (type: string) => {
    const icons = {
      guide: BookOpen,
      video: Video,
      ebook: BookOpen,
      cheatsheet: FileText,
      template: Download,
      roadmap: ArrowRight,
    }
    return icons[type as keyof typeof icons] || FileText
  }

  const getTypeColor = (type: string) => {
    const colors = {
      guide: "from-blue-500 to-cyan-500",
      video: "from-red-500 to-pink-500",
      ebook: "from-green-500 to-emerald-500",
      cheatsheet: "from-purple-500 to-indigo-500",
      template: "from-orange-500 to-red-500",
      roadmap: "from-yellow-500 to-orange-500",
    }
    return colors[type as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  return (
    <section id="resources" className="py-20 bg-gradient-to-b from-gray-900 to-purple-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="bg-purple-500/20 text-purple-200 border-purple-400/30">Learning Resources</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Free Learning
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resources
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our comprehensive library of guides, templates, cheat sheets, and video tutorials to accelerate your
            learning journey.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources, guides, templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-400"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
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
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((resource) => {
            const TypeIcon = getTypeIcon(resource.type)
            return (
              <Card
                key={resource.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  {/* Resource Image/Preview */}
                  <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {resource.isNew && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                          New
                        </Badge>
                      )}
                      {resource.isFree && (
                        <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">Free</Badge>
                      )}
                    </div>

                    <Badge
                      className={`absolute top-4 right-4 bg-gradient-to-r ${getTypeColor(resource.type)} text-white border-0 capitalize`}
                    >
                      <TypeIcon className="w-3 h-3 mr-1" />
                      {resource.type}
                    </Badge>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {resource.type === "video" ? (
                          <>
                            <Eye className="w-4 h-4" />
                            <span>{resource.views?.toLocaleString()}</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>{resource.downloads?.toLocaleString()}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg text-white group-hover:text-purple-300 transition-colors">
                        {resource.title}
                      </CardTitle>
                      <Badge variant="outline" className="border-white/30 text-white/70 text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{resource.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm leading-relaxed">{resource.description}</p>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>by {resource.author}</span>
                    <span>
                      {resource.format} •{" "}
                      {resource.pages
                        ? `${resource.pages} pages`
                        : resource.duration
                          ? resource.duration
                          : resource.files
                            ? `${resource.files} files`
                            : resource.steps
                              ? `${resource.steps} steps`
                              : ""}
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    {resource.isFree ? "Download Free" : "Get Access"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No resources found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setActiveFilter("all")
              }}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Categories Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card
                key={category}
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group hover:scale-105"
              >
                <CardContent className="p-4 text-center">
                  <h4 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {category}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {resources.filter((r) => r.category === category).length} resources
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Want More Resources?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community to get access to exclusive resources, templates, and tools. Plus, get notified when we
              add new content to our library.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Join Community
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Request Resource
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
