"use client"
import { MarqueeLogoScroller } from "@/components/ui/marquee-logo-scroller"

// Partners — Azerbaijani orgs + global smart city tech players
// Logo URLs use Wikipedia SVG/PNG — most reliable public sources
const partners = [
  {
    // PASHA Holding — largest Azerbaijani private conglomerate (local logo for reliable load in browser)
    src: "/logos/Gemini_Generated_Image_7is1hc7is1hc7is1.png",
    alt: "PASHA Holding",
    gradient: { from: "#0f2952", via: "#1a4080", to: "#0a1f3d" },
    fallbackImage: "/logos/Gemini_Generated_Image_7is1hc7is1hc7is1.png",
  },
  {
    // Baku Metro — direct transport operator, core client (local logo for reliable load in browser)
    src: "/logos/Gemini_Generated_Image_kq8gf9kq8gf9kq8g.png",
    alt: "Baku Metro",
    gradient: { from: "#00247d", via: "#0035b3", to: "#001a5c" },
    fallbackImage: "/logos/Gemini_Generated_Image_kq8gf9kq8gf9kq8g.png",
  },
  {
    // Google Cloud — AI/ML processing partner (local logo for reliable load in browser)
    src: "/logos/Gemini_Generated_Image_n6xmswn6xmswn6xm (1).png",
    alt: "Google Cloud",
    gradient: { from: "#1a73e8", via: "#34a853", to: "#ea4335" },
    fallbackImage: "/logos/Gemini_Generated_Image_n6xmswn6xmswn6xm (1).png",
  },
  {
    // AYNA — mapping and mobility data (local logo for reliable load in browser)
    src: "/logos/Gemini_Generated_Image_kvq364kvq364kvq3.png",
    alt: "AYNA",
    gradient: { from: "#00b4d8", via: "#0096c7", to: "#0077b6" },
    fallbackImage: "/logos/Gemini_Generated_Image_kvq364kvq364kvq3.png",
  },
  
]

export default function PartnersSection() {
  return (
    <section id="partners" className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#1D9E75]/30 bg-[#1D9E75]/5 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] animate-pulse" />
          <span className="text-xs text-[#1D9E75] font-mono">Trusted Partners & Clients</span>
        </div>
      </div>

      <MarqueeLogoScroller
        title="Trusted by cities, operators and innovators"
        description="SmartFlow partners with transport agencies, commercial real estate groups, and global technology providers to bring mobility intelligence to urban infrastructure."
        logos={partners}
        speed="normal"
      />
    </section>
  )
}

