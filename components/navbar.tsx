"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import JoinNowModal from "./join-now-modal"
import DashboardButton from "./dashboard-button"

interface NavbarProps {
  currentUser?: any
  onUserRegistered?: (userData: any) => void
  onViewFullDashboard?: () => void
  onLogout?: () => void
}

export default function Navbar({ currentUser, onUserRegistered, onViewFullDashboard, onLogout }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#vision", label: "Vision" },
    { href: "#events", label: "Events" },
    { href: "#interests", label: "Interests" },
    { href: "#resources", label: "Resources" },
    { href: "#start-learning", label: "Start Learning" },
  ]

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev + 1) % navigationItems.length)
  }

  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + navigationItems.length) % navigationItems.length)
  }

  const handleItemClick = (index: number) => {
    setCurrentIndex(index)
    const element = document.querySelector(navigationItems[index].href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const getPrevIndex = () => (currentIndex - 1 + navigationItems.length) % navigationItems.length
  const getNextIndex = () => (currentIndex + 1) % navigationItems.length

  const prevItem = navigationItems[getPrevIndex()]
  const currentItem = navigationItems[currentIndex]
  const nextItem = navigationItems[getNextIndex()]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200 shadow-lg">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-gray-900">Grohub.</span>
          </Link>

          {/* Central Navigation Bubble - Desktop */}
          <div className="hidden md:flex items-center justify-center">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-lg border border-gray-200 gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={navigatePrev}
                className="w-8 h-8 rounded-full hover:bg-gray-200 transition-all duration-200 p-0 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Previous Item - Blurred */}
              <Link
                href={prevItem.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleItemClick(getPrevIndex())
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-200/60 text-gray-500 hover:bg-gray-300/60 hover:text-gray-600 blur-[1px] opacity-60"
              >
                {prevItem.label}
              </Link>

              {/* Current Item - Sharp Focus */}
              <Link
                href={currentItem.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleItemClick(currentIndex)
                }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap bg-purple-600 text-white shadow-md hover:bg-purple-700"
              >
                {currentItem.label}
              </Link>

              {/* Next Item - Blurred */}
              <Link
                href={nextItem.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleItemClick(getNextIndex())
                }}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap bg-gray-200/60 text-gray-500 hover:bg-gray-300/60 hover:text-gray-600 blur-[1px] opacity-60"
              >
                {nextItem.label}
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={navigateNext}
                className="w-8 h-8 rounded-full hover:bg-gray-200 transition-all duration-200 p-0 text-gray-600 hover:text-gray-900"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <DashboardButton userData={currentUser} onViewFullDashboard={onViewFullDashboard!} onLogout={onLogout!} />
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <JoinNowModal onUserRegistered={onUserRegistered}>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 text-sm font-medium"
                  >
                    Login / Sign-up
                  </Button>
                </JoinNowModal>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200 py-4 animate-in slide-in-from-top duration-200 rounded-b-lg mx-4 mb-4 shadow-lg">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-center py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    index === currentIndex
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleItemClick(index)
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              ))}

              {!currentUser && (
                <div className="pt-4 border-t border-gray-200">
                  <JoinNowModal onUserRegistered={onUserRegistered}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white">
                      Login / Sign-up
                    </Button>
                  </JoinNowModal>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="hidden md:flex justify-center pb-2">
        <div className="flex space-x-1">
          {navigationItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-purple-600 scale-125 shadow-lg" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}
