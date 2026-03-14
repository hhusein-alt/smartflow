"use client"

import { PulsingBorder, MeshGradient } from "@paper-design/shaders-react"
import { motion } from "framer-motion"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import SmartFlowLogo from "@/components/shared/SmartFlowLogo"

interface ShaderBackgroundProps {
  children: React.ReactNode
}

// Main wrapper — handles mouse interaction state for the shader
export function ShaderBackground({ children }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)
    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen w-full relative overflow-hidden" id="hero">
      {/* SVG filters for glass and gooey effects */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0.02  0 1 0 0 0.05  0 0 1 0 0.08  0 0 0 0.9 0"
              result="tint"
            />
          </filter>
          <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* CHANGE: SmartFlow colors — dark green city night palette */}
      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#0B1B14", "#1D9E75", "#04342C", "#0B1B14", "#162820"]}
        speed={0.25}
        backgroundColor="#0B1B14"
      />
      {/* Second layer — subtle purple teal wireframe for data feel */}
      {/* @ts-ignore */}
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-40"
        colors={["#0B1B14", "#7F77DD", "#1D9E75", "#0B1B14"]}
        speed={0.15}
        wireframe="true"
        backgroundColor="transparent"
      />

      {children}
    </div>
  )
}

// Pulsing indicator — bottom right corner, represents live data signal
export function PulsingCircle() {
  return (
    <div className="absolute bottom-8 right-8 z-30">
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* CHANGE: SmartFlow teal/purple live indicator */}
        <PulsingBorder
          colors={["#5DCAA5", "#7F77DD", "#1D9E75", "#EF9F27", "#5DCAA5"]}
          colorBack="#00000000"
          speed={1.2}
          roundness={1}
          thickness={0.1}
          softness={0.2}
          intensity={4}
          spotsPerColor={4}
          spotSize={0.1}
          pulse={0.15}
          smoke={0.4}
          smokeSize={3}
          scale={0.65}
          rotation={0}
          frame={9161408}
          style={{ width: "60px", height: "60px", borderRadius: "50%" }}
        />
        {/* Rotating text — CHANGE to SmartFlow tagline */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transform: "scale(1.6)" }}
        >
          <defs>
            <path id="circle" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          </defs>
          <text className="text-sm fill-white/70">
            <textPath href="#circle" startOffset="0%">
              SmartFlow Live • City Intelligence • SmartFlow Live • City Intelligence •
            </textPath>
          </text>
        </motion.svg>
      </div>
    </div>
  )
}

// Hero text content — bottom left, CHANGED to SmartFlow copy
export function HeroContent() {
  return (
    <main className="absolute bottom-8 left-8 z-20 max-w-xl">
      <div className="text-left">
        {/* Badge */}
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative border border-white/10"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-sf-teal/40 to-transparent rounded-full" />
          <span className="text-white/80 text-xs font-light relative z-10">
            🟢 Live — Baku Metro District · 12,847 pedestrians/hr
          </span>
        </div>

        {/* CHANGE: SmartFlow headline */}
        <h1 className="text-5xl md:text-6xl md:leading-tight tracking-tight font-light text-white mb-4">
          <span className="font-medium text-sf-teal-light">Cities</span> move.
          <br />
          <span className="font-light text-white">We understand</span>
          <br />
          <span className="font-medium italic text-sf-purple">why.</span>
        </h1>

        {/* CHANGE: SmartFlow description */}
        <p className="text-xs font-light text-white/60 mb-6 leading-relaxed max-w-sm">
          SmartFlow converts human movement in urban space into actionable intelligence. Real-time heatmaps, pedestrian
          trajectories, accessibility scoring — built for cities, transport operators and commercial districts.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => (window.location.href = "/pricing")}
            className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-sf-teal/60 cursor-pointer"
          >
            View Pricing
          </button>
          <button
            onClick={() => document.getElementById("monitoring")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full bg-sf-teal text-white font-normal text-xs transition-all duration-200 hover:bg-sf-teal-light hover:text-sf-night cursor-pointer"
          >
            See Live Demo
          </button>
        </div>
      </div>
    </main>
  )
}

// Navbar — CHANGED logo and nav links to SmartFlow sections
export function Header() {
  const router = useRouter()
  const navLinks = [
    { label: "Platform", href: "#monitoring" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Partners", href: "#partners" },
  ]

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5">
      {/* SmartFlow logo with icon */}
      <div className="flex items-center gap-2">
        <SmartFlowLogo size={32} />
        <span className="text-white font-semibold text-lg tracking-tight">SmartFlow</span>
      </div>

      {/* Nav */}
      <nav className="hidden md:flex items-center space-x-1">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-white/70 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* CTA button group with gooey effect */}
      <div className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-sf-teal text-white font-normal text-xs transition-all duration-300 h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-20 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="px-6 py-2 rounded-full bg-sf-teal text-white font-normal text-xs transition-all duration-300 h-8 flex items-center z-10 hover:bg-sf-teal-light"
        >
          Get Access
        </button>
      </div>
    </header>
  )
}

