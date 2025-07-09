"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ResourcesSection from "@/components/resources-section"
import EventsSection from "@/components/events-section"
import InterestsSection from "@/components/interests-section"
import StartLearningSection from "@/components/start-learning-section"
import VisionSection from "@/components/vision-section"
import Footer from "@/components/footer"

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-gray-900">
      <Navbar />
      <HeroSection  />
      <AboutSection />
      <VisionSection />
      <EventsSection />
      <InterestsSection />
      <ResourcesSection />
      <StartLearningSection />
      <Footer/>
    </div>
  )
}
