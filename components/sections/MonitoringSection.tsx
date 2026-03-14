"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Activity, Users, Map, Navigation, Clock } from "lucide-react"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"

// ─── BACKGROUND VISUALS ───────────────────────────────────────────────

// 1. Realtime monitoring — animated pulse rings from a center point
function RealtimeBg() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* city grid lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29,158,117,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.07) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* pulse rings expanding outward — simulates live signal */}
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sf-teal/40"
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{ width: 300 * i, height: 300 * i, opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
        />
      ))}
      {/* center dot */}
      <div className="w-3 h-3 rounded-full bg-sf-teal shadow-[0_0_20px_#1D9E75] z-10" />
      {/* live indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-sf-teal animate-pulse" />
        <span className="text-[10px] text-sf-teal font-mono">LIVE</span>
      </div>
    </div>
  )
}

// 2. Human count — animated number ticker + sparkline
function HumanCountBg() {
  const [count, setCount] = useState(12847)

  // simulate live count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 20) - 5)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
      {/* big animated number */}
      <motion.div
        key={count}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl font-bold font-mono text-sf-teal-light tabular-nums"
      >
        {count.toLocaleString()}
      </motion.div>
      <div className="text-[10px] text-white/40 mt-1 font-mono">pedestrians / hour</div>
      <div className="text-[9px] text-white/30 mt-1 font-mono">last 12 hours · Icherisheher District</div>

      {/* fake sparkline bars */}
      <div className="flex items-end gap-1 mt-6 h-12">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
          <motion.div
            key={i}
            className="w-3 rounded-t"
            style={{ height: `${h}%`, background: i === 11 ? "#1D9E75" : "#1D9E7540" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}

// 3. Heatmap visual — colored grid cells simulating density
function HeatmapBg() {
  // mock density grid — higher numbers = warmer color
  const grid = [
    [0.1, 0.2, 0.4, 0.7, 0.9, 0.8, 0.5],
    [0.2, 0.5, 0.8, 1.0, 0.9, 0.6, 0.3],
    [0.3, 0.6, 0.9, 0.8, 0.7, 0.4, 0.2],
    [0.1, 0.3, 0.5, 0.6, 0.5, 0.3, 0.1],
    [0.1, 0.2, 0.3, 0.4, 0.3, 0.2, 0.1],
  ]

  // interpolate between teal (low) → amber (mid) → coral (high)
  const getColor = (v: number) => {
    if (v < 0.4) return `rgba(29,158,117,${v * 1.5})`
    if (v < 0.7) return `rgba(239,159,39,${v})`
    return `rgba(216,90,48,${v})`
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        {grid.map((row, ri) => (
          <div key={ri} className="flex gap-1 mb-1">
            {row.map((val, ci) => (
              <motion.div
                key={ci}
                className="flex-1 rounded-sm"
                style={{ height: "28px", backgroundColor: getColor(val) }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [val * 0.8, val, val * 0.9, val] }}
                transition={{ duration: 2 + ci * 0.3, repeat: Infinity, delay: ri * 0.2 }}
              />
            ))}
          </div>
        ))}
        <div className="flex justify-between mt-2">
          <span className="text-[9px] text-sf-teal font-mono">Low density</span>
          <span className="text-[9px] text-sf-coral font-mono">High density</span>
        </div>
      </div>
    </div>
  )
}

