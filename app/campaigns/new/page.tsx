"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AnimatedCard } from "@/components/ui/animated-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function NewCampaignPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    duration: "",
  })
  const [loading, setLoading] = useState(false)
  const { isLoaded } = useUser()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      router.push("/dashboard?campaign_created=true")
    } catch (error) {
      console.error("Failed to create campaign:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Campaign</h1>
          <p className="text-gray-600">Let our AI agents help you create a powerful marketing campaign</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <AnimatedCard>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold">Campaign Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Summer Product Launch"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-semibold">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign goals and target audience..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-2"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget" className="text-lg font-semibold">Monthly Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="1000"
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration" className="text-lg font-semibold">Campaign Duration (months)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="3"
                      value={formData.duration}
                      onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">AI Campaign Preview</h3>
                  <div className="text-sm text-blue-800 space-y-1">
                    <p>• Estimated reach: {formData.budget ? Math.floor(parseInt(formData.budget) * 50).toLocaleString() : "0"} people/month</p>
                    <p>• Expected engagement rate: 3.2% - 4.8%</p>
                    <p>• Projected leads: {formData.budget ? Math.floor(parseInt(formData.budget) * 0.8) : "0"}/month</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {loading ? <LoadingSpinner /> : "Create Campaign"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </AnimatedCard>
        </form>
      </div>
    </div>
  )
}
