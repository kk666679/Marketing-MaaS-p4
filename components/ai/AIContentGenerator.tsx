"use client"

import { useState } from "react"

export default function AIContentGenerator() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOutput(`Generated content based on: ${input}`)
      setLoading(false)
    }, 2000)
  }

  return (
    <div>
      <textarea
        className="w-full p-4 border rounded-md resize-none"
        rows={6}
        placeholder="Describe your content needs or paste source material"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        onClick={generateContent}
        disabled={loading || !input.trim()}
      >
        {loading ? "Generating..." : "Generate Content"}
      </button>
      {output && (
        <div className="mt-6 p-4 bg-white rounded-md shadow-md">
          <h3 className="font-semibold mb-2">Generated Content:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  )
}