// 4. Trajectory — animated paths across an SVG canvas
function TrajectoryBg() {
  const paths = [
    "M 20 80 Q 80 20 160 60 T 280 40",
    "M 40 120 Q 100 60 180 100 T 300 70",
    "M 10 60 Q 70 140 150 80 T 290 110",
    "M 60 150 Q 120 40 200 120 T 310 80",
    "M 30 100 Q 90 30 170 90 T 295 50",
  ]

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* grid bg */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(29,158,117,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,158,117,0.05) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <svg className="w-full h-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
        {paths.map((d, i) => (
          <g key={i}>
            {/* static faint path */}
            <path d={d} fill="none" stroke="#1D9E7530" strokeWidth="1" />
            {/* animated moving dot along the path */}
            <circle r="2.5" fill={i % 2 === 0 ? "#5DCAA5" : "#7F77DD"} opacity="0.9">
              <animateMotion dur={`${2.5 + i * 0.5}s`} repeatCount="indefinite" path={d} />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  )
}

// 5. Peak hours — 24h bar chart mock
function PeakHoursBg() {
  // typical city pedestrian pattern — low at night, peaks at 8-9am and 5-7pm
  const hours = [
    { h: "00", v: 5 },
    { h: "01", v: 3 },
    { h: "02", v: 2 },
    { h: "03", v: 2 },
    { h: "04", v: 4 },
    { h: "05", v: 8 },
    { h: "06", v: 20 },
    { h: "07", v: 55 },
    { h: "08", v: 90 },
    { h: "09", v: 85 },
    { h: "10", v: 65 },
    { h: "11", v: 60 },
    { h: "12", v: 70 },
    { h: "13", v: 72 },
    { h: "14", v: 60 },
    { h: "15", v: 55 },
    { h: "16", v: 65 },
    { h: "17", v: 88 },
    { h: "18", v: 95 },
    { h: "19", v: 80 },
    { h: "20", v: 55 },
    { h: "21", v: 40 },
    { h: "22", v: 25 },
    { h: "23", v: 12 },
  ]

  return (
    <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6">
      <div className="flex items-end gap-[2px] h-32 mb-2">
        {hours.map(({ v }, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm"
            // peak hours glow amber/coral, normal hours are teal
            style={{
              originY: 1,
              height: `${v}%`,
              background: v >= 80 ? "#EF9F27" : v >= 60 ? "#1D9E75" : "#1D9E7540",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.03, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <span className="text-[9px] text-white/30 font-mono">00:00</span>
        <span className="text-[9px] text-sf-amber font-mono">↑ Peak: 18:00–19:00</span>
        <span className="text-[9px] text-white/30 font-mono">23:00</span>
      </div>
    </div>
  )
}

// ─── SECTION ─────────────────────────────────────────────────────────

const cards = [
  {
    name: "Realtime Monitoring",
    description:
      "Live pedestrian flow tracking across transport nodes, crossings, and public spaces. Updates every 30 seconds.",
    icon: <Activity size={20} />,
    background: <RealtimeBg />,
    className: "lg:col-span-2 lg:row-span-1",
  },
  {
    name: "Overall Human Count",
    description: "",
    icon: <Users size={20} />,
    background: <HumanCountBg />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Heatmap Density",
    description: "Spatial density visualisation — identify congestion hotspots, underused corridors, and pressure zones.",
    icon: <Map size={20} />,
    background: <HeatmapBg />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Trajectory Mapping",
    description: "Origin-to-destination path analysis — understand how people actually navigate urban space.",
    icon: <Navigation size={20} />,
    background: <TrajectoryBg />,
    className: "lg:col-span-1 lg:row-span-1",
  },
  {
    name: "Peak Hours 24h",
    description: "",
    icon: <Clock size={20} />,
    background: <PeakHoursBg />,
    className: "lg:col-span-1 lg:row-span-1",
  },
]

export default function MonitoringSection() {
  return (
    <section id="monitoring" className="py-20 px-6 max-w-6xl mx-auto">
      {/* section header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sf-teal/30 bg-sf-teal/5 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sf-teal animate-pulse" />
          <span className="text-xs text-sf-teal font-mono">Platform Overview</span>
        </div>
        <h2 className="text-4xl font-light text-white mb-4">
          Everything you need to understand <span className="text-sf-teal">urban movement</span>
        </h2>
        <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
          Five intelligence layers. One platform. From raw pedestrian counts to spatial planning insights.
        </p>
      </div>

      <BentoGrid className="lg:grid-rows-2">
        {cards.map((card) => (
          <BentoCard key={card.name} {...card} />
        ))}
      </BentoGrid>
    </section>
  )
}

