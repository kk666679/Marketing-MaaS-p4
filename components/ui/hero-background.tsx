"use client"

import Image from "next/image"

export function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <Image
        src="/public/hero_section_background.webp"
        alt="AI Brain with Social Media Icons"
        fill
        priority
        className="object-cover"
        quality={100}
      />
    </div>
  )
}
