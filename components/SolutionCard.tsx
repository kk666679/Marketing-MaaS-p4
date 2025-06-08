import React from "react"

interface SolutionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  featured?: boolean
  delay?: number
}

export default function SolutionCard({ title, description, icon, featured, delay = 0 }: SolutionCardProps) {
  return (
    <div
      className={`p-6 rounded-xl shadow-md border ${
        featured ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white"
      } transform transition-transform duration-300 hover:scale-[1.03]`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
