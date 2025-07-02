"use client"

import { useState} from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ResourcesSection from "@/components/resources-section"
import EventsSection from "@/components/events-section"
import InterestsSection from "@/components/interests-section"
import StartLearningSection from "@/components/start-learning-section"
import VisionSection from "@/components/vision-section"
import UserDashboard from "@/components/user-dashboard"


export default function Home() {

  const [showDashboard, setShowDashboard] = useState(false)






  const handleViewFullDashboard = () => {
    setShowDashboard(true)
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900">
      <Navbar
     
      
        onViewFullDashboard={handleViewFullDashboard}
     
      />
      <HeroSection />
      <AboutSection />
      <VisionSection />
      <EventsSection />
      <InterestsSection />
      <ResourcesSection />
      <StartLearningSection />
    </div>
  )
}
