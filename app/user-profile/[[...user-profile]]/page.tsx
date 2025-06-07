"use client"

import { UserProfile } from "@clerk/nextjs"
import { motion } from "framer-motion"

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your profile and account preferences</p>
          </div>

          <div className="flex justify-center">
            <UserProfile
              appearance={{
                elements: {
                  card: "shadow-xl border-0",
                  navbar: "bg-gradient-to-r from-blue-50 to-purple-50",
                  navbarButton: "text-gray-700 hover:text-blue-600",
                  navbarButtonActive: "text-blue-600 bg-blue-100",
                  formButtonPrimary:
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm normal-case",
                },
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
