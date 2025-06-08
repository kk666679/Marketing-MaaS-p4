"use client"

import dynamic from "next/dynamic"
import { Metadata } from "next"

const CampaignVisualizer = dynamic(() => import("components/campaign/CampaignVisualizer"), {
  loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />,
})

export const metadata: Metadata = {
  title: "AI Campaign Manager - Orchestrate Cross-Platform Campaigns",
}

export default function CampaignManagerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Intelligent Campaign Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our multi-agent AI system orchestrates campaigns across all platforms with 24/7 automation
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-16">
        <CampaignVisualizer />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Automated Optimization",
            description: "AI agents continuously adjust campaigns based on real-time performance",
          },
          {
            title: "Cross-Platform Sync",
            description: "Unified management for all social media channels",
          },
          {
            title: "Predictive Analytics",
            description: "Forecast campaign performance before launch",
          },
        ].map((feature, index) => (
          <div key={index} className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
