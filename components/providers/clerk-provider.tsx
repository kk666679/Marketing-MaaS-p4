"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { ReactNode } from "react"

interface MockClerkProviderProps {
  children: ReactNode
}

// Mock provider for build time
function MockClerkProvider({ children }: MockClerkProviderProps) {
  return <>{children}</>
}

interface ConditionalClerkProviderProps {
  children: ReactNode
}

export function ConditionalClerkProvider({ children }: ConditionalClerkProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
  
  // During build time with placeholder key, use mock provider
  if (publishableKey.includes("placeholder")) {
    return <MockClerkProvider>{children}</MockClerkProvider>
  }

  // In development or with real keys, use actual ClerkProvider
  return <ClerkProvider>{children}</ClerkProvider>
}
