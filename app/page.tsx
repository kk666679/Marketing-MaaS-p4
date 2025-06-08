"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { HeroBackground } from "@/components/ui/hero-background"
import { LiveChat } from "@/components/ui/live-chat"
import { NewsletterSignup } from "@/components/ui/newsletter-signup"
import { PricingCalculator } from "@/components/ui/pricing-calculator"
import { MobileAppPreview } from "@/components/ui/mobile-app-preview"
import { PerformanceMetrics } from "@/components/ui/performance-metrics"
import { FloatingElements } from "@/components/ui/floating-elements"
import { InteractiveDemo } from "@/components/ui/interactive-demo"
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel"
import { PlatformShowcase } from "@/components/ui/platform-showcase"
import { FeatureComparison } from "@/components/ui/feature-comparison"
import { ROICalculator } from "@/components/ui/roi-calculator"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ABTest, HeroVariantA, HeroVariantB } from "@/components/ui/ab-testing"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"
import { SignUpButton, useUser } from "@clerk/nextjs"
import {
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle,
  Play,
  Star,
  Award,
  Globe,
  Rocket,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { ref: heroRef, isIntersecting: heroInView } = useIntersectionObserver({ threshold: 0.1 })
  const { ref: featuresRef, isIntersecting: featuresInView } = useIntersectionObserver({ threshold: 0.1 })
  const { isSignedIn } = useUser()

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "AI-Powered Automation",
      description:
        "Multi-agent AI system that manages your entire social media strategy automatically with advanced machine learning algorithms.",
      benefits: ["24/7 automated posting", "Smart content optimization", "Predictive analytics"],
      stats: "500K+ campaigns automated",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Smart Targeting",
      description:
        "Advanced audience targeting across all major social media platforms using behavioral data and AI insights.",
      benefits: ["Precision audience targeting", "Cross-platform synchronization", "Real-time adjustments"],
      stats: "98% targeting accuracy",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-600" />,
      title: "Real-time Analytics",
      description: "Comprehensive performance tracking with actionable insights and automated reporting dashboards.",
      benefits: ["Live performance metrics", "Custom reporting", "ROI optimization"],
      stats: "3.2x average ROI increase",
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Compliance Monitoring",
      description: "Automated content safety and regulatory compliance checks across all platforms and regions.",
      benefits: ["Content safety scanning", "Regulatory compliance", "Brand protection"],
      stats: "99.9% compliance rate",
    },
  ]

  const stats = [
    { number: 500000, suffix: "+", label: "Campaigns Managed", icon: <BarChart3 className="w-6 h-6" /> },
    { number: 98, suffix: "%", label: "Client Satisfaction", icon: <Users className="w-6 h-6" /> },
    { number: 320, suffix: "%", label: "Average ROI Increase", icon: <TrendingUp className="w-6 h-6" /> },
    { number: 24, suffix: "/7", label: "AI Monitoring", icon: <Clock className="w-6 h-6" /> },
  ]

  const achievements = [
    { icon: <Award className="w-8 h-8 text-yellow-500" />, title: "Best AI Marketing Tool 2025", org: "TechCrunch" },
    { icon: <Star className="w-8 h-8 text-blue-500" />, title: "Top Rated on G2", org: "4.9/5 stars" },
    { icon: <Globe className="w-8 h-8 text-green-500" />, title: "Global Expansion", org: "50+ countries" },
    { icon: <Rocket className="w-8 h-8 text-purple-500" />, title: "Fastest Growing", org: "Marketing SaaS" },
  ]

  const useCases = [
    {
      title: "E-commerce Brands",
      description: "Boost product visibility and drive sales across all social platforms",
      icon: "🛍️",
      metrics: "+250% sales increase",
      caseStudy: "Fashion retailer increased revenue by $2M in 6 months",
    },
    {
      title: "SaaS Companies",
      description: "Generate qualified leads and build thought leadership",
      icon: "💻",
      metrics: "+180% lead generation",
      caseStudy: "B2B SaaS reduced CAC by 40% while doubling leads",
    },
    {
      title: "Agencies",
      description: "Scale client management with automated campaign optimization",
      icon: "🏢",
      metrics: "+400% client capacity",
      caseStudy: "Digital agency scaled from 10 to 50 clients with same team",
    },
    {
      title: "Content Creators",
      description: "Maximize reach and engagement across multiple platforms",
      icon: "🎨",
      metrics: "+300% engagement",
      caseStudy: "Influencer grew from 10K to 1M followers in 8 months",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section with Video Background */}
      <section
        ref={heroRef}
        className="relative container mx-auto px-4 py-20 overflow-hidden min-h-screen flex items-center"
      >
        <HeroBackground />
        <FloatingElements />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto relative z-10"
        >
          {/* A/B Test for Hero Content */}
          <ABTest
            testId="hero-headline"
            variants={[
              { id: "a", name: "Original", weight: 0.5, component: HeroVariantA },
              { id: "b", name: "Variant", weight: 0.5, component: HeroVariantB },
            ]}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Powered by Advanced Multi-Agent AI
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Awan Keusahawanan
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            The future of social media marketing is here. Our revolutionary multi-agent AI system orchestrates campaigns
            across all platforms with <span className="font-semibold text-blue-600">unprecedented precision</span> and
            <span className="font-semibold text-purple-600"> 24/7 automation</span>.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {isSignedIn ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <SignUpButton mode="modal">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </SignUpButton>
            )}
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50 transition-all duration-300"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              14-day free trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Live Performance Metrics */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Performance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time metrics showing the power and scale of our AI-driven marketing platform.
          </p>
        </motion.div>

        <PerformanceMetrics />
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Trusted by Marketing Leaders Worldwide</h2>
            <p className="text-xl opacity-90">Join thousands of brands scaling their social media success</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 text-center mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  className="mb-4 flex justify-center text-white/80"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.icon}
                </motion.div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  className="mb-3 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {achievement.icon}
                </motion.div>
                <h4 className="font-semibold mb-1">{achievement.title}</h4>
                <p className="text-sm opacity-80">{achievement.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">See Our AI Agents in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how our multi-agent system works together to create, optimize, and manage your campaigns
            automatically.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <InteractiveDemo />
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powered by Advanced AI Technology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge multi-agent system combines the power of machine learning, natural language processing, and
            predictive analytics to revolutionize your marketing strategy.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {features.map((feature, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className="group">
              <div className="p-8">
                <motion.div
                  className="mb-6 flex items-center justify-between"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <div className="mr-4 p-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  </div>
                  <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {feature.stats}
                  </div>
                </motion.div>

                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <motion.li
                      key={benefitIndex}
                      className="flex items-center text-gray-700"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + benefitIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect All Your Platforms</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seamlessly manage campaigns across all major social media platforms with unified analytics and
              optimization.
            </p>
          </motion.div>

          <PlatformShowcase />
        </div>
      </section>

      {/* Use Cases Section with Case Studies */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Perfect for Every Business</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From startups to enterprises, our AI-powered platform scales with your business needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <AnimatedCard key={index} delay={index * 0.1}>
              <div className="p-6 text-center">
                <motion.div
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {useCase.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full mb-3">
                  {useCase.metrics}
                </div>
                <p className="text-xs text-gray-500 italic">{useCase.caseStudy}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* Mobile App Preview */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <MobileAppPreview />
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Use our interactive calculator to find the perfect plan for your team size and needs.
          </p>
        </motion.div>

        <PricingCalculator />
      </section>

      {/* ROI Calculator */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Calculate Your Potential Savings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how much time and money you could save by switching to our AI-powered marketing platform.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose AI-Powered Marketing?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our advanced AI system compares to traditional marketing tools and manual processes.
          </p>
        </motion.div>

        <FeatureComparison />
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-r from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of businesses already using AI to scale their social media success. Start your free trial
              today and see the difference intelligent automation can make.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <SignUpButton mode="modal">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </SignUpButton>
              )}
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-sm opacity-80">No credit card required • 14-day free trial • Cancel anytime</div>
          </motion.div>
        </div>
      </section>

      {/* Live Chat Component */}
      <LiveChat />
    </div>
  )
}
