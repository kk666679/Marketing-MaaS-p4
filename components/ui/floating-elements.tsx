"use client"

import { motion } from "framer-motion"
import { Zap, Target, BarChart3, Shield, Sparkles, TrendingUp } from "lucide-react"

export function FloatingElements() {
  const elements = [
    { icon: Zap, delay: 0, x: "10%", y: "20%" },
    { icon: Target, delay: 0.5, x: "80%", y: "15%" },
    { icon: BarChart3, delay: 1, x: "15%", y: "70%" },
    { icon: Shield, delay: 1.5, x: "85%", y: "75%" },
    { icon: Sparkles, delay: 2, x: "50%", y: "10%" },
    { icon: TrendingUp, delay: 2.5, x: "70%", y: "50%" },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((Element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: Element.x, top: Element.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.1, 0.3],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            delay: Element.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Element.icon className="w-8 h-8 text-blue-400/30" />
        </motion.div>
      ))}
    </div>
  )
}
