import { Suspense } from 'react'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import LoadingSkeleton from '@/components/ui/skeleton'

const AIContentGenerator = dynamic(() => import('@/components/ai/AIContentGenerator'), {
  ssr: false,
  loading: () => <LoadingSkeleton />
})

export const metadata: Metadata = {
  title: 'AI Content Generator - Create Engaging Content in Seconds',
}

export default function AIContentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
          AI-Powered Content Creation
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Generate high-quality social media content in seconds with our multi-agent AI system
        </p>
        
        <Suspense fallback={<LoadingSkeleton />}>
          <AIContentGenerator />
        </Suspense>
        
        <div className="mt-16 bg-indigo-50 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">1</div>
              <p>Describe your content needs or paste source material</p>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">2</div>
              <p>Our AI agents analyze context and generate options</p>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">3</div>
              <p>Review and refine with real-time suggestions</p>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-2 rounded-lg mr-4">4</div>
              <p>Schedule directly to your social platforms</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
