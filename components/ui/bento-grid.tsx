import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

// Reusable bento grid container
const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn("grid w-full auto-rows-[20rem] grid-cols-3 gap-3", className)}>
      {children}
    </div>
  )
}

// Individual bento card — dark themed for SmartFlow
const BentoCard = ({
  name,
  className,
  background,
  icon,
  description,
}: {
  name: string
  className: string
  background: ReactNode
  icon: ReactNode
  description: string
}) => {
  const isHumanCountCard = name === "Overall Human Count"
  const isPeakHoursCard = name === "Peak Hours 24h"

  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
        // SmartFlow dark surface style
        "bg-[#111F18] border border-[#1D9E75]/20",
        "transform-gpu transition-all duration-300 hover:border-[#1D9E75]/50 hover:shadow-[0_0_30px_rgba(29,158,117,0.1)]",
        className,
      )}
    >
      {/* background visual — heatmap, chart, etc */}
      <div className="absolute inset-0">{background}</div>

      {/* fixed top-left header for Peak Hours card */}
      {isPeakHoursCard && (
        <div className="absolute top-4 left-4 z-20">
          <div className="mb-1 text-sf-teal">{icon}</div>
          <h3 className="text-[0.81rem] font-semibold text-white">{name}</h3>
        </div>
      )}

      {/* card content — slides up on hover */}
      <div
        className={cn(
          "relative z-10 mt-auto p-6 transition-all duration-300 group-hover:-translate-y-2",
          isHumanCountCard && "pb-3",
        )}
      >
        {!isPeakHoursCard && (
          <>
            <div className="mb-2 text-sf-teal">{icon}</div>
            <h3 className="text-base font-semibold text-white mb-1">{name}</h3>
          </>
        )}
        {description && <p className="text-xs text-white/50 leading-relaxed">{description}</p>}
      </div>

      {/* subtle hover overlay */}
      <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-[#1D9E75]/[0.03]" />
    </div>
  )
}

export { BentoCard, BentoGrid }

