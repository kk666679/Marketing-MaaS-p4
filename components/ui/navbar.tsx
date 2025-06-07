"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs"
import { Menu, X, ChevronDown, ChevronRight, BarChart3, Zap, Users, LogIn, Settings } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    {
      label: "Products",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Campaign Manager", href: "#", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
        { label: "AI Content Generator", href: "#", icon: <Zap className="w-4 h-4 mr-2" /> },
        { label: "Analytics Dashboard", href: "#", icon: <BarChart3 className="w-4 h-4 mr-2" /> },
        { label: "Multi-Platform Sync", href: "#", icon: <Users className="w-4 h-4 mr-2" /> },
      ],
    },
    {
      label: "Solutions",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "For E-commerce", href: "#" },
        { label: "For SaaS Companies", href: "#" },
        { label: "For Agencies", href: "#" },
        { label: "For Content Creators", href: "#" },
      ],
    },
    { label: "Pricing", href: "/pricing", hasDropdown: false },
    { label: "Resources", href: "#", hasDropdown: false },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Awan Keusahawanan
                </span>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-md text-gray-700 hover:text-blue-600 font-medium flex items-center transition-colors ${
                      isScrolled ? "text-gray-800" : "text-gray-800"
                    }`}
                  >
                    {item.label}
                    {item.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                      <div className="py-2 bg-white rounded-lg shadow-xl border border-gray-100">
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                          >
                            {dropdownItem.icon && dropdownItem.icon}
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>
                  <div className="relative group">
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8",
                          userButtonPopoverCard: "shadow-xl border-0",
                          userButtonPopoverActionButton: "hover:bg-blue-50",
                        },
                      }}
                      userProfileMode="navigation"
                      userProfileUrl="/user-profile"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <SignInButton mode="redirect" redirectUrl="/sign-in">
                    <Button variant="outline" size="sm">
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="redirect" redirectUrl="/sign-up">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Sign Up Free
                    </Button>
                  </SignUpButton>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[60px] left-0 right-0 bg-white z-40 border-b shadow-lg md:hidden overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between py-2 text-gray-800 font-medium"
                      onClick={() => !item.hasDropdown && setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      {item.hasDropdown && <ChevronRight className="w-5 h-5" />}
                    </Link>

                    {item.hasDropdown && (
                      <div className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100">
                        {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                          <Link
                            key={dropdownIndex}
                            href={dropdownItem.href}
                            className="flex items-center py-2 text-sm text-gray-700"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.icon && dropdownItem.icon}
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                  {isSignedIn ? (
                    <>
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/user-profile" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          <Settings className="w-4 h-4 mr-2" />
                          Profile Settings
                        </Button>
                      </Link>
                      <div className="flex justify-center pt-2">
                        <UserButton
                          appearance={{
                            elements: {
                              avatarBox: "w-10 h-10",
                            },
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="redirect" redirectUrl="/sign-in">
                        <Button variant="outline" className="w-full">
                          <LogIn className="w-4 h-4 mr-2" />
                          Log In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="redirect" redirectUrl="/sign-up">
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                          Sign Up Free
                        </Button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className={`${isScrolled ? "h-16" : "h-20"} transition-all duration-300`}></div>
    </>
  )
}
