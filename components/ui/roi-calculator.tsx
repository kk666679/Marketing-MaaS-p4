"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AnimatedCounter } from "./animated-counter"

export function ROICalculator() {
  const [monthlyBudget, setMonthlyBudget] = useState(5000)
  const [currentROI, setCurrentROI] = useState([150])
  const [timeSpent, setTimeSpent] = useState([20])

  const calculateSavings = () => {
    const timeSavings = timeSpent[0] * 0.7 * 50 // 70% time savings at $50/hour
    const roiImprovement = monthlyBudget * (currentROI[0] / 100) * 0.4 // 40% ROI improvement
    const totalMonthlySavings = timeSavings + roiImprovement
    const annualSavings = totalMonthlySavings * 12

    return {
      timeSavings,
      roiImprovement,
      totalMonthlySavings,
      annualSavings,
    }
  }

  const savings = calculateSavings()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">ROI Calculator</CardTitle>
        <p className="text-center text-gray-600">See how much you could save with Marketing MaaS</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="budget">Monthly Marketing Budget</Label>
              <Input
                id="budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label>Current ROI: {currentROI[0]}%</Label>
              <Slider value={currentROI} onValueChange={setCurrentROI} max={300} min={50} step={10} className="mt-2" />
            </div>

            <div>
              <Label>Hours/week on marketing: {timeSpent[0]}h</Label>
              <Slider value={timeSpent} onValueChange={setTimeSpent} max={60} min={5} step={5} className="mt-2" />
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h4 className="font-semibold text-green-800 mb-2">Potential Monthly Savings</h4>
              <div className="text-2xl font-bold text-green-600">
                $<AnimatedCounter value={savings.totalMonthlySavings} />
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-semibold text-blue-800 mb-2">Annual Savings</h4>
              <div className="text-2xl font-bold text-blue-600">
                $<AnimatedCounter value={savings.annualSavings} />
              </div>
            </motion.div>

            <div className="text-sm text-gray-600 space-y-1">
              <div>• Time savings: ${Math.round(savings.timeSavings)}/month</div>
              <div>• ROI improvement: ${Math.round(savings.roiImprovement)}/month</div>
              <div>• Based on 70% time reduction & 40% ROI increase</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
