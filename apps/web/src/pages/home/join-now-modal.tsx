"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Mail, Lock, ArrowRight, CheckCircle } from "lucide-react"


interface JoinNowModalProps {
  children: React.ReactNode
  onUserRegistered?: (userData: any) => void
}

export default function JoinNowModal({ children, onUserRegistered }: JoinNowModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    designation: "",
    experience: "",
    skills: [] as string[],
    interests: [] as string[],
    terms: false,
  })

  const skillOptions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "UI/UX Design",
    "Data Science",
    "Machine Learning",
    "Digital Marketing",
    "Project Management",
  ]

  const interestOptions = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "AI/ML",
    "Design",
    "Business",
    "Marketing",
    "Leadership",
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value],
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError("")

    try {
      const { data, error: authError } = await authAPI.signUp(formData.email, formData.password, formData)

      if (authError) {
        setError(authError.message)
        return
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          designation: formData.designation,
          avatar: "/placeholder.svg?height=100&width=100",
          ...formData,
        }

        onUserRegistered?.(userData)
        setIsOpen(false)
        setCurrentStep(1)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          designation: "",
          experience: "",
          skills: [],
          interests: [],
          terms: false,
        })
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.password === formData.confirmPassword &&
          formData.password.length >= 6
        )
      case 2:
        return formData.designation && formData.experience
      case 3:
        return formData.terms
      default:
        return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Join Grohub Today
          </DialogTitle>
          <DialogDescription>Start your learning journey with thousands of other professionals</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    currentStep >= step
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-colors duration-200 ${
                      currentStep > step ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Create password (min 6 chars)"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        placeholder="Confirm password"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="designation">Current Role/Designation</Label>
                  <Input
                    id="designation"
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    placeholder="e.g., Software Developer, Designer"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-10 years)</SelectItem>
                      <SelectItem value="expert">Expert Level (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Current Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skillOptions.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.skills.includes(skill) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors duration-200 ${
                          formData.skills.includes(skill)
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "hover:bg-purple-50"
                        }`}
                        onClick={() => handleArrayToggle("skills", skill)}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Learning Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interestOptions.map((interest) => (
                      <Badge
                        key={interest}
                        variant={formData.interests.includes(interest) ? "default" : "outline"}
                        className={`cursor-pointer transition-colors duration-200 ${
                          formData.interests.includes(interest)
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "hover:bg-purple-50"
                        }`}
                        onClick={() => handleArrayToggle("interests", interest)}
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Terms and Conditions */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Almost Done!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => handleInputChange("terms", checked)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <span className="text-purple-600 underline cursor-pointer">Terms of Service</span>{" "}
                      and <span className="text-purple-600 underline cursor-pointer">Privacy Policy</span>
                    </Label>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">What's Next?</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Access to 200+ courses and learning paths</li>
                    <li>• Personalized learning recommendations</li>
                    <li>• Join live events and workshops</li>
                    <li>• Connect with a community of learners</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              disabled={currentStep === 1 || isLoading}
            >
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={!isStepValid(currentStep) || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep) || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
