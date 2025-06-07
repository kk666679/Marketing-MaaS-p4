"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  const footerLinks = [
    {
      title: "Products",
      links: [
        { label: "Campaign Manager", href: "#" },
        { label: "AI Content Generator", href: "#" },
        { label: "Analytics Dashboard", href: "#" },
        { label: "Multi-Platform Sync", href: "#" },
        { label: "Mobile App", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Tutorials", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "API Reference", href: "#" },
        { label: "Community", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "GDPR Compliance", href: "#" },
        { label: "Security", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-block"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Awan Keusahawanan
                </span>
              </motion.div>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Revolutionizing social media marketing with AI-powered multi-agent technology. Automate, optimize, and
              scale your marketing efforts across all platforms.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">Level 25, Menara Awan, Jalan Digital, 50088 Kuala Lumpur, Malaysia</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@awankeusahawanan.com" className="text-gray-400 hover:text-white">
                  info@awankeusahawanan.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-blue-400 mr-3 flex-shrink-0" />
                <a href="tel:+60312345678" className="text-gray-400 hover:text-white">
                  +603 1234 5678
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-10 pb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay updated with our newsletter</h3>
              <p className="text-gray-400">
                Get the latest news, product updates, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
                  required
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {subscribed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <>
                      Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm mt-2"
                >
                  Thank you for subscribing!
                </motion.p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 Awan Keusahawanan. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Cookies
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Accessibility
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
