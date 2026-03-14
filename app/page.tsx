"use client"

// All section imports in order
import HeroSection from "@/components/sections/HeroSection"
import MonitoringSection from "@/components/sections/MonitoringSection"
import { HowItWorksSection } from "@/components/ui/feature-section-with-bento-grid"
import WhySmartFlowSection from "@/components/sections/WhySmartFlowSection"
import PartnersSection from "@/components/sections/PartnersSection"
import Footer from "@/components/shared/Footer"

export default function Home() {
  return (
    <main className="bg-sf-night overflow-x-hidden">
      {/* 1 — Hero with shader background */}
      <HeroSection />

      {/* 2 — Platform feature showcase (bento grid) */}
      <div className="bg-sf-night">
        <MonitoringSection />
      </div>

      {/* 3 — How it works (Aceternity bento) */}
      <div className="bg-sf-night">
        <HowItWorksSection />
      </div>

      {/* 4 — Why SmartFlow values section */}
      <div className="bg-sf-night">
        <WhySmartFlowSection />
      </div>

      {/* 5 — Trusted partners marquee */}
      <div className="bg-sf-night">
        <PartnersSection />
      </div>

      {/* 6 — Footer */}
      <Footer />
    </main>
  )
}
