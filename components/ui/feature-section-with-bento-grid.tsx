"use client"
import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import createGlobe from "cobe"
import { motion } from "framer-motion"

export function HowItWorksSection() {
  const features = [
    {
      title: "Computer Vision Capture",
      description:
        "Cameras + CV models detect and anonymise pedestrians in real time. No personal data stored — only movement vectors.",
      skeleton: <SkeletonCapture />,
      className: "col-span-1 md:col-span-4 lg:col-span-4 border-b border-r border-[#1D9E75]/15",
    },
    {
      title: "Spatial Intelligence Layer",
      description: "Raw trajectories become heatmaps, corridor scores, and peak-hour curves. Updated every 30 seconds.",
      skeleton: <SkeletonSpatial />,
      className: "col-span-1 md:col-span-2 lg:col-span-2 border-b border-[#1D9E75]/15",
    },
    {
      title: "Inclusive Mobility Scoring",
      description:
        "Every route scored for wheelchair users, parents with prams, elderly pedestrians. Barrier detection built in.",
      skeleton: <SkeletonInclusive />,
      className: "col-span-1 md:col-span-3 lg:col-span-3 border-b border-r border-[#1D9E75]/15",
    },
    {
      title: "City-Scale Deployment",
      description: "Multi-zone coverage across entire districts. Already operational in 2 cities, expanding across the region.",
      skeleton: <SkeletonGlobe />,
      className: "col-span-1 md:col-span-3 lg:col-span-3 border-b border-[#1D9E75]/15",
    },
  ]

  return (
    <div id="how-it-works" className="relative z-20 py-16 lg:py-32 max-w-7xl mx-auto">
      <div className="px-8 text-center">
        {/* section badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sf-teal/30 bg-sf-teal/5 mb-4">
          <span className="text-xs text-sf-teal font-mono">How It Works</span>
        </div>
        <h2 className="text-4xl lg:text-5xl font-light text-white max-w-3xl mx-auto mb-4">
          From camera to <span className="text-sf-teal">city intelligence</span>
        </h2>
        <p className="text-sm text-white/50 max-w-xl mx-auto">
          Four layers of processing turn raw pedestrian movement into actionable planning intelligence — in near real time.
        </p>
      </div>

      <div className="relative mt-12">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 xl:border rounded-xl border-[#1D9E75]/15 overflow-hidden">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className="h-64 w-full mt-4">{feature.skeleton}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("p-6 sm:p-8 relative overflow-hidden bg-[#0B1B14]", className)}>{children}</div>
)

const FeatureTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white text-xl font-medium tracking-tight">{children}</p>
)

const FeatureDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-sm">{children}</p>
)

// Skeleton 1: camera → CV processing visualization
function SkeletonCapture() {
  return (
    <div
      className="relative flex items-center justify-center h-full rounded-xl overflow-hidden"
      style={{
        backgroundImage: 'url("/processed-image%20(15).png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* subtle dark overlay so scan UI remains readable while photo shows through */}
      <div className="absolute inset-0 bg-[#111F18]/70 mix-blend-multiply pointer-events-none" />
      {/* scanning line animation */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sf-teal to-transparent z-10"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ top: "0%" }}
      />
      {/* fake detection boxes */}
      {[
        { top: "18%", left: "18%", w: 55, h: 70 },
        { top: "12%", left: "47%", w: 55, h: 70 },
        { top: "15%", left: "74%", w: 50, h: 65 },
      ].map((box, i) => (
        <motion.div
          key={i}
          className="absolute border border-sf-teal/70 rounded-sm z-10"
          style={{ top: box.top, left: box.left, width: box.w, height: box.h }}
          animate={{
            borderColor: [
              "rgba(29,158,117,0.4)",
              "rgba(29,158,117,0.9)",
              "rgba(29,158,117,0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-sf-teal animate-pulse" />
        <span className="text-[9px] text-sf-teal font-mono">CV PROCESSING · 0 FACES STORED</span>
      </div>
    </div>
  )
}

// Skeleton 2: animated flowing data chart
function SkeletonSpatial() {
  const bars = [30, 55, 45, 70, 60, 85, 75, 90, 65, 80]
  const startHour = 8
  const labels = bars.map((_, i) => `${String(startHour + i).padStart(2, "0")}:00`)
  return (
    <div className="flex flex-col justify-end h-full pb-4 bg-[#111F18] rounded-xl px-4">
      <div className="flex items-end justify-center gap-2 flex-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-sf-teal"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: "easeOut",
              repeat: Infinity,
              repeatDelay: 3,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-2 text-[10px] text-white/40 font-mono">
        {labels.map((label) => (
          <span key={label} className="flex-1 text-center">
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

// Skeleton 3: inclusive route scoring display
function SkeletonInclusive() {
  const routes = [
    { label: "Wheelchair", score: 64, color: "#7F77DD" },
    { label: "Pram / Stroller", score: 78, color: "#5DCAA5" },
    { label: "Elderly", score: 55, color: "#EF9F27" },
    { label: "Visually Impaired", score: 42, color: "#D85A30" },
  ]
  return (
    <div className="bg-[#111F18] rounded-xl p-4 h-full flex flex-col justify-center gap-3">
      {routes.map((r, i) => (
        <div key={i}>
          <div className="flex justify-between mb-1">
            <span className="text-[10px] text-white/60 font-mono">{r.label}</span>
            <span className="text-[10px] font-mono" style={{ color: r.color }}>
              {r.score}/100
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: r.color }}
              initial={{ width: 0 }}
              animate={{ width: `${r.score}%` }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Skeleton 4: rotating globe with Baku + key cities
function SkeletonGlobe() {
  return (
    <div className="h-full flex items-center justify-center bg-[#111F18] rounded-xl overflow-hidden relative">
      <Globe className="absolute -bottom-20" />
    </div>
  )
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    let phi = 0
    if (!canvasRef.current) return
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 400 * 2,
      height: 400 * 2,
      phi: 1.2, // start centered near Baku
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5,
      baseColor: [0.1, 0.2, 0.15],
      markerColor: [0.11, 0.62, 0.46], // teal markers
      glowColor: [0.11, 0.62, 0.46],
      markers: [
        { location: [40.4093, 49.8671], size: 0.08 }, // Baku
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [48.8566, 2.3522], size: 0.04 }, // Paris
        { location: [41.0082, 28.9784], size: 0.05 }, // Istanbul
        { location: [55.7558, 37.6173], size: 0.04 }, // Moscow
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.005
      },
    })
    return () => globe.destroy()
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{ width: 400, height: 400, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  )
}

