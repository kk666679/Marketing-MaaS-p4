"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function InteractiveDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const demoSteps = [
    {
      title: "AI Analyzes Trends",
      description: "Our trend prediction agent scans social media, news, and analytics data",
      visual: "🔍",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Content Generation",
      description: "AI creates platform-optimized content based on trending topics",
      visual: "✨",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Multi-Platform Sync",
      description: "Content is automatically distributed across all your social platforms",
      visual: "🚀",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Performance Optimization",
      description: "Real-time analytics optimize campaigns for maximum ROI",
      visual: "📈",
      color: "from-orange-500 to-red-500",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, demoSteps.length])

  const handlePlay = () => setIsPlaying(!isPlaying)
  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
  }

  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold">See AI in Action</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePlay}>
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-64 mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  className={`w-24 h-24 rounded-full bg-gradient-to-r ${demoSteps[currentStep].color} flex items-center justify-center text-4xl mb-4 mx-auto`}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  {demoSteps[currentStep].visual}
                </motion.div>
                <h4 className="text-xl font-semibold mb-2">{demoSteps[currentStep].title}</h4>
                <p className="text-gray-600 max-w-md">{demoSteps[currentStep].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center space-x-2">
          {demoSteps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
