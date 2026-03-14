"use client"

import type { ReactNode } from "react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

type Testimonial = {
  quote: string
  name: string
  designation: string
  src?: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  interval?: number
  className?: string
  renderAvatar?: (t: Testimonial) => ReactNode
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  interval = 7000,
  className,
  renderAvatar,
}: AnimatedTestimonialsProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!autoplay || testimonials.length <= 1) return
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)
    return () => clearInterval(id)
  }, [autoplay, interval, testimonials.length])

  const current = testimonials[index]

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col gap-6 rounded-2xl border border-[#1D9E75]/15 bg-[#111F18] p-6 sm:p-8 md:flex-row md:items-center",
        className,
      )}
    >
      <div className="w-full md:w-1/3 flex flex-col items-center md:items-start gap-3">
        <TestimonialAvatar testimonial={current} renderAvatar={renderAvatar} />
        <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-white/40">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-sf-teal animate-pulse" />
          <span>TESTIMONIALS</span>
        </div>
        <p className="text-sm text-white/60 max-w-xs">
          Stories from transport planners, accessibility leads, and commercial operators using SmartFlow data in the field.
        </p>
      </div>

      <div className="w-full md:w-2/3">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-full flex-col justify-between gap-4"
          >
            <p className="text-sm leading-relaxed text-white/80">&ldquo;{current.quote}&rdquo;</p>
            <div>
              <p className="text-sm font-medium text-white">{current.name}</p>
              <p className="text-[11px] text-white/50 mt-0.5">{current.designation}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex items-center justify-between">
          <Dots count={testimonials.length} activeIndex={index} />
          <div className="flex items-center gap-2">
            <NavButton aria-label="Previous testimonial" onClick={handlePrev}>
              <IconArrowLeft className="h-4 w-4" />
            </NavButton>
            <NavButton aria-label="Next testimonial" onClick={handleNext}>
              <IconArrowRight className="h-4 w-4" />
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  )
}

function TestimonialAvatar({
  testimonial,
  renderAvatar,
}: {
  testimonial: Testimonial
  renderAvatar?: (t: Testimonial) => ReactNode
}) {
  if (renderAvatar) {
    return <>{renderAvatar(testimonial)}</>
  }

  const initials = testimonial.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")

  return (
    <div className="relative flex items-center gap-3">
      <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-sf-teal/40 via-sf-purple/30 to-sf-amber/30">
        {testimonial.src ? (
          <img
            src={testimonial.src}
            alt={testimonial.name}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={(e) => {
              // If image fails to load, fall back to gradient + initials
              e.currentTarget.style.display = "none"
            }}
          />
        ) : null}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white mix-blend-screen">
          {initials}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white">{testimonial.name}</span>
        <span className="text-[11px] text-white/50">{testimonial.designation}</span>
      </div>
    </div>
  )
}

function Dots({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-4 rounded-full bg-white/10 transition-all duration-200",
            i === activeIndex && "bg-sf-teal w-6",
          )}
        />
      ))}
    </div>
  )
}

function NavButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-sf-teal hover:text-sf-night"
      {...props}
    >
      {children}
    </button>
  )
}

