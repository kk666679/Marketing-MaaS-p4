"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

interface ABTestVariant {
  id: string
  name: string
  weight: number
  component: React.ComponentType<any>
}

interface ABTestProps {
  testId: string
  variants: ABTestVariant[]
  children?: React.ReactNode
}

export function ABTest({ testId, variants, children }: ABTestProps) {
  const [selectedVariant, setSelectedVariant] = useLocalStorage<string>(`ab-test-${testId}`, "")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    if (!selectedVariant) {
      // Select variant based on weights
      const random = Math.random()
      let cumulativeWeight = 0

      for (const variant of variants) {
        cumulativeWeight += variant.weight
        if (random <= cumulativeWeight) {
          setSelectedVariant(variant.id)
          break
        }
      }
    }
  }, [selectedVariant, setSelectedVariant, variants])

  if (!isClient || !selectedVariant) {
    return children || null
  }

  const variant = variants.find((v) => v.id === selectedVariant)
  if (!variant) return children || null

  const VariantComponent = variant.component
  return <VariantComponent />
}

// Example usage components
export function HeroVariantA() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">Marketing MaaS</h1>
      <p className="text-xl text-gray-600 mb-8">AI-Powered Social Media Marketing Platform</p>
    </div>
  )
}

export function HeroVariantB() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Transform Your Marketing
      </h1>
      <p className="text-xl text-gray-600 mb-8">Revolutionary AI Agents for Social Media Success</p>
    </div>
  )
}
