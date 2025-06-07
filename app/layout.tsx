import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Awan Keusahawanan - AI-Powered Social Media Marketing",
  description: "Multi-agent AI system for omnichannel social media marketing automation",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <script src="https://js.stripe.com/v3/" async></script>
        </head>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
