import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ConditionalClerkProvider } from "@/components/providers/clerk-provider"
import "./globals.css"
import { Navbar } from "@/components/ui/navbar"
import { Footer } from "@/components/ui/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Awan Keusahawanan - AI-Powered Social Media Marketing",
  description: "Revolutionary multi-agent AI system for social media success",
  metadataBase: new URL("https://awan-keusahawanan.com"),
}

// Since there are no other folders for images, move hero_section_background.webp to the public/ folder to fix 404 errors.

// Note: The hero_section_background.webp image is located in src/public/ folder.
// To fix 404 errors, either move the image to the public/ folder or update image references accordingly.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConditionalClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body className={`${inter.className} bg-gradient-to-br from-indigo-50 to-white`}>
          <Navbar />
          <main className="pt-20 min-h-[85vh]">{children}</main>
          <Footer />
        </body>
      </html>
    </ConditionalClerkProvider>
  )
}
