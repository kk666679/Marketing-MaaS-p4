"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      if (email.includes("@")) {
        setStatus("success")
        setMessage("Thanks for subscribing! Check your email for confirmation.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage("Please enter a valid email address.")
      }
    }, 1500)
  }

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="text-gray-600">
            Get the latest AI marketing insights and platform updates delivered to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={status === "loading"}
            />
            <Button
              type="submit"
              disabled={status === "loading" || !email}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </Button>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
            >
              {status === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message}
            </motion.div>
          )}
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          By subscribing, you agree to our Privacy Policy and Terms of Service.
        </div>
      </CardContent>
    </Card>
  )
}
