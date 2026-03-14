"use client"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"

// Fictional but realistic testimonials — city planners, transport operators, commercial clients
const testimonials = [
  {
    quote:
      "SmartFlow gave us the evidence we needed to redesign three major bus corridors in Baku. We reduced peak congestion by 23% in the first month after implementing the recommendations.",
    name: "Elchin Mammadov",
    designation: "Head of Transport Planning, Baku City Executive",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "The inclusive mobility layer was a revelation. We discovered that wheelchair users were taking routes 40% longer than necessary because of two unmapped barriers. Both were fixed within a quarter.",
    name: "Aynur Hasanova",
    designation: "Accessibility Director, AYNA — Road Transport Agency",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "We use SmartFlow to understand peak footfall at Port Baku Mall. The 24h peak hour data changed how we schedule staff, promotions, and security — all optimised around actual human behaviour.",
    name: "Vugar Rzayev",
    designation: "Operations Director, Port Baku Retail Group",
    src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=500&auto=format&fit=crop",
  },
  {
    quote:
      "As a GIS integration partner, we found SmartFlow's spatial data layer to be exceptionally clean and well-structured. It connected to our Esri environment in under two hours.",
    name: "Sarah Lindqvist",
    designation: "GIS Solutions Architect, Esri Northern Europe",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sf-teal/30 bg-sf-teal/5 mb-4">
          <span className="text-xs text-sf-teal font-mono">What They Say</span>
        </div>
        <h2 className="text-4xl font-light text-white">
          Trusted by the people who <span className="text-sf-teal">shape cities</span>
        </h2>
      </div>
      {/* AnimatedTestimonials has dark mode support via CSS variables — will inherit our dark theme */}
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </section>
  )
}

