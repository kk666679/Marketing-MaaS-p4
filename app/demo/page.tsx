"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Play, Pause, RotateCcw } from "lucide-react"

interface DemoStep {
  title: string
  description: string
  duration: number
}

export default function DemoPage() {
  const [playing, setPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const demoSteps: DemoStep[] = [
    {
      title: "AI Campaign Creation",
      description: "Watch as our AI analyzes your target audience and creates optimized content across multiple platforms.",
      duration: 3000,
    },
    {
      title: "Multi-Platform Publishing",
      description: "See how content is automatically adapted and published to each social media platform.",
      duration: 3000,
    },
    {
      title: "Real-time Analytics",
      description: "Monitor engagement, reach, and conversions across all your campaigns in real-time.",
      duration: 3000,
    },
    {
      title: "Performance Optimization",
      description: "Our AI continuously learns and adjusts your campaigns for maximum ROI.",
      duration: 3000,
    },
  ]

  const startDemo = () => {
    setPlaying(true)
    playNextStep()
  }

  const playNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1)
        playNextStep()
      }, demoSteps[currentStep].duration)
    } else {
      setPlaying(false)
    }
  }

  const resetDemo = () => {
    setPlaying(false)
    setCurrentStep(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            See Our AI Marketing Platform in Action
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Watch how our AI-powered platform revolutionizes social media marketing
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={playing ? () => setPlaying(false) : startDemo}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              size="lg"
            >
              {playing ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Demo
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Demo
                </>
              )}
            </Button>
            <Button
              onClick={resetDemo}
              variant="outline"
              size="lg"
              disabled={currentStep === 0}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Demo
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          {demoSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: index <= currentStep ? 1 : 0.5,
                x: 0,
              }}
              className="relative"
            >
              <Card className={index <= currentStep ? "border-blue-500" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index <= currentStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {index < demoSteps.length - 1 && (
                <div className="absolute h-6 w-px bg-gray-200 left-10 -bottom-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
