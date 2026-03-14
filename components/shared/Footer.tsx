"use client"
import { motion } from "framer-motion"
import SmartFlowLogo from "@/components/shared/SmartFlowLogo"

export default function Footer() {
  const links = {
    Platform: ["Realtime Monitoring", "Heatmapping", "Trajectory Analysis", "Peak Hours", "Inclusive Mobility"],
    Company: ["About SmartFlow", "Case Studies", "Privacy Policy", "Terms of Service"],
    Markets: ["Transport Agencies", "Municipality Planning", "Commercial Real Estate", "Retail Analytics"],
    Contact: ["hello@smartflow.city", "Baku, Azerbaijan", "Request Demo", "Partner Program"],
  }

  return (
    <footer className="bg-[#111F18] border-t border-[#1D9E75]/15 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* top row — logo + tagline */}
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div className="max-w-xs">
            {/* SmartFlow logo */}
            <div className="flex items-center gap-2 mb-3">
              <SmartFlowLogo size={28} />
              <span className="text-white font-semibold text-lg">SmartFlow</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              Urban mobility intelligence platform. Converting human movement into actionable city intelligence — for
              transport operators, planners, and commercial districts.
            </p>
            {/* live status indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-1.5 h-1.5 rounded-full bg-sf-teal animate-pulse" />
              <span className="text-[10px] text-sf-teal font-mono">All systems operational</span>
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">{category}</h4>
                <ul className="space-y-2">
                  {items.map((item) => {
                    const isPricingLink =
                      item.toLowerCase().includes("pricing") || item.toLowerCase().includes("view pricing")
                    return (
                      <li key={item}>
                        <a
                          href={isPricingLink ? "/pricing" : "#"}
                          className="text-white/40 text-xs hover:text-sf-teal transition-colors duration-200"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="border-t border-[#1D9E75]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs font-mono">
            © 2026 SmartFlow Technologies. .
          </p>
          <p className="text-white/25 text-xs font-mono">
            Privacy-first · No personal data stored · GDPR-compatible
          </p>
        </div>
      </div>
    </footer>
  )
}

