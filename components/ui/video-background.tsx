"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoBackground() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onLoadedData={() => setIsLoaded(true)}
      >
        <source src="/placeholder.mp4" type="video/mp4" />
      </video>

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 right-4 flex gap-2 z-10"
        >
          <Button variant="outline" size="sm" onClick={togglePlay} className="bg-white/80 backdrop-blur-sm">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleMute} className="bg-white/80 backdrop-blur-sm">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
    </div>
  )
}
