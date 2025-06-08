import React from "react"

type SectionHeaderProps = {
  title: string
  subtitle?: string
  description?: string
}

export default function SectionHeader({ title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {subtitle && <h3 className="text-indigo-600 font-semibold uppercase tracking-wide mb-2">{subtitle}</h3>}
      <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      {description && <p className="mt-4 text-gray-600">{description}</p>}
    </div>
  )
}
