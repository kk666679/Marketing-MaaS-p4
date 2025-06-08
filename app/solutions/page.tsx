import SectionHeader from "../../components/SectionHeader"
import SolutionCard from "../../components/SolutionCard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Solutions - Awan Keusahawanan",
  description: "AI-powered solutions for your business growth",
}

const solutions = [
  {
    title: "For E-commerce",
    description: "Boost sales with AI-optimized product campaigns and automated customer engagement",
    icon: "🛒",
  },
  {
    title: "For SaaS Companies",
    description: "Automate user onboarding and retention campaigns across social platforms",
    icon: "🖥️",
  },
  {
    title: "For Agencies",
    description: "Manage multiple client accounts with unified AI-powered workflows",
    icon: "🏢",
  },
  {
    title: "For Content Creators",
    description: "Generate and schedule engaging content 24/7 with AI assistance",
    icon: "🎬",
  },
  {
    title: "Arketing AI Agents",
    description: "Revolutionary AI agents for social media success across all platforms",
    icon: "🤖",
    featured: true,
  }
]

export default function SolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <SectionHeader 
        title="Transform Your Marketing"
        subtitle="Powered by Advanced Multi-Agent AI"
        description="Our revolutionary multi-agent AI system orchestrates campaigns across all platforms with unprecedented precision and 24/7 automation."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {solutions.map((solution, index) => (
          <SolutionCard 
            key={index}
            {...solution}
            delay={index * 0.1}
          />
        ))}
      </div>
      
      <div className="mt-24 text-center">
        <h3 className="text-3xl font-bold text-gray-800">
          Ready to Transform Your Social Presence?
        </h3>
        <button className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
          Start Free Trial
        </button>
      </div>
    </div>
  )
}
