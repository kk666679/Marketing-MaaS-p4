"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
    content:
      "Marketing MaaS transformed our social media strategy. We saw a 300% increase in engagement within the first month.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=SC",
  },
  {
    name: "Marcus Rodriguez",
    role: "CEO",
    company: "GrowthLab",
    content:
      "The AI-powered content generation is incredible. It's like having a team of marketing experts working 24/7.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=MR",
  },
  {
    name: "Emily Watson",
    role: "Social Media Manager",
    company: "BrandBoost",
    content: "Finally, a platform that understands multi-platform marketing. Our ROI has never been better.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=EW",
  },
  {
    name: "David Kim",
    role: "Founder",
    company: "StartupX",
    content:
      "As a startup, we needed efficient marketing automation. Marketing MaaS delivered beyond our expectations.",
    rating: 5,
    avatar: "/placeholder.svg?height=60&width=60&text=DK",
  },
]

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-bold">What Our Clients Say</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={prevTestimonial}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextTestimonial}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative h-64 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Card className="h-full">
              <CardContent className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonials[currentIndex].name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
          />
        ))}
      </div>
    </div>
  )
}
