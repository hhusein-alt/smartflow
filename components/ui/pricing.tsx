"use client"

import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import NumberFlow from "@number-flow/react"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type BillingInterval = "monthly" | "yearly"

export type PricingPlan = {
  name: string
  price: string
  yearlyPrice: string
  period: string
  features: string[]
  description: string
  buttonText: string
  href: string
  isPopular?: boolean
  badge?: ReactNode
}

interface PricingProps {
  title: string
  description?: string
  plans: PricingPlan[]
}

export function Pricing({ title, description, plans }: PricingProps) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("monthly")

  const handleToggleBilling = () => {
    setBillingInterval((prev) => {
      const next = prev === "monthly" ? "yearly" : "monthly"
      if (next === "yearly") {
        // little celebratory moment when switching to annual
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.3 },
          scalar: 0.8,
        })
      }
      return next
    })
  }

  const isYearly = billingInterval === "yearly"

  const sortedPlans = useMemo(
    () =>
      [...plans].sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1
        if (!a.isPopular && b.isPopular) return 1
        return 0
      }),
    [plans],
  )

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-light text-white mb-3">{title}</h2>
        {description ? (
          <p className="text-sm text-white/60 whitespace-pre-line max-w-2xl mx-auto">{description}</p>
        ) : null}
      </div>

      <div className="mb-8 flex items-center justify-center gap-3">
        <Label
          htmlFor="billing-toggle"
          className={cn(
            "text-xs font-mono tracking-[0.18em] uppercase",
            !isYearly ? "text-sf-teal" : "text-white/60",
          )}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={isYearly}
          onCheckedChange={handleToggleBilling}
          className="data-[state=checked]:bg-sf-teal"
        />
        <Label
          htmlFor="billing-toggle"
          className={cn(
            "text-xs font-mono tracking-[0.18em] uppercase",
            isYearly ? "text-sf-teal" : "text-white/60",
          )}
        >
          Annual
        </Label>
        <span className="ml-2 rounded-full bg-sf-teal/10 px-2 py-0.5 text-[10px] font-mono text-sf-teal">
          SAVE ~20% YEARLY
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sortedPlans.map((plan) => (
          <PlanCard key={plan.name} plan={plan} billingInterval={billingInterval} />
        ))}
      </div>
    </div>
  )
}

function PlanCard({ plan, billingInterval }: { plan: PricingPlan; billingInterval: BillingInterval }) {
  const isYearly = billingInterval === "yearly"
  const amount = isYearly ? plan.yearlyPrice : plan.price

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border border-white/10 bg-[#111F18] p-6 shadow-sm",
        plan.isPopular && "border-primary bg-gradient-to-b from-primary/10 via-[#111F18] to-[#111F18]",
      )}
    >
      {plan.isPopular ? (
        <div className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-primary-foreground shadow-lg">
          Most popular
        </div>
      ) : null}

      <div className="mb-4">
        <h3 className="text-sm font-semibold tracking-[0.12em] text-white/70 uppercase">{plan.name}</h3>
        <p className="mt-1 text-xs text-white/50 leading-relaxed">{plan.description}</p>
      </div>

      <div className="mb-4 flex items-baseline gap-1">
        <span className="text-sm text-white/60">$</span>
        <NumberFlow
          value={Number(amount)}
          className={cn(
            "text-3xl sm:text-4xl font-semibold tabular-nums",
            plan.isPopular ? "text-primary" : "text-white",
          )}
        />
        <span className="ml-1 text-xs text-white/50">/ {plan.period}</span>
      </div>

      <ul className="mb-5 flex flex-1 flex-col gap-2 text-xs text-white/70">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-sf-teal" />
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.href}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-xs font-medium transition-colors",
          plan.isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-white/10 text-white hover:bg-white/20",
        )}
      >
        {plan.buttonText}
      </a>
    </div>
  )
}

