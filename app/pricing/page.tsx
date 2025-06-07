"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Check, Zap, Crown, Rocket } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useUser } from "@clerk/nextjs"

interface PricingPlan {
  id: string
  name: string
  price: number
  billing_period: string
  features: string[]
  max_campaigns: number
  max_platforms: number
}

export default function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [processingPlan, setProcessingPlan] = useState<string | null>(null)
  const { user, isSignedIn } = useUser()

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      // Simulate API call - replace with actual API call
      setTimeout(() => {
        setPlans([
          {
            id: "starter",
            name: "Starter",
            price: 29,
            billing_period: "monthly",
            features: ["Basic Analytics", "3 Platforms", "Email Support"],
            max_campaigns: 5,
            max_platforms: 3,
          },
          {
            id: "professional",
            name: "Professional",
            price: 99,
            billing_period: "monthly",
            features: ["Advanced Analytics", "All Platforms", "Priority Support", "Custom Branding"],
            max_campaigns: 25,
            max_platforms: 8,
          },
          {
            id: "enterprise",
            name: "Enterprise",
            price: 299,
            billing_period: "monthly",
            features: [
              "Enterprise Analytics",
              "All Platforms",
              "24/7 Support",
              "Custom Integrations",
              "Dedicated Manager",
            ],
            max_campaigns: 100,
            max_platforms: 8,
          },
        ])
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch plans:", error)
      setLoading(false)
    }
  }

  const handleSubscribe = async (plan: PricingPlan) => {
    if (!isSignedIn) {
      // Redirect to sign up
      return
    }

    setProcessingPlan(plan.id)

    try {
      // Simulate checkout process
      setTimeout(() => {
        console.log(`Subscribing to ${plan.name} plan`)
        setProcessingPlan(null)
      }, 2000)
    } catch (error) {
      console.error("Checkout error:", error)
      setProcessingPlan(null)
    }
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "starter":
        return <Zap className="w-8 h-8 text-blue-600" />
      case "professional":
        return <Crown className="w-8 h-8 text-purple-600" />
      case "enterprise":
        return <Rocket className="w-8 h-8 text-gold-600" />
      default:
        return <Zap className="w-8 h-8 text-blue-600" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scale your marketing with our AI-powered platform. Start free and upgrade as you grow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <AnimatedCard key={plan.id} delay={index * 0.1} className="relative">
              {plan.name === "Professional" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    className="mb-4 flex justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getPlanIcon(plan.name)}
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/{plan.billing_period}</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-6">
                    Up to {plan.max_campaigns} campaigns • {plan.max_platforms} platforms
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                    >
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 ${
                    plan.name === "Professional"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : ""
                  }`}
                  variant={plan.name === "Professional" ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                  disabled={processingPlan === plan.id}
                >
                  {processingPlan === plan.id ? <LoadingSpinner /> : `Get Started with ${plan.name}`}
                </Button>
              </div>
            </AnimatedCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">All plans include 14-day free trial • No setup fees • Cancel anytime</p>
          <p className="text-sm text-gray-500">
            Need a custom solution?{" "}
            <a href="mailto:sales@awankeusahawanan.com" className="text-blue-600 hover:underline">
              Contact our sales team
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
