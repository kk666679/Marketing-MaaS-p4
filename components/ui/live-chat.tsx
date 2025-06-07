"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help you learn more about Marketing MaaS. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const botResponses = {
    pricing: "Our pricing starts at $29/month for the Starter plan. Would you like to see all our pricing options?",
    features:
      "Marketing MaaS includes AI content generation, multi-platform management, real-time analytics, and 24/7 automation. What specific feature interests you most?",
    demo: "I'd be happy to show you a demo! You can watch our interactive demo on this page or schedule a personalized demo with our team.",
    trial:
      "Yes! We offer a 14-day free trial with no credit card required. You can start immediately and explore all features.",
    support:
      "We provide 24/7 support via chat, email, and phone. Enterprise customers also get a dedicated account manager.",
    platforms:
      "We support Instagram, TikTok, LinkedIn, Twitter/X, Facebook, YouTube, Snapchat, and Twitch. More platforms are added regularly!",
    default:
      "That's a great question! Our AI-powered platform can help with that. Would you like to schedule a call with our team for a detailed discussion?",
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    if (message.includes("price") || message.includes("cost") || message.includes("pricing")) {
      return botResponses.pricing
    }
    if (message.includes("feature") || message.includes("what") || message.includes("how")) {
      return botResponses.features
    }
    if (message.includes("demo") || message.includes("show")) {
      return botResponses.demo
    }
    if (message.includes("trial") || message.includes("free")) {
      return botResponses.trial
    }
    if (message.includes("support") || message.includes("help")) {
      return botResponses.support
    }
    if (message.includes("platform") || message.includes("social")) {
      return botResponses.platforms
    }
    return botResponses.default
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 h-96 z-50"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-lg flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Marketing MaaS Support
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800 border"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                          {message.sender === "user" && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-gray-100 p-3 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} size="sm" className="px-3">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
