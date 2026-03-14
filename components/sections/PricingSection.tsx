"use client"
import { Pricing } from "@/components/ui/pricing"

/*
  SmartFlow pricing — designed for Azerbaijani + regional market
  
  Considerations:
  - Azerbaijan GDP per capita ~$6,800 USD (2024)
  - Public sector (B2G) procurement is price-sensitive, needs annual contracts
  - Commercial (B2B) clients: malls, real estate, banks — used to SaaS pricing
  - Prices in USD as international standard; can be shown in AZN on request
  
  Tiers:
  - Pilot: single zone / single location — low commitment for gov pilots
  - City Core: full district coverage — main B2G product
  - Enterprise: multi-district + custom API + dedicated support
*/

const smartflowPlans = [
  {
    name: "PILOT",
    price: "490", // $490/mo monthly — affordable for commercial clients (malls, campuses)
    yearlyPrice: "390", // $390/mo billed annually = save ~20%
    period: "per month",
    features: [
      "1 monitored zone or location",
      "Pedestrian heatmap (hourly updates)",
      "24h peak hour detection",
      "Pass count dashboard",
      "Basic PDF reports",
      "Email support",
      "30-day free trial",
    ],
    description: "Perfect for a single bus stop, mall entrance, or campus to validate SmartFlow.",
    buttonText: "Start Free Trial",
    href: "#contact",
    isPopular: false,
  },
  {
    name: "CITY CORE",
    price: "1990", // $1,990/mo — competitive for transport agencies vs custom dev
    yearlyPrice: "1590", // ~20% annual discount
    period: "per month",
    features: [
      "Up to 15 monitored zones",
      "Real-time flow monitoring",
      "Full heatmap + trajectory mapping",
      "Inclusive mobility scoring",
      "Peak hour 24h analytics",
      "GIS export (Shapefile, GeoJSON)",
      "API access (REST)",
      "Priority support + onboarding",
      "Monthly strategy review call",
    ],
    description: "For city transport departments and large commercial districts requiring full spatial intelligence.",
    buttonText: "Get Started",
    href: "#contact",
    isPopular: true, // most relevant for the hackathon demo audience
  },
  {
    name: "ENTERPRISE",
    price: "4900", // $4,900/mo — full city deployment, dedicated team
    yearlyPrice: "3900",
    period: "per month",
    features: [
      "Unlimited monitored zones",
      "Custom CV sensor deployment",
      "White-label dashboard option",
      "Dedicated account manager",
      "SLA 99.5% uptime guarantee",
      "Custom analytics & reporting",
      "On-premise deployment option",
      "Integration with existing GIS/BMS",
      "Quarterly planning workshops",
      "Government procurement support",
    ],
    description:
      "Full city-scale deployment with dedicated infrastructure, custom integrations, and government SLA.",
    buttonText: "Contact Sales",
    href: "#contact",
    isPopular: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 px-6 bg-[#0B1B14]">
      {/* section badge */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sf-teal/30 bg-sf-teal/5 mb-4">
          <span className="text-xs text-sf-teal font-mono">Pricing</span>
        </div>
      </div>

      <Pricing
        plans={smartflowPlans}
        title="Transparent pricing for every scale"
        description={`From a single transit stop to an entire city network.\nAll plans include privacy-first CV processing — no personal data stored.`}
      />

      {/* disclaimer note under pricing */}
      <p className="text-center text-xs text-white/30 mt-6 font-mono">
        Prices in USD · AZN pricing available · Government procurement packages on request · VAT not included
      </p>
    </section>
  )
}

