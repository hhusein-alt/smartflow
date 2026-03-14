"use client"
import { ShaderBackground, Header, HeroContent, PulsingCircle } from "@/components/ui/shaders-hero-section"

export default function HeroSection() {
  return (
    <ShaderBackground>
      <Header />
      <HeroContent />
      <PulsingCircle />
    </ShaderBackground>
  )
}

