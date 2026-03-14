"use client"

import { motion } from "framer-motion"
import { Leaf, TrendingUp, Users, Brain } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import GradientText from "@/components/ui/gradient-text"
import { cn } from "@/lib/utils"

// the four value cards for SmartFlow
const cards = [
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Supports lower-carbon, more efficient urban movement.",
    // green teal — environmental theme
    iconColor: "#1D9E75",
    iconBg: "rgba(29,158,117,0.1)",
    area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]",
  },
  {
    icon: TrendingUp,
    title: "Profitable",
    description: "Helps organisations save money and invest more wisely.",
    // amber — financial theme
    iconColor: "#EF9F27",
    iconBg: "rgba(239,159,39,0.1)",
    area: "md:[grid-area:1/7/2/13] xl:[grid-area:1/7/2/13]",
  },
  {
    icon: Users,
    title: "Inclusive",
    description: "Improves accessibility and real usability for diverse users.",
    // purple — inclusive/accessibility theme
    iconColor: "#7F77DD",
    iconBg: "rgba(127,119,221,0.1)",
    area: "md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]",
  },
  {
    icon: Brain,
    title: "Intelligent",
    description: "Transforms movement into actionable planning insight.",
    // light teal — data/intelligence theme
    iconColor: "#5DCAA5",
    iconBg: "rgba(93,202,165,0.1)",
    area: "md:[grid-area:2/7/3/13] xl:[grid-area:2/7/3/13]",
  },
]

// single card component with glowing border effect
const WhyCard = ({
  icon: Icon,
  title,
  description,
  iconColor,
  iconBg,
  area,
  index,
}: (typeof cards)[0] & { index: number }) => {
  return (
    <li className={cn("min-h-[12rem] list-none", area)}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative h-full rounded-[1.25rem] p-[1px]"
        style={{ border: "1px solid rgba(29,158,117,0.15)" }}
      >
        {/* glowing border that follows mouse */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />

        {/* card inner */}
        <div
          className="relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-[1.2rem] p-6"
          style={{ background: "#111F18" }}
        >
          {/* icon */}
          <div
            className="w-fit rounded-xl p-2.5"
            style={{ background: iconBg, border: `1px solid ${iconColor}30` }}
          >
            <Icon size={18} style={{ color: iconColor }} />
          </div>

          {/* text */}
          <div className="space-y-2">
            <h3
              className="text-xl font-semibold tracking-tight text-white"
            >
              {title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {description}
            </p>
          </div>

          {/* subtle corner accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-5"
            style={{ background: iconColor }}
          />
        </div>
      </motion.div>
    </li>
  )
}

export default function WhySmartFlowSection() {
  return (
    <section id="why" className="py-20 px-6 max-w-6xl mx-auto">

      {/* section header */}
      <div className="text-center mb-14">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4"
          style={{
            borderColor: "rgba(29,158,117,0.3)",
            background: "rgba(29,158,117,0.05)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-xs text-[#1D9E75] font-mono">Our Values</span>
        </div>

        {/* animated gradient title */}
        <GradientText
          colors={["#1D9E75", "#5DCAA5", "#7F77DD", "#5DCAA5", "#1D9E75"]}
          animationSpeed={6}
          className="text-4xl md:text-5xl font-light mb-4"
        >
          Why SmartFlow
        </GradientText>

        <p
          className="text-sm max-w-lg mx-auto leading-relaxed mt-4"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          Four principles that define how we approach city intelligence —
          and why they matter for the people who live and move through urban space.
        </p>
      </div>

      {/* 2x2 grid of cards */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
        {cards.map((card, i) => (
          <WhyCard key={card.title} {...card} index={i} />
        ))}
      </ul>

    </section>
  )
}
