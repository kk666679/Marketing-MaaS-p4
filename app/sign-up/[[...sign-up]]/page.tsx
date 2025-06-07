"use client"

import { SignUp } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Get Started
          </h1>
          <p className="text-gray-600">Create your Awan Keusahawanan account</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm normal-case",
              card: "shadow-xl border-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
        />
      </motion.div>
    </div>
  )
}
